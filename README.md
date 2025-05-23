This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Strapi Request Client

```js
import { auth } from "@/auth";
import { API_CONFIG } from "./constants/api-endpoints";
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

  let headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  /*/  IF AUTH IS REQUIRED   */

  if (options?.requireAuth && options.session == undefined) {
    const session = await auth();

    if (!session?.strapiToken) {
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
      data,
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

```

# tsconfig.json

```json
{
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "javascript.preferences.importModuleSpecifier": "non-relative"
}
```
