import { Announcement } from "@/src/domain/entities/models/Announcement";
import IAnnouncementsRepository from "../../interfaces/IAnnouncementsRepository";

class GetAnnouncementByIdUseCase {
  constructor(private announcementRepository: IAnnouncementsRepository) {}

  async execute(id: number): Promise<Announcement | null> {
    // Any business logic or filtering can go here

    return await this.announcementRepository.getAnnouncementById(id);
  }
}

export default GetAnnouncementByIdUseCase;
