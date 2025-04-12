"use server";

import formatTimeString from "@/lib/timeHelper";
import createAnnouncementService from "@/src/application/services/announcementService";
import { CreateAnnouncementDto } from "@/src/domain/dtos/CreateAnnouncementDto";
import { ErrorHandler } from "@/src/domain/entities/errors/common.error";
import { CreateAnnouncementType } from "@/src/domain/entities/models/Announcement";
import { AuthService } from "@/src/infrastructure/services/authentication.service";
import { revalidatePath } from "next/cache";

export async function createNewAnnouncement(formData: CreateAnnouncementType) {
  try {
    // AUTH CHECK
    const session = await new AuthService().getSession();
    if (!session?.strapiToken) throw new Error("No auth token found");

    // FORMAT THE DATA
    const { announcementTime, ...rest } = formData;

    const formattedTime = announcementTime
      ? formatTimeString(announcementTime)
      : "";

    // INPUT DTO
    const payload: CreateAnnouncementDto = {
      announcementTime: formattedTime,
      ...rest,
    };

    const { createAnnouncementUseCase } = createAnnouncementService();
    const result = await createAnnouncementUseCase.execute(
      payload,
      session?.strapiToken,
    );

    if (result) {
      revalidatePath("/dashboard/announcements");
      return { success: true, data: result };
    } else {
      return { error: "An error occurred" };
    }
  } catch (error: any) {
    console.error("Error in createNewAnnouncement:", error);
    return { success: false, message: error || "An error occurred" };

    // return ErrorHandler.handleError(error);
  }
}

export default async function deleteAnnouncement(input) {
  try {
    const session = await new AuthService().getSession();
    if (!session?.strapiToken) throw new Error("No auth token found");

    // 2. Use Case Invocation
    const { deleteAnnouncementUseCase } = createAnnouncementService();
    await deleteAnnouncementUseCase.execute(input, session?.strapiToken);

    // 3. Side Effects
    revalidatePath("/dashboard/announcements");
    return { success: true, data: null, queryKey: ["announcements"], input };
  } catch (error: any) {
    // TODO: Handle error
    // return ErrorHandler.handleError(error);
    return { error: error.message };
  }
}
