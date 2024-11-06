import { getMissionaries } from "@/app/dashboard/missionaries/_api/data/missionary-service";
import Missions from "../_components/Missions";

import { ContentLayout } from "../_components/Layouts/DashboardContentWrapper";

export default async function page() {
  const { data } = await getMissionaries();
  const missionaries = data?.data?.map(({ attributes }) => {
    return { ...attributes };
  });

  return (
    <ContentLayout title="Missionaries">
      <Missions missionaries={missionaries} />
    </ContentLayout>
  );
}
