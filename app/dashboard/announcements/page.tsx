import { getAnnouncements } from "@/data/services/announcement-service";
import AnnouncementForm from "./_components/AnnouncementForm";

export default async function AnnouncementsPage() {
  const { data } = await getAnnouncements({ includesPast: true });

  return <AnnouncementForm announcements={data.data} />;
}
