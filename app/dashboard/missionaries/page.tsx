import { getMissionaries } from "@/features/missions/api/missionary-service";
import Missions from "../_components/Missions";

import ContentLayout from "../_components/Layouts/DashboardContentWrapper";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import CreateNew from "@/features/missions/components/CreateNew";
import MissionsMap from "../_components/MissionsMap";
import Image from "next/image";
import { DataTable } from "@/components/Table/data-table";
import { MissionsColumns } from "@/features/missions/components/MissionsColumns";
import MissionsTable from "@/features/missions/components/MissionsTable";
import { auth } from "@/auth";

export default async function page() {
  const session = await auth();
  const { data } = await getMissionaries();
  const missionaries = data?.data?.map(({ attributes }) => {
    return { ...attributes };
  });

  return (
    <ContentLayout title="Missionaries">
      {session?.user?.role === "admin" && (
        <div className="mb-10">
          <CreateNew />
        </div>
      )}
      <MissionsMap missionaries={missionaries} />
      <div className="mt-10">
        <MissionsTable initialData={data} />
      </div>
      <Missions />
    </ContentLayout>
  );
}
