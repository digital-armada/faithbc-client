import Event from "@/features/events/components/Event";
import { eventsService } from "@/features/events/event-services";

export default async function page() {
  const { data } = await eventsService.getEvents();

  return <Event initialEvents={data} />;
}
