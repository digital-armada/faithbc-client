import Announcement from "../../entities/models/Announcement";
import IAnnouncementsRepository from "../../interfaces/IAnnouncementsRepository";

interface UpdateAnnouncementInput {
  id: number;
  message?: string;
  announcementDate?: Date;
  announcementTime?: string;
}

class UpdateAnnouncementUseCase {
  constructor(private announcementRepository: IAnnouncementsRepository) {}

  async execute(input: UpdateAnnouncementInput): Promise<Announcement | null> {
    // Any business logic or validation can go here

    const { id, ...announcementData } = input;
    return await this.announcementRepository.updateAnnouncement(
      id,
      announcementData,
    );
  }
}

export default UpdateAnnouncementUseCase;
