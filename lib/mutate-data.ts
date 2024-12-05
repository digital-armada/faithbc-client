"use server";

// lib/mutate-data.ts
import { auth } from "@/auth";
import { getStrapiURL } from "@/lib/utils";
import { ApiResponse } from "@/types/types";

export async function mutateData<T>(
  method: string,
  path: string,
  payload?: any,
): Promise<ApiResponse<T>> {
  const baseUrl = getStrapiURL();
  const session = await auth();

  if (!session?.strapiToken) {
    return {
      success: false,
      error: {
        message: "Unauthorized: No valid session token",
      },
    };
  }
  console.log("mutateData", payload);
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.strapiToken}`,
      },
      body: payload ? JSON.stringify(payload) : undefined,
    });

    const responseText = await response.text();
    const data = responseText ? JSON.parse(responseText) : null;
    console.log("data", data);
    if (!response.ok) {
      return {
        success: false,
        error: {
          message: data?.error?.message || data?.message || "An error occurred",
          details: data?.error,
        },
      };
    }

    return {
      success: true,
      data: data.user || data, // Assuming Strapi returns user data in this format
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

// export async function mutateData<T>(
//   method: string,
//   path: string,
//   payload?: any,
// ): Promise<ApiResponse<T>> {
//   const baseUrl = getStrapiURL();
//   const session = await auth();
//
//   if (!session?.strapiToken) {
//     throw new Error("Unauthorized: No valid session token");
//   }
//
//   const url = `${baseUrl}${path}`;
//
//   try {
//     const response = await fetch(url, {
//       method: method,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${session.strapiToken}`,
//       },
//       body: JSON.stringify(payload),
//     });
//
//     const responseText = await response.text();
//
//     // Try to parse the response as JSON
//     let data;
//
//     try {
//       data = responseText ? JSON.parse(responseText) : null;
//     } catch (e) {
//       console.error("Failed to parse response as JSON:", e);
//       throw new Error("Invalid JSON response from server");
//     }
//
//     if (!response.ok) {
//       // Handle Strapi error format
//       const errorMessage =
//         data?.error?.message || data?.message || "An error occurred";
//       throw new Error(errorMessage);
//     }
//
//     return { data };
//   } catch (error) {
//     console.error("Request failed:", error);
//     return {
//       error:
//         error instanceof Error ? error.message : "An unexpected error occurred",
//     };
//   }
// }
