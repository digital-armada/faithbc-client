import FormEvent from "../../_components/FormEvent";
import { ContentLayout } from "@/app/dashboard/_components/Layouts/DashboardContentWrapper";
import { eventsService } from "@/features/events/event-services";
import { Event } from "@/features/events/types";

export default async function page({ params }: { params: { id: string } }) {
  const data: Event | undefined = await eventsService.getEvent(params.id);
  console.log("data from Events", data);
  if (!data) {
    return <ContentLayout title="Events">Event not found</ContentLayout>;
  }

  return (
    <ContentLayout title="Events">
      <FormEvent data={data} eventID={data.id} />
    </ContentLayout>
  );
}
