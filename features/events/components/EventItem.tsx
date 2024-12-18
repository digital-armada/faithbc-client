import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Clock, Map, MapPinIcon } from "lucide-react";

export default function EventItem({ event }) {
  // Convert dates using parseISO
  const startDateObj = event?.attributes?.startDate
    ? parseISO(event.attributes.startDate)
    : null;

  const endDateObj = event?.attributes?.endDate
    ? parseISO(event.attributes.endDate)
    : null;

  // Format dates with standard date-fns
  const startDate = startDateObj ? format(startDateObj, "do") : null;
  const startDay = startDateObj ? format(startDateObj, "EEE") : null;
  const startYear = startDateObj ? format(startDateObj, "yyyy") : null;
  const endDate = endDateObj ? format(endDateObj, "do") : null;
  const endYear = endDateObj ? format(endDateObj, "yyyy") : null;
  const startTime = startDateObj ? format(startDateObj, "h:mma") : null;
  const endTime = endDateObj ? format(endDateObj, "h:mma") : null;
  const venName = event?.attributes?.venName;
  const venAdd = event?.attributes?.venAdd;

  // Check if dates are different for comparison
  const areDifferentDates =
    startDateObj &&
    endDateObj &&
    startDateObj.getTime() !== endDateObj.getTime();

  // const shouldShowEndDate = endDate && endDate !== "Jan 1st";

  const [isPastEvent, setIsPastEvent] = useState(false);

  return (
    <>
      {/* <Link href={`/events/${event?.id}`}> */}
      <li
        key={event.id}
        className="flex flex-col justify-start space-x-4 rounded-md border border-gray-400 py-4 md:flex-row md:items-center"
      >
        <div className="mx-auto px-6 font-body text-2xl md:border-r md:border-gray-400">
          <div className="text-center text-[16px]">{startDay}</div>
          <div className="font-bold">{startDate}</div>
        </div>
        {event?.attributes?.featuredImage?.data?.attributes?.url && (
          <Image
            src={event.attributes.featuredImage.data.attributes.url}
            className="size-16 flex-none rounded-md object-cover"
            alt={event?.attributes?.title || "Event image"}
            width={100}
            height={100}
          />
        )}
        <div className="flex-1 space-y-1">
          <p className="text-1xl font-semibold">
            {event?.attributes?.title || "Untitled Event"}
          </p>

          {startTime?.includes("12:00AM") ? (
            ""
          ) : (
            <div className="inline-flex items-center rounded-md bg-gray-400 px-[4px] py-[2px] font-body text-[10px] font-light text-gray-300">
              <Clock width={12} height={12} className="mr-1" />
              <span>
                {startTime}
                {startDate === endDate && startTime !== endTime && (
                  <>
                    <span> - {endTime}</span>
                  </>
                )}
              </span>
            </div>
          )}

          {venName && (
            <div className="flex text-[10px]">
              <MapPinIcon width={12} height={12} className="mr-1" />
              <p>{venName}</p>
            </div>
          )}
          {venAdd && (
            <div className="flex items-center text-[10px] text-gray-800/50">
              {" "}
              <Map width={12} height={12} className="mr-1" />
              <p>{venAdd}</p>
            </div>
          )}
        </div>
      </li>
      {/* </Link> */}
    </>
  );
}
