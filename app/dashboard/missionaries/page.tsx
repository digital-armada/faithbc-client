import { getMissionaries } from "@/app/dashboard/missionaries/_api/missionary-service";
import Missions from "../_components/Missions";
import ContentLayout from "@/components/common/Layouts/DashboardContentWrapper";
import MissionsMap from "../_components/MissionsMap";

import { auth } from "@/auth";
import CreateNew from "./_components/CreateNew";
import MissionsTable from "./_components/MissionsTable";

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
