import { ContentLayout } from "./_components/Layouts/DashboardContentWrapper";
import { getBirthdayUsers } from "@/data/services/getUsers";
import UpcomingBirthdays from "@/app/dashboard/_components/widgets/upcomingBirthdays";
import Announcements from "@/app/dashboard/_components/widgets/announcements";
import Events from "@/app/dashboard/_components/widgets/events";
import { getEvents } from "@/data/events";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import DashHeader from "@/app/dashboard/_components/DashHeader";

export default async function DashboardPage() {
  const { data: user } = await getUserMeLoader();
  const { data: events } = await getEvents({
    includesPast: false,
    sort: "startDate:asc",
  });

  return (
    <ContentLayout title="Dashboard">
      <>
        <DashHeader heading={`Hi ${user.firstName} 👋`} />
        <div className="grid gap-4 lg:grid-cols-12">
          <Announcements className="col-span-12 rounded-md bg-white p-4 shadow-md" />

          <Events
            events={events}
            className="col-span-12 rounded-md bg-white p-4 shadow-md lg:col-span-7"
          />
          <UpcomingBirthdays className="col-span-12 rounded-md bg-white p-4 shadow-md lg:col-span-5" />
        </div>
      </>
    </ContentLayout>
  );
}
