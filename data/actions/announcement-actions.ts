"use server";

import { auth } from "@/auth";
import { mutateData } from "@/data/services/mutate-data";
import { revalidatePath } from "next/cache";

export async function createNewAnnouncement(prevState, formData: FormData) {
  try {
    const message = formData.get("message");
    const date = formData.get("event-date");

    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const payload = {
      data: {
        message,
        date,
      },
    };

    const response = await mutateData("POST", "/api/announcements", payload);

    if (response.data) {
      revalidatePath("/dashboard/announcements");
      return { data: response.data };
    } else if (response.error) {
      return { error: response.error.message || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in createNewAnnouncement:", error);
    return { error: error.message || "An error occurred" };
  }
}
export async function deleteAnnouncement(id: number) {
  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const response = await mutateData("DELETE", `/api/announcements/${id}`);

    if (response.data) {
      revalidatePath("/dashboard/announcements");
      return { data: response.data };
    } else if (response.error) {
      return { error: response.error.message || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in deleteAnnouncement:", error);
    return { error: error.message || "An error occurred" };
  }
}
