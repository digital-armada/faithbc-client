import HeadingTwo from "@/components/blocks/headingtwo";
import Image from "next/image";
import { eventsService } from "@/components/features/events/event-services";
import EventDetails from "@/app/dashboard/events/_components/EventDetails";

export default async function EventPage({
  params,
}: {
  params: { id: number };
}) {
  const id = params.id.toString();
  const { data } = await eventsService.getEvent(id);
  if (!data?.attributes) {
    return <section>Event not found</section>;
  }

  const {
    title,
    content,
    venName,
    venAdd,
    featuredImage,
    eventStartDate,
    eventEndDate,
    eventStartTime,
    eventEndTime,
    organiser,
  } = data.attributes;

  return (
    <section>
      <div className="container min-h-screen">
        {featuredImage?.data && (
          <div className="relative mb-10 h-80 w-full">
            <Image
              src={featuredImage.data.attributes.url}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="rounded-md object-cover"
              quality={75}
            />
          </div>
        )}

        <HeadingTwo heading={title} className={"mt-10"} />

        <div className="mt-10 gap-6 sm:flex">
          <EventDetails
            title={title}
            startDate={eventStartDate}
            endDate={eventEndDate}
            startTime={eventStartTime}
            endTime={eventEndTime}
            venName={venName}
            venAdd={venAdd}
            content={content}
            organizer={organiser}
          />
        </div>
      </div>
    </section>
  );
}
