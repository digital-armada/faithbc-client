"use server";

import { auth } from "@/auth";
import { strapiRequest } from "@/lib/strapi-service";
import { revalidatePath } from "next/cache";
import { formatDateForTimezone } from "@/lib/dateHelper";
import { announcementSchema } from "./announcement-schema";

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
    // Convert the parsed date to the specified time zone
    const normalizeDate = formatDateForTimezone(date, "Australia/Sydney");

    // Format the zoned date for Strapi
    console.log("normalizeDate", normalizeDate);

    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const payload = {
      data: {
        message,
        date: normalizeDate,
      },
    };
    console.log("payload", payload);

    const response = await strapiRequest("POST", "/announcements", {
      data: payload,
      requireAuth: true,
    });

    if (response.data) {
      revalidatePath("/dashboard/announcements");
      return { success: true, data: response.data };
    } else if (response.error) {
      return { error: response.error || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in createNewAnnouncement:", error);
    return { success: false, message: error || "An error occurred" };
  }
}

export async function deleteAnnouncement(id: number) {
  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const response = await strapiRequest("DELETE", `/announcements/${id}`, {
      requireAuth: true,
    });

    if (response.data) {
      revalidatePath("/dashboard/announcements");
      return { success: true, data: response.data };
    } else if (response.error) {
      return { error: response.error || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in deleteAnnouncement:", error);
    return { success: false, message: error || "An error occurred" };
  }
}
