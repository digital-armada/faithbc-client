"use server";

import { auth } from "@/auth";
import { strapiRequest } from "@/db/strapi-service";
import { revalidatePath } from "next/cache";

type FormState = {
  data: any;
  error?: string | { message: string; details?: any } | undefined;
  success: boolean;
};

export async function createNewMissions(
  formData: FormData,
): Promise<FormState> {
  const name = formData.get("name") as string;
  const location = formData.get("location") as string;

  if (!name || !location) {
    return {
      success: false,
      error: "Name and location are required",
      data: null,
    };
  }

  try {
    const session = await auth();
    if (!session?.strapiToken) {
      throw new Error("No authentication token found");
    }

    const payload = { data: { name, location } };
    const response = await strapiRequest("POST", "/missionaries", {
      data: payload,
      requireAuth: true,
    });

    if (response.data) {
      // Revalidate paths
      revalidatePath("/dashboard/missionaries");
      revalidatePath("/");
      return { success: true, data: response.data };
    }

    return {
      success: false,
      error: response.error || "An error occurred",
      data: null,
    };
  } catch (error: any) {
    console.error("Error creating missionary:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
      data: null,
    };
  }
}

export async function deleteMissionary(id: number): Promise<FormState> {
  try {
    const session = await auth();
    if (!session?.strapiToken) {
      throw new Error("No authentication token found");
    }

    const response = await strapiRequest("DELETE", `/missionaries/${id}`, {
      requireAuth: true,
    });

    if (response.data) {
      // Revalidate paths
      revalidatePath("/dashboard/missionaries");
      revalidatePath("/");
      return { success: true, data: response.data };
    }

    return {
      success: false,
      error: response.error || "An error occurred",
      data: null,
    };
  } catch (error: any) {
    console.error("Error deleting missionary:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
      data: null,
    };
  }
}
