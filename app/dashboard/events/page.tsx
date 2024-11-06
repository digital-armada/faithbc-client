import { getDashEvents } from "@/app/dashboard/events/_api/dashevents-service";
import EventClient from "../_components/EventClient";
import { ContentLayout } from "../_components/Layouts/DashboardContentWrapper";
import EventClient2 from "../_components/EventClient2";

export default async function page() {
  const { data } = await getDashEvents({
    includesPast: false,
    sort: ["startDate:asc"],
  });
  return (
    <ContentLayout title="Events">
      {/* <EventClient data={data} /> */}
      <EventClient2 events={data} />
    </ContentLayout>
  );
}
