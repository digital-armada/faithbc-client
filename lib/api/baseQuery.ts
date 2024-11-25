import { fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { auth } from "@/auth";
import qs from "qs";
import { API_CONFIG } from "@/lib/constants/api-endpoints";

const checkPermission = async (requiredRole: string) => {
  const session = await auth();
  return session?.user?.role === requiredRole;
};

export const strapiBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  const session = await auth();

  if (!session?.strapiToken) {
    return {
      error: { status: 401, data: "Unauthorized: No valid session token" },
    };
  }

  const { url, method, params, body, requiredRole } = args as any;

  if (requiredRole) {
    const hasPermission = await checkPermission(requiredRole);
    if (!hasPermission) {
      return {
        error: { status: 403, data: "Unauthorized: Insufficient permissions" },
      };
    }
  }

  const baseUrl = API_CONFIG.API_URL;
  const fullUrl = new URL(`${baseUrl}${url}`);

  if (params) {
    fullUrl.search = qs.stringify(params, { encodeValuesOnly: true });
  }

  const fetchBaseQueryInstance = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${session.strapiToken}`);
      return headers;
    },
  });

  try {
    const result = await fetchBaseQueryInstance(
      {
        url: fullUrl.toString().replace(baseUrl, ""),
        method,
        body,
      },
      api,
      extraOptions,
    );

    return result;
  } catch (error) {
    return {
      error: {
        status: "CUSTOM_ERROR",
        data:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
    };
  }
};
