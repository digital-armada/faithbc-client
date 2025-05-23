import AddPrayerRequests from "./_components/AddPrayerRequests";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import ContentLayout from "../../../components/common/Layouts/DashboardContentWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getChurch } from "@/app/dashboard/missionaries/_api/missionary-service";
import { deletePrayerRequest } from "@/data/actions/prayer-actions";
import DeleteRequest from "./_components/DeleteRequest";
import { checkUserRole } from "@/lib/checkUserRole";
import { AuthService } from "@/src/infrastructure/services/authentication.service";
// import { checkUserRole } from "@/lib/checkUserRoleServer";
const authService = new AuthService();

export default async function page() {
  const { data: user } = await getUserMeLoader();
  const { data } = await getChurch();

  const canCreateAnnouncement = await checkUserRole(
    ["admin", "ministry"],
    authService,
  );

  return (
    <ContentLayout title="Prayer Requests">
      <div>
        {canCreateAnnouncement && (
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
