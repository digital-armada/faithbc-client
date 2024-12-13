import { getAnnouncements } from "@/data/services/announcement-service";
import AnnouncementForm from "./_components/AnnouncementForm";
import ContentLayout from "../_components/Layouts/DashboardContentWrapper";
import AnnouncementTable from "./_components/AnnouncementTable";
import { auth } from "@/auth";
import { checkUserRole } from "@/lib/checkUserRoleServer";

export default async function AnnouncementsPage() {
  const { data } = await getAnnouncements({ includesPast: true });
  const session = await auth();
  console.log(session);

  const canCreateAnnouncement = await checkUserRole(["admin", "ministry"]);

  return (
    <ContentLayout title="Announcements">
      {canCreateAnnouncement && <AnnouncementForm />}
      <AnnouncementTable announcements={data.data} />
    </ContentLayout>
  );
}
