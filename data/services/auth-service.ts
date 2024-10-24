import { getStrapiURL } from "@/lib/utils";
import { auth } from "@/auth";
import { mutateData } from "./mutate-data";

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

export async function registerUserService(userData: RegisterUserProps) {
  console.log("registerUserService:", userData); // Log the user data being sent

  try {
    const response = await mutateData(
      "POST",
      "/api/auth/local/register",
      userData,
    );
    console.log("mutateData", response);
    // Check if the response is not okay
    if (!response.ok) {
      const errorData = await response.data;
      console.error("Error Response:", errorData); // Log the error details
      throw new Error("Registration failed");
    }

    // If response is okay, process the data
    const data = response.data;
    console.log("Registered User:", data.user); // Log the registered user data
    return data.user;
  } catch (error) {
    console.error("Registration Service Error:", error);
  }
}export async function updateUserService(userData) {
  try {
    const response = await mutateData(
      "PUT",
      `/api/users/${userData.id}`,
      userData,
    );
    // console.log("mutateData", response);
    // Check if the response is not okay
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error Response:", errorData); // Log the error details
      throw new Error("Registration failed");
    }

    // If response is okay, process the data
    const data = await response.json();
    // console.log("Registered User:", data.user); // Log the registered user data
    return data.user;
  } catch (error) {
    console.error("Registration Service Error:", error);
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
