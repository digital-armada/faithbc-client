"use server";

import { auth } from "@/auth";
import { mutateData } from "@/data/services/mutate-data";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const announcementSchema = z.object({
  message: z.string().min(1, "Message is required"),
  date: z.string().min(1, "Date and time is required"),
});

export async function createNewAnnouncement(prevState, formData: FormData) {
  const validatedFields = announcementSchema.safeParse({
    message: formData.get("message"),
    date: formData.get("event-date"),
  });

  if (!validatedFields.success) {
    return {
      error: true,
      inputErrors: validatedFields.error.flatten().fieldErrors,
      message: "Please verify your data.",
    };
  }
  const { message, date } = validatedFields.data;

  try {
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
      return { error: response.error || "An error occurred" };
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

    const response = await mutateData("DELETE", `/announcements/${id}`);

    if (response.data) {
      revalidatePath("/dashboard/announcements");
      return { data: response.data };
    } else if (response.error) {
      return { error: response.error || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in deleteAnnouncement:", error);
    return { error: error.message || "An error occurred" };
  }
}
