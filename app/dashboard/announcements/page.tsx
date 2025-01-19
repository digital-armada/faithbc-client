import React from "react";
import AnnouncementForm from "./_components/AnnouncementForm";
import ContentLayout from "../../../components/common/Layouts/DashboardContentWrapper";
import createAnnouncementService from "@/src/domain/services/announcementService";
import AnnouncementTable from "./_components/AnnouncementTable";

export default async function page() {
  // const { data: announcements, meta } =
  //   await getPublicAnnouncementsUseCase.execute();
  // console.log("announcements", announcements);
  return (
    <ContentLayout title="Announcements">
      {/* {canCreateAnnouncement && */}
      <AnnouncementForm />
      {/* } */}
      <AnnouncementTable />
      <h1>Announcements</h1>
      {/* <ul>
        {announcements.map((announcement) => (
          <li key={announcement.id}>{announcement.message}</li>
        ))}
      </ul> */}
      {/* {meta && <p>Total announcements: {meta.pagination.total}</p>} */}
    </ContentLayout>
  );
}
