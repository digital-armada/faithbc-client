import { getMissionaries } from "@/features/missions/_api/data/missionary-service";
import Missions from "../_components/Missions";

import ContentLayout from "../_components/Layouts/DashboardContentWrapper";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import CreateNew from "@/features/missions/components/CreateNew";
import MissionsMap from "../_components/MissionsMap";
import Image from "next/image";
import { DataTable } from "@/components/Table/DataTable";
import { MissionsColumns } from "@/features/missions/components/MissionsColumns";
import MissionsTable from "@/features/missions/components/MissionsTable";

export default async function page() {
  const { data: user } = await getUserMeLoader();
  const { data } = await getMissionaries();
  const missionaries = data?.data?.map(({ attributes }) => {
    return { ...attributes };
  });

  return (
    <ContentLayout title="Missionaries">
      {user.role.type === "admin" && (
        <div className="mb-10">
          <CreateNew />
        </div>
      )}
      <MissionsMap missionaries={missionaries} />
      <MissionsTable initialData={data} />
      {/* <div className="grid grid-cols-12 gap-4">
        {missionaries.map((mission, index) => {
          return (
            <div key={index} className="flex">
              <div>
                <Image
                  src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
                  alt="University of Southern California"
                  className="h-full w-full object-cover"
                  width={500}
                  height={500}
                />
              </div>
              <div>
                {mission.name}
                {mission.location}
              </div>
            </div>
          );
        })}
      </div> */}

      <Missions />
    </ContentLayout>
  );
}
