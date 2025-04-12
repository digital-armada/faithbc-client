import React from "react";
import ContentLayout from "@/components/common/Layouts/DashboardContentWrapper";

import AnnouncementForm from "@/features/announcements/ctx.Dashboard/AnnouncementForm";
import AnnouncementTable from "@/features/announcements/ctx.Dashboard/Table/AnnouncementTable";

import { AuthService } from "@/src/infrastructure/services/authentication.service";
import createAnnouncementService from "@/src/application/services/announcementService";
import { redirect } from "next/navigation";

export default async function page() {
  const authService = new AuthService();
  const token = (await authService.getSession())?.strapiToken;

  if (!token) {
    redirect("/signin");
  }

  const { getPublicAnnouncementsUseCase } = createAnnouncementService();
  const initialData = await getPublicAnnouncementsUseCase.execute({
    page: 1,
    pageSize: 10,
    token,
  });

  return (
    <ContentLayout title="Announcements">
      {/* {canCreateAnnouncement && */}
      <AnnouncementForm />
      {/* } */}
      <AnnouncementTable initialData={initialData} />
    </ContentLayout>
  );
}
