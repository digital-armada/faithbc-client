import { Announcement } from "../entities/models/Announcement";

interface StrapiResponse<T> {
  data: T;
  meta: any;
}

interface IAnnouncementsRepository {
  createAnnouncement(
    announcement: Omit<Announcement, "id">,
  ): Promise<Announcement>;
  getAnnouncementById(id: number): Promise<Announcement | null>;
  getAllAnnouncements(
    pageIndex: number,
    pageSize: number,
  ): Promise<StrapiResponse<Announcement[]>>;
  updateAnnouncement(
    id: number,
    announcement: Partial<Announcement>,
  ): Promise<Announcement | null>;
  deleteAnnouncement(id: number): Promise<void>;
}

export default IAnnouncementsRepository;
