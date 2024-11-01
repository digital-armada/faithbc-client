import { getDashEvents } from "@/data/events";
import EventClient from "../_components/EventClient";
import { ContentLayout } from "../_components/Layouts/DashboardContentWrapper";

export default async function page() {
  const { data } = await getDashEvents();
  return (
    <ContentLayout title="Events">
      <EventClient data={data} />
    </ContentLayout>
  );
}
