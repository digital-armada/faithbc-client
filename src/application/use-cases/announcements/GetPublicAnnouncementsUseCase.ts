import { Announcement } from "@/src/domain/entities/models/Announcement";
import IAnnouncementsRepository from "@/src/application/interfaces/IAnnouncementsRepository";

interface StrapiResponse<T> {
  data: T;
  meta: any;
}

interface GetPublicAnnouncementsInput {
  page: number;
  pageSize: number;
  token?: string;
}

class GetPublicAnnouncementsUseCase {
  constructor(private announcementRepository: IAnnouncementsRepository) {}
  async execute(
    input: GetPublicAnnouncementsInput,
  ): Promise<StrapiResponse<Announcement[]>> {
    const { page, pageSize, token } = input;

    return await this.announcementRepository.getAllAnnouncements({
      page,
      pageSize,
      token,
    });
  }
}

export default GetPublicAnnouncementsUseCase;
