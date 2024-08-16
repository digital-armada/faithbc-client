import { getDashEvents } from "@/data/events";
import EventClient from "../_components/EventClient";
import { ContentLayout } from "../_components/dashpanel/content-layout";
import { DataTable } from "./_components/DataTable";

export default async function page() {
  const { data } = await getDashEvents();
  // console.log(data);
  return (
    <ContentLayout title="Events">
      <EventClient data={data} />
    </ContentLayout>
  );
}
