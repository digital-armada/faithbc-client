import { API_CONFIG } from "./constants/api-endpoints";
import qs from "qs";

export const strapiRequestClient = async <T>(
  method: string,
  endpoint: string,
  options?: {
    query?: object;
    data?: any;
    session?: any;
  },
): Promise<{
  success: boolean;
  data?: T;
  error?: { message: string; details?: any };
}> => {
  let headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };

  if (options?.session && options.session.strapiToken) {
    headers["Authorization"] = `Bearer ${options.session.strapiToken}`;
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
