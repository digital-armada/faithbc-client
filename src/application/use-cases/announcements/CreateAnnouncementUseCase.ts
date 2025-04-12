// application/use-cases/CreateAnnouncementUseCase.ts

import {
  Announcement,
  CreateAnnouncementSchema,
  CreateAnnouncementType,
} from "../../../domain/entities/models/Announcement";
import IAnnouncementsRepository from "../../interfaces/IAnnouncementsRepository";

class CreateAnnouncementUseCase {
  constructor(private announcementRepository: IAnnouncementsRepository) {}

  async execute(
    input: CreateAnnouncementType,
    token: string,
  ): Promise<Announcement> {
    // VALIDATION CHECK
    const validatedFields = CreateAnnouncementSchema.safeParse(input);

    if (!validatedFields.success) {
      throw validatedFields.error;
    }
    // const announcement: CreateAnnouncementType = {
    //   message: input.message,
    //   announcementDate: input.announcementDate,
    //   announcementTime: input.announcementTime,
    // };

    return await this.announcementRepository.createAnnouncement(
      validatedFields.data,
      { token },
    );
  }
}

export default CreateAnnouncementUseCase;
