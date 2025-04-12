import { BaseConfig, PaginatedConfig } from "@/src/domain/config";
import { Announcement } from "@/src/domain/entities/models/Announcement";

interface ApiResponse<T> {
  data: T;
  meta: any;
}

interface IAnnouncementsRepository {
  createAnnouncement(
    announcement: Omit<Announcement, "id">,
    config?: BaseConfig,
  ): Promise<Announcement>;
  getAnnouncementById(
    id: number,
    config?: BaseConfig,
  ): Promise<Announcement | null>;
  updateAnnouncement(
    id: number,
    announcement: Partial<Announcement>,
    config?: BaseConfig,
  ): Promise<Announcement | null>;
  deleteAnnouncement(id: number, config?: BaseConfig): Promise<void>;

  getAllAnnouncements(
    config?: PaginatedConfig,
  ): Promise<ApiResponse<Announcement[]>>;
}

// interface IAnnouncementsRepository {
//   createAnnouncement(
//     announcement: Omit<Announcement, "id">,
//     token?: string,
//   ): Promise<Announcement>;
//   // getAnnouncementById(id: number): Promise<Announcement | null>;
//   getAllAnnouncements(
//     page: number,
//     pageSize: number,
//     token?: string,
//   ): Promise<ApiResponse<Announcement[]>>;
//   updateAnnouncement(
//     id: number,
//     announcement: Partial<Announcement>,
//     token?: string,
//   ): Promise<Announcement | null>;
//   deleteAnnouncement(id: number, token: string): Promise<void>;
// }

export default IAnnouncementsRepository;
