// application/use-cases/DeleteAnnouncementUseCase.ts

import IAnnouncementsRepository from "@/src/application/interfaces/IAnnouncementsRepository";

class DeleteAnnouncementUseCase {
  constructor(private announcementRepository: IAnnouncementsRepository) {}

  async execute(id: number, token: string): Promise<void> {
    // Any business logic or validation can go here
    await this.announcementRepository.deleteAnnouncement(id, { token });
  }
}

export default DeleteAnnouncementUseCase;
