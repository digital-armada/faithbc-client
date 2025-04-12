import axios, { AxiosInstance, AxiosError } from "axios";

interface StrapiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: any;
  };
}

class StrapiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /***************
      * Interceptors are avoided to ensure the StrapiClient remains framework-agnostic and focused on its single responsibility of making HTTP requests. Token handling is done outside of the client.

        this.client.interceptors.request.use(async (config) => {
          const token = (await new AuthService().getSession())?.strapiToken;
          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
          if (clientSession) {
            config.headers["Authorization"] = `Bearer ${clientSession.strapiToken}`;
          }
          return config;
        });
      ****************/

  async get(url: string, token?: string) {
    try {
      const headers = this.buildHeaders(token);
      const response = await this.client.get(url, { headers });
      return response.data;
    } catch (error) {
      this.handleError(error, "GET");
    }
  }

  async post(url: string, data: any, token?: string) {
    try {
      const headers = this.buildHeaders(token);
      const response = await this.client.post(url, data, {
        headers,
      });
      return response.data;
    } catch (error) {
      this.handleError(error, "POST");
    }
  }

  async put(url: string, data: any, token?: string) {
    try {
      const headers = this.buildHeaders(token);
      const response = await this.client.put(url, data, {
        headers,
      });
      return response.data;
    } catch (error) {
      this.handleError(error, "PUT");
    }
  }

  async delete(url: string, token?: string) {
    try {
      const headers = this.buildHeaders(token);
      const response = await this.client.delete(url, {
        headers,
      });
      return response.data;
    } catch (error) {
      this.handleError(error, "DELETE");
    }
  }

  /***************
   * BUILD REQUEST HEADERS
   * Including authentication if token is provided
   ****************/
  private buildHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  /***************
   * ERROR HANDLING
   ****************/
  private handleError(error: unknown, method: string): never {
    console.error(`Strapi API ${method} error:`, error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<StrapiError>;
      if (axiosError.response?.data?.error) {
        const strapiError = axiosError.response.data.error;
        console.error("Strapi API error:", {
          status: strapiError.status,
          name: strapiError.name,
          message: strapiError.message,
          details: strapiError.details,
        });
        throw new Error(`Strapi API error: ${strapiError.message}`);
      }
    }

    console.error("Unexpected error:", error);
    throw error;
  }
}

export default StrapiClient;
