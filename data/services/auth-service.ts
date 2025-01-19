import { getStrapiURL } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { strapiRequest } from "@/src/interface-adapters/strapi-client";

interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}

interface LoginUserProps {
  identifier: string;
  password: string;
}

const baseUrl = getStrapiURL();

export async function registerUserService(
  userData: RegisterUserProps,
): Promise<ApiResponse<UserData>> {
  try {
    const response = await strapiRequest<UserData>(
      "POST",
      "/auth/local/register",
      {
        data: userData,
      },
    );

    if (response.error) {
      return {
        success: false,
        error: response.error,
      };
    }

    if (!response.data) {
      return {
        success: false,
        error: {
          message: "No data received from server",
        },
      };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        details: error,
      },
    };
  }
}
export async function updateUserService(userData) {
  try {
    const response = await strapiRequest("PUT", `/users/${userData.id}`, {
      data: userData,
      requireAuth: true,
    });
    if (!response.success) {
      console.error("Error Response:", response.error); // Log the error details
      throw new Error("Update failed");
    }

    // If response is successful, return the data
    return response.data;
  } catch (error) {
    console.error("Update Service Error:", error);
    throw error;
  }
}
export async function loginUserService(userData: LoginUserProps) {
  const url = new URL("/api/auth/local", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}

export async function getUserRoles() {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/users-permissions/roles", baseUrl);
  const session = await auth();

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.strapiToken}`,
      },
      cache: "no-cache",
    });
    const data = await response.json();

    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}
