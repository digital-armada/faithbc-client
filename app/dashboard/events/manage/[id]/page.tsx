import FormEvent from "../../_components/FormEvent";
import ContentLayout from "@/components/common/Layouts/DashboardContentWrapper";
import { eventsService } from "@/features/events/event-services";
import { Event } from "@/features/events/types";

export default async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { data } = await eventsService.getEvent(params.id);

  if (!data) {
    return <ContentLayout title="Events">Event not found</ContentLayout>;
  }

  return (
    <ContentLayout title="Events">
      <FormEvent data={data} eventID={data.id} />
    </ContentLayout>
  );
}
