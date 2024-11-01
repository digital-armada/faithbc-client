import { getInfiniteEvents, getNotifications } from "@/data/events";
import Event from "@/app/(site)/events/_components/Event";

export default async function page() {
  const { data } = await getInfiniteEvents({ page: 1 });
  console.log("data", data);
  const initialEvents = data;

  return <Event initialEvents={initialEvents} />;
}
