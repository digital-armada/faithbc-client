import IAnnouncementsRepository from "@/src/application/interfaces/IAnnouncementsRepository";
import StrapiClient from "../utils/strapiClient";
import { Announcement } from "@/src/domain/entities/models/Announcement";
import qs from "qs";
import { BaseConfig, PaginatedConfig } from "@/src/domain/config";
interface StrapiResponse<T> {
  data: T;
  meta: any;
}

class AnnouncementRepository implements IAnnouncementsRepository {
  constructor(private strapiClient: StrapiClient) {}

  async createAnnouncement(
    announcement: Omit<Announcement, "id">,
    config?: BaseConfig,
  ): Promise<Announcement> {
    const { token } = config || {};
    const strapiResponse = await this.strapiClient.post(
      "/api/announcements",
      { data: this.mapToStrapi(announcement) },
      token,
    );
    return this.mapFromStrapi(strapiResponse.data);
  }

  async getAllAnnouncements(
    config?: PaginatedConfig,
  ): Promise<StrapiResponse<Announcement[]>> {
    const { pageSize = 10, page = 1, token } = config || {};
    console.log("token", token);
    const query = qs.stringify(
      {
        pagination: {
          page,
          pageSize,
        },
        sort: ["announcementDate:desc", "announcementTime:desc"],
      },
      {
        encodeValuesOnly: true, // prettify URL
      },
    );

    const strapiResponse = await this.strapiClient.get(
      `/api/announcements?${query}`,
      token as string,
    );

    return {
      data: strapiResponse.data.map(this.mapFromStrapi),
      meta: strapiResponse.meta,
    };
  }
  async getAnnouncementById(
    id: number,
    config: BaseConfig,
  ): Promise<Announcement | null> {
    const { token } = config || {};
    const strapiResponse = await this.strapiClient.get(
      `/api/announcements/${id}`,
      token as string,
    );
    return strapiResponse.data ? this.mapFromStrapi(strapiResponse.data) : null;
  }

  async updateAnnouncement(
    id: number,
    announcement: Partial<Announcement>,
    config?: BaseConfig,
  ): Promise<Announcement | null> {
    const { token } = config || {};
    const strapiResponse = await this.strapiClient.put(
      `/api/announcements/${id}`,
      { data: this.mapToStrapi(announcement) },
      token,
    );

    return strapiResponse.data ? this.mapFromStrapi(strapiResponse.data) : null;
  }
  async deleteAnnouncement(id: number, config?: BaseConfig): Promise<void> {
    const { token } = config || {};
    await this.strapiClient.delete(`/api/announcements/${id}`, token);
  }

  private mapFromStrapi(data: any): Announcement {
    return {
      id: data.id,
      message: data.attributes.message,
      announcementDate: data.attributes.announcementDate,
      announcementTime: data.attributes.announcementTime,
    };
  }

  private mapToStrapi(
    announcement: Omit<Announcement, "id"> | Partial<Announcement>,
  ): any {
    return {
      message: announcement.message,
      announcementDate: announcement.announcementDate,
      announcementTime: announcement.announcementTime,
    };
  }
}

export default AnnouncementRepository;
