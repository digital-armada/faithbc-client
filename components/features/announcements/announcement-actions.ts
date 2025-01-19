"use server";

import { auth } from "@/lib/auth";
import { strapiRequest } from "@/src/interface-adapters/strapi-client";
import { revalidatePath } from "next/cache";
import formatTimeString from "@/lib/timeHelper";
import { AuthService } from "@/src/infrastructure/services/authentication.service";
import createAnnouncementService from "@/src/domain/services/announcementService";
import { ErrorHandler } from "@/src/domain/entities/errors/common.error";
import { CreateAnnouncementType } from "@/src/domain/entities/models/Announcement";

export async function createNewAnnouncement(formData: CreateAnnouncementType) {
  try {
    // AUTH CHECK
    const auth = new AuthService();
    const session = await auth.isAuthenticated();

    //TODO Get user role too

    if (!session) {
      return {
        error: true,
        message: "You must be logged in to create an announcement.",
      };
    }

    // FORMAT THE DATA
    const { announcementTime, ...rest } = formData;

    const formattedTime = announcementTime
      ? formatTimeString(announcementTime)
      : "";

    // INPUT DTO
    const payload: CreateAnnouncementType = {
      announcementTime: formattedTime,
      ...rest,
    };

    const { createAnnouncementUseCase } = createAnnouncementService();
    const result = await createAnnouncementUseCase.execute(payload);

    if (result) {
      revalidatePath("/dashboard/announcements");
      return { success: true, data: result };
    } else {
      return { error: "An error occurred" };
    }
  } catch (error: any) {
    console.error("Error in createNewAnnouncement:", error);
    return ErrorHandler.handleError(error);
  }
}

// export async function createNewAnnouncement(formData: CreateAnnouncementType) {
//   // VALIDATE INPUTS
//   const auth = new AuthService();
//
//   const validatedFields = announcementSchema.safeParse({
//     message: formData.message,
//     announcementDate: formData.announcementDate,
//     announcementTime: formData.announcementTime,
//   });
//
//   if (!validatedFields.success) {
//     return {
//       error: true,
//       inputErrors: validatedFields.error.flatten().fieldErrors,
//       message: "Please verify your data.",
//     };
//   }
//
//   const { message, announcementDate, announcementTime } = validatedFields.data;
//
//   const formattedTime = announcementTime
//     ? formatTimeString(announcementTime)
//     : null;
//
//   try {
//     const session = await auth.isAuthenticated();
//     // if (!session?.strapiToken) throw new Error("No auth token found");
//
//     const payload = {
//       data: {
//         message,
//         announcementDate,
//         announcementTime: formattedTime,
//       },
//     };
//
//     const response = await strapiRequest("POST", "/announcements", {
//       data: payload,
//       requireAuth: true,
//     });
//
//     if (response.data) {
//       revalidatePath("/dashboard/announcements");
//       return { success: true, data: response.data };
//     } else if (response.error) {
//       return { error: response.error || "An error occurred" };
//     }
//
//     return { error: "Unexpected response from server" };
//   } catch (error) {
//     console.error("Error in createNewAnnouncement:", error);
//     return { success: false, message: error || "An error occurred" };
//   }
// }

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
