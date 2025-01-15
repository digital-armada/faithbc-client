"use client";
import { getAnnouncements } from "@/data/services/announcement-service";
import AnnouncementForm from "./_components/AnnouncementForm";
import ContentLayout from "../../../components/common/Layouts/DashboardContentWrapper";
import AnnouncementTable from "./_components/AnnouncementTable";
import { auth } from "@/auth";
import { checkUserRole } from "@/lib/checkUserRoleServer";
import DataTable from "@/components/blocks/Table/data-table";
import { useSession } from "next-auth/react";
import React from "react";

export default function page() {
  const session = useSession();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 3,
  });
  // const { data } = await getAnnouncements({ includesPast: true });
  // const session = await auth();
  // console.log("announcements", data);
  // const canCreateAnnouncement = await checkUserRole(["admin", "ministry"]);

  return (
    <ContentLayout title="Announcements">
      ok
      {/* {canCreateAnnouncement && <AnnouncementForm />} */}
      {/* <DataTable>
      </DataTable> */}
      {/* <AnnouncementTable announcements={data.data} /> */}
    </ContentLayout>
  );
}
