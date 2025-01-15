"use server";

import { auth } from "@/auth";
import { strapiRequest } from "@/db/strapi-service";
import { revalidatePath } from "next/cache";
import { formatDateForTimezone } from "@/lib/dateHelper";
import { announcementSchema } from "./announcement-schema";
import formatTimeString from "@/lib/timeHelper";

export async function createNewAnnouncement(prevState, formData: FormData) {
  const validatedFields = announcementSchema.safeParse({
    message: formData.get("message"),
    announcementDate: formData.get("announcementDate"),
    announcementTime: formData.get("announcementTime") || null,
  });

  if (!validatedFields.success) {
    return {
      error: true,
      inputErrors: validatedFields.error.flatten().fieldErrors,
      message: "Please verify your data.",
    };
  }

  const { message, announcementDate, announcementTime } = validatedFields.data;

  const formattedTime = announcementTime
    ? formatTimeString(announcementTime)
    : null;

  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const payload = {
      data: {
        message,
        announcementDate,
        announcementTime: formattedTime,
      },
    };

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
