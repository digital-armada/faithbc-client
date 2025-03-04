import EventMap from "@/features/events/components/EventMap";
import HeadingTwo from "@/components/custom/headingtwo";
import formatDateRange from "@/lib/formatDate";
import getAddressCoordinates from "@/lib/getAddressCoordinates";
import Image from "next/image";
import { Suspense } from "react";
import { IoMdCalendar, IoMdMap } from "react-icons/io";
import Markdown from "react-markdown";
import { redirect } from "next/navigation";
import RenderTipTap from "../../../../features/events/components/RenderTipTap";
import { eventsService } from "@/features/events/event-services";
import { Event } from "@/features/events/types";
import { format, parseISO } from "date-fns";
import DateDisplay from "@/components/Forms/DateDisplay";
import { DateTime } from "luxon";
import EventDateClient from "@/features/events/components/EventDateClient";

export default async function EventPage({
  params,
}: {
  params: { id: number };
}) {
  const id = params.id.toString();
  const { data } = await eventsService.getEvent(id);
  console.log(data);
  if (!data?.attributes) {
    return <section>Event not found</section>;
  }

  const {
    title,
    content,
    startDate,
    endDate,
    venName,
    venAdd,
    featuredImage,
    eventStartDate,
    eventEndDate,
    eventStartTime,
    eventEndTime,
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
          {venAdd ? (
            <>
              <div className="w-full sm:w-1/2">
                <EventDateClient startDate={startDate} endDate={endDate} />
                {eventStartDate}, {eventEndDate}, {eventStartTime},{" "}
                {eventEndTime},
                {/* <EventDetails
                  title={title}
                  startDate={startDate}
                  endDate={endDate}
                  venName={venName}
                  venAdd={venAdd}
                  content={content}
                /> */}
              </div>
              <div className="w-full sm:w-1/2">
                <Suspense fallback={<div>Loading...</div>}>
                  <EventMap address={venAdd} />
                </Suspense>
              </div>
            </>
          ) : (
            <div className="w-full">
              <EventDetails
                title={title}
                startDate={startDate}
                endDate={endDate}
                venName={venName}
                venAdd={venAdd}
                content={content}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface EventDetailsProps {
  title: string;
  startDate: string;
  endDate: string | null;
  venName: string | null;
  venAdd: string | null;
  content: string | null;
}

const EventDetails = ({
  startDate,
  endDate,
  venName,
  venAdd,
  content,
}: EventDetailsProps) => {
  // Remove timeZone option from format calls
  // const eventStartDate = startDate ? format(startDate, "MMM do") : null;
  // const startYear = startDate ? format(startDate, "yyyy") : null;
  // const eventEndDate = endDate ? format(endDate, "MMM do") : null;
  // const endYear = endDate ? format(endDate, "yyyy") : null;

  console.log("startDate", startDate);

  //   const startTime =
  //     startDateObj &&
  //     // Check if time is midnight (00:00:00)
  //     (startDateObj.getHours() === 0 &&
  //     startDateObj.getMinutes() === 0 &&
  //     startDateObj.getSeconds() === 0
  //       ? format(startDateObj, "EEEE") // Show only day name for midnight
  //       : format(startDateObj, "EEEE h:mma")); // Show day name and time for other times
  //
  //   console.log("startTime", startTime);
  //
  //   // Check if dates are different for comparison
  //   const areDifferentDates =
  //     startDateObj &&
  //     endDateObj &&
  //     startDateObj.getTime() !== endDateObj.getTime();

  const shouldShowEndDate = endDate && endDate !== "Jan 1st";

  return (
    <div className="w-full space-y-8 pb-8 text-gray-700">
      <div>
        <h3 className="text-lg font-bold">Date and Time</h3>
        <div className="flex items-center gap-3">
          <IoMdCalendar className="text-2xl" />
          {startDate}
          {/* <DateDisplay isoString={startDate} /> */}

          {/* {eventStartDate} */}
          {/* {startTime} */}
          {/* <p className="text-md">{formatDateRange(startDate, endDate)}</p> */}
        </div>
      </div>
      {(venName || venAdd) && (
        <div>
          <h3 className="text-lg font-bold">Location</h3>
          <div className="flex items-start gap-3">
            <IoMdMap className="text-2xl" />
            <div>
              {venName && <div className="text-md">{venName}</div>}
              {venAdd && <div className="text-xs font-light">{venAdd}</div>}
            </div>
          </div>
        </div>
      )}
      {content && (
        <>
          <h3 className="mt-10 text-lg font-bold text-gray-700">
            Additional Info
          </h3>
          <RenderTipTap content={content} />
        </>
      )}
    </div>
  );
};
