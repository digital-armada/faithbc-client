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
      baseURL: process.env.STRAPI_API_URL || "http://127.0.0.1:1337",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // this.client.interceptors.request.use(async (config) => {
    //   const token = (await new AuthService().getSession())?.strapiToken;
    //   if (token) {
    //     config.headers["Authorization"] = `Bearer ${token}`;
    //   }
    //   if (clientSession) {
    //     config.headers["Authorization"] = `Bearer ${clientSession.strapiToken}`;
    //   }
    //   return config;
    // });
  }

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

  async get(url: string, params?: any, token?: string) {
    try {
      const response = await this.client.get(url, {
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return response.data;
    } catch (error) {
      this.handleError(error, "GET");
    }
  }

  async post(url: string, data: any, token?: string) {
    try {
      const response = await this.client.post(url, {
        data,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return response.data;
    } catch (error) {
      this.handleError(error, "GET");
    }
  }

  async put(url: string, data: any, token?: string) {
    try {
      const response = await this.client.put(url, {
        data,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return response.data;
    } catch (error) {
      this.handleError(error, "GET");
    }
  }

  async delete(url: string, token?: string) {
    try {
      const response = await this.client.delete(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return response.data;
    } catch (error) {
      this.handleError(error, "GET");
    }
  }
}

export default StrapiClient;
