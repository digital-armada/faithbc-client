import { getChurchPrayers } from "@/data/services/prayerItem-service";
import AddPrayerRequests from "./_components/AddPrayerRequests";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import ContentLayout from "../_components/Layouts/DashboardContentWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getChurch } from "@/features/missions/_api/data/missionary-service";
import { deletePrayerRequest } from "@/data/actions/prayer-actions";
import DeleteRequest from "./_components/DeleteRequest";

export default async function page() {
  const { data: user } = await getUserMeLoader();
  const { data } = await getChurch();
  return (
    <ContentLayout title="Prayer Requests">
      <div>
        {user.role.type === "admin" && (
          <div className="mb-10">
            <AddPrayerRequests />
          </div>
        )}
        <div className="space-y-4">
          {data?.data.map((prayer) =>
            prayer.attributes.prayerrequests.map((item) => {
              return (
                <>
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>{item?.name}</CardTitle>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-normal">
                        Request: {item?.request}
                      </p>
                      {item?.outcome && <p>Outcome: {item?.outcome}</p>}
                      {user.role.type === "admin" && (
                        <DeleteRequest id={item.id} />
                      )}
                    </CardContent>
                  </Card>
                </>
              );
            }),
          )}
        </div>
      </div>
    </ContentLayout>
  );
}
