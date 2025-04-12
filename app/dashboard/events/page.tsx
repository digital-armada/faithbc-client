import { getDashEvents } from "@/app/dashboard/events/_api/dashevents-service";
import ContentLayout from "@/components/common/Layouts/DashboardContentWrapper";
import EventClient2 from "../_components/EventClient2";

export default async function page() {
  const { data } = await getDashEvents({
    includesPast: false,
    sort: ["startDate:asc"],
  });
  console.dir(data, { depth: null });
  return (
    <ContentLayout title="Events">
      <EventClient2 events={data} />
    </ContentLayout>
  );
}
