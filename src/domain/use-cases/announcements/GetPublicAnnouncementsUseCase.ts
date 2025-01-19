import { Announcement } from "../../entities/models/Announcement";
import IAnnouncementsRepository from "../../interfaces/IAnnouncementsRepository";

interface StrapiResponse<T> {
  data: T;
  meta?: any;
}

interface GetPublicAnnouncementsInput {
  pageIndex: number;
  pageSize: number;
}

class GetPublicAnnouncementsUseCase {
  constructor(private announcementRepository: IAnnouncementsRepository) {}

  async execute(
    input: GetPublicAnnouncementsInput,
  ): Promise<StrapiResponse<Announcement[]>> {
    // Any business logic or filtering can go here
    console.log("Executing GetPublicAnnouncementsUseCase", input);
    return await this.announcementRepository.getAllAnnouncements(
      input.pageIndex,
      input.pageSize,
    );
  }
}

export default GetPublicAnnouncementsUseCase;
