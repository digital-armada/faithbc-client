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

const checkPermission = async (requiredRole: string) => {
  const session = await auth();
  return session?.user?.role === requiredRole;
};

export const strapiRequest = async <T>(
  method: string,
  endpoint: string,
  options?: {
    requireAuth?: boolean;
    requiredRole?: string;
    query?: object;
    data?: any;
  },
): Promise<ApiResponse<T>> => {
  // INITIALIZE HEADERS
  let headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // IF AUTH IS REQUIRED
  if (options?.requireAuth) {
    const session = await auth();
    if (!session?.strapiToken) {
      return {
        success: false,
        error: { message: "Unauthorized: No valid session token" },
      };
    }
    headers.Authorization = `Bearer ${session.strapiToken}`;
  }

  // IF REQUIRED ROLE IS SPECIFIED
  if (options?.requiredRole) {
    const hasPermission = await checkPermission(options.requiredRole);
    if (!hasPermission) {
      return {
        success: false,
        error: { message: "Unauthorized: Insufficient permissions" },
      };
    }
  }

  // BUILD URL
  const url = new URL(`${API_CONFIG.API_URL}${endpoint}`);

  // CONSTRUCT QUERY STRING
  if (options?.query) {
    // If query is already a string, use it directly
    url.search =
      typeof options.query === "string"
        ? options.query
        : qs.stringify(options.query, { encodeValuesOnly: true });
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: options?.data ? JSON.stringify(options.data) : undefined,
    });
    const responseText = await response.text();

    const data = responseText ? JSON.parse(responseText) : null;

    if (!response.ok) {
      return {
        success: false,
        error: {
          message: data?.error?.message || "An error occurred",
          details: data?.error,
        },
      };
    }

    return {
      success: true,
      data: data.data || data,
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
};

/**
// Public request

const publicData = await strapiRequest('GET', '/api/events', {
  query: { populate: '*' }
});

// Authorized request

const privateData = await strapiRequest('GET', '/api/admin/events', {
  requireAuth: true,
  requiredRole: 'admin'
});

*/

/*
For feature-specific API calls, you would create services in their respective feature folders that use this base strapi-service. For example:

import { strapiRequest } from '@/lib/services/strapi-service'

export const sermonsService = {
  getSermons: (options) =>
    strapiRequest('GET', API_ENDPOINTS.SERMONS.GET_ALL, options),

  updateSermon: (id, data) =>
    strapiRequest('PUT', API_ENDPOINTS.SERMONS.UPDATE(id), { data }),

  deleteSermon: (id) =>
    strapiRequest('DELETE', API_ENDPOINTS.SERMONS.DELETE(id))
}

*/
