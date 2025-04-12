import { auth } from "@/auth";
import Event from "@/features/events/components/Event";
import { eventsService } from "@/features/events/event-services";

export default async function page() {
  const session = await auth();
  const { data } = await eventsService.getEvents({ session });
  const events = data;
  return <Event initialEvents={events} />;
}
