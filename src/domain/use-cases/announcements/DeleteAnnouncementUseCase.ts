// application/use-cases/DeleteAnnouncementUseCase.ts

import IAnnouncementsRepository from "../../interfaces/IAnnouncementsRepository";

class DeleteAnnouncementUseCase {
  constructor(private announcementRepository: IAnnouncementsRepository) {}

  async execute(id: number): Promise<void> {
    // Any business logic or validation can go here
    await this.announcementRepository.deleteAnnouncement(id);
  }
}

export default DeleteAnnouncementUseCase;
