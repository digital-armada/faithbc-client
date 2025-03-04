"use server";

import { auth } from "@/auth";
import { strapiRequest } from "@/lib/strapi-service";
import { revalidatePath } from "next/cache";

export async function createNewMissions(prevState: any, formData: FormData) {
  const name = formData.get("name");
  const location = formData.get("location");

  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const payload = { data: { name, location } };
    const response = await strapiRequest("POST", "/missionaries", {
      data: payload,
      requireAuth: true,
    });

    if (response.data) {
      revalidatePath("/dashboard/missions");
      return { data: response.data };
    } else if (response.error) {
      return { error: response.error || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in Missionary:", error);

    if (error instanceof Error) {
      // Check if 'error' is an instance of Error and has a 'message' property
      return { error: error.message || "An error occurred" };
    } else {
      // Handle case where error might not be an instance of Error
      return { error: "An unexpected error occurred" };
    }
  }
}
