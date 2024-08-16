import { getChurchPrayers } from "@/data/services/prayerItem-service";
import AddPrayerRequests from "./_components/AddPrayerRequests";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { ContentLayout } from "../_components/dashpanel/content-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function page() {
  const { data: user } = await getUserMeLoader();
  const { data } = await getChurchPrayers();

  return (
    <ContentLayout title="Prayer Requests">
      <div>
        <div className="mb-10">
          {user.role.type === "admin" && <AddPrayerRequests />}
        </div>
        <div className="space-y-4">
          {data?.data.map((prayer) =>
            prayer.attributes.prayeritem.map((item) => {
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
