"use client";
import { auth } from "@/auth";
import { API_CONFIG } from "./constants/api-endpoints";
import qs from "qs";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: any;
  };
};

export const strapiRequestClient = async <T>(
  method: string,
  endpoint: string,
  options?: {
    query?: object;
    data?: any;
    requireAuth?: boolean;
  },
): Promise<ApiResponse<T>> => {
  // INITIALIZE HEADERS
  let headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // IF AUTH IS REQUIRED
  if (options?.requireAuth) {
    const session = await auth();
    console.log("session", session);
    if (!session?.strapiToken) {
      return {
        success: false,
        error: { message: "Unauthorized: No valid session token" },
      };
    }
    headers.Authorization = `Bearer ${session.strapiToken}`;
  }

  const url = new URL(`${API_CONFIG.API_URL}${endpoint}`);

  if (options?.query) {
    url.search = qs.stringify(options.query, { encodeValuesOnly: true });
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: options?.data ? JSON.stringify(options.data) : undefined,
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error?.message || "An error occurred");
    }

    return await response.json();
  } catch (error) {
    console.error("Client fetch error:", error);
    throw error;
  }
};
