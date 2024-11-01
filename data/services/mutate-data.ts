"use server";
// types.ts
type ApiResponse<T> = {
  data?: T;
  error?: string;
  meta?: any;
};

// lib/mutate-data.ts
import { auth } from "@/auth";
import { getStrapiURL } from "@/lib/utils";

export async function mutateData<T>(
  method: string,
  path: string,
  payload?: any,
): Promise<ApiResponse<T>> {
  const baseUrl = getStrapiURL();
  const session = await auth();

  if (!session?.strapiToken) {
    throw new Error("Unauthorized: No valid session token");
  }

  const url = `${baseUrl}${path}`;

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.strapiToken}`,
      },
      body: JSON.stringify(payload),
    });

    console.log("Response:", response);
    const responseText = await response.text();
    // Try to parse the response as JSON
    let data;
    try {
      data = responseText ? JSON.parse(responseText) : null;
    } catch (e) {
      console.error("Failed to parse response as JSON:", e);
      throw new Error("Invalid JSON response from server");
    }

    if (!response.ok) {
      // Handle Strapi error format
      const errorMessage =
        data?.error?.message || data?.message || "An error occurred";
      throw new Error(errorMessage);
    }

    return { data };
  } catch (error) {
    console.error("Request failed:", error);
    return {
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
