import IAnnouncementsRepository from "@/src/domain/interfaces/IAnnouncementsRepository";
import StrapiClient from "../strapiClient";
import { Announcement } from "@/src/domain/entities/models/Announcement";
import qs from "qs";
interface StrapiResponse<T> {
  data: T;
  meta: any;
}

class AnnouncementRepository implements IAnnouncementsRepository {
  constructor(private strapiClient: StrapiClient) {}

  async getAllAnnouncements(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<StrapiResponse<Announcement[]>> {
    const query = qs.stringify(
      {
        pagination: {
          page,
          pageSize,
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      },
    );

    const strapiResponse = await this.strapiClient.get(
      `/api/announcements?${query}`,
    );

    return {
      data: strapiResponse.data.map(this.mapFromStrapi),
      meta: strapiResponse.meta,
    };
  }

  async getAnnouncementById(id: number): Promise<Announcement | null> {
    const strapiResponse = await this.strapiClient.get(
      `/api/announcements/${id}`,
    );
    return strapiResponse.data ? this.mapFromStrapi(strapiResponse.data) : null;
  }

  async createAnnouncement(
    announcement: Omit<Announcement, "id">,
  ): Promise<Announcement> {
    try {
      const strapiResponse = await this.strapiClient.post(
        "/api/announcements",
        { data: this.mapToStrapi(announcement) },
      );

      return this.mapFromStrapi(strapiResponse.data);
    } catch (error) {
      console.error("Error creating announcement:", error);
      throw error;
    }
  }

  async updateAnnouncement(
    id: number,
    announcement: Partial<Announcement>,
  ): Promise<Announcement | null> {
    const strapiResponse = await this.strapiClient.put(
      `/api/announcements/${id}`,
      { data: this.mapToStrapi(announcement) },
    );

    return strapiResponse.data ? this.mapFromStrapi(strapiResponse.data) : null;
  }
  async deleteAnnouncement(id: number): Promise<void> {
    await this.strapiClient.delete(`/api/announcements/${id}`);
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
