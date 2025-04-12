import { API_CONFIG } from "../../lib/constants/api-endpoints";
import { auth } from "@/auth";
import qs from "qs";

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
    session?: any;
  },
) => {
  /*/  INITIALIZE HEADERS  */

  let headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  /*/  IF AUTH IS REQUIRED   */

  if (options?.requireAuth && options.session == undefined) {
    const session = await auth();
    console.log("STRAPI_REQUEST_DEBUG: Session from auth()", {
      sessionExists: !!session,
      strapiTokenExists: !!session?.strapiToken,
      sessionDetails: session
        ? {
            userId: session.user?.id,
            email: session.user?.email,
            role: session.user?.role,
          }
        : "No session",
    });

    if (!session?.strapiToken) {
      console.error("STRAPI_REQUEST_ERROR: No valid session token found");
      return {
        success: false,
        error: { message: "Unauthorized: No valid session token " },
      };
    }
    headers.Authorization = `Bearer ${session.strapiToken}`;
  }

  if (options?.session && options.session) {
    headers["Authorization"] = `Bearer ${options.session.data.strapiToken}`;
  }

  /*/ Comment  IF REQUIRED ROLE IS SPECIFIED  */

  if (options?.requiredRole) {
    const hasPermission = await checkPermission(options.requiredRole);
    if (!hasPermission) {
      return {
        success: false,
        error: { message: "Unauthorized: Insufficient permissions" },
      };
    }
  }

  /*/  BUILD URL  */

  const url = new URL(`${API_CONFIG.API_URL}${endpoint}`);
  /*/  CONSTRUCT QUERY STRING  */

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
      body: options?.data ? JSON.stringify(options?.data) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Strapi API Error:", {
        status: response.status,
        statusText: response.statusText,
        errorMessage: data?.error?.message || "An error occurred",
        errorDetails: data?.error,
        url: url.toString(),
      });
      return {
        success: false,
        error: {
          message: data?.error?.message || "An error occurred",
          details: data?.error,
        },
      };
    }

    console.log("Strapi API Response:", {
      url: url.toString(),
      dataStructure: Object.keys(data),
      hasDataProperty: !!data.data,
      hasMetaProperty: !!data.meta,
    });

    return {
      success: true,
      data: data.data || data,
      meta: data.meta,
    };
  } catch (error) {
    console.error("Strapi Request Unexpected Error:", {
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      details: error,
      url: url.toString(),
    });
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
