import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { format, toDate } from "date-fns-tz";
import Image from "next/image";
import Link from "next/link";

export default function EventItem({ event }) {
  const sydneyTimeZone = "Australia/Sydney";

  // Convert dates to Date objects
  const startDateObj = event?.attributes?.startDate
    ? toDate(new Date(event.attributes.startDate), { timeZone: sydneyTimeZone })
    : null;

  const endDateObj = event?.attributes?.endDate
    ? toDate(new Date(event.attributes.endDate), { timeZone: sydneyTimeZone })
    : null;

  // Format dates for display
  const startDate = startDateObj
    ? format(startDateObj, "MMM do", { timeZone: sydneyTimeZone })
    : null;

  const startYear = startDateObj
    ? format(startDateObj, "yyyy", { timeZone: sydneyTimeZone })
    : null;

  const endDate = endDateObj
    ? format(endDateObj, "MMM do", { timeZone: sydneyTimeZone })
    : null;

  const endYear = endDateObj
    ? format(endDateObj, "yyyy", { timeZone: sydneyTimeZone })
    : null;

  const startTime = startDateObj
    ? format(startDateObj, "cccc h:mma", { timeZone: sydneyTimeZone })
    : null;

  // Venue information
  const venName = event?.attributes?.venName;
  const venAdd = event?.attributes?.venAdd;

  // Check if dates are different for comparison
  const areDifferentDates =
    startDateObj &&
    endDateObj &&
    startDateObj.getTime() !== endDateObj.getTime();

  const shouldShowEndDate = endDate && endDate !== "Jan 1st";

  const [isPastEvent, setIsPastEvent] = useState(false);

  useEffect(() => {
    if (startDateObj && startDateObj < new Date()) {
      setIsPastEvent(true);
    }
  }, [startDateObj]);

  return (
    <>
      {(!event?.attributes?.eventType ||
        event?.attributes?.eventType === "event") && (
        <li
          key={event.id}
          className="flex flex-col justify-start py-4 md:flex-row md:items-center"
        >
          <div className="text-md flex-initial sm:inline-block">
            <p>
              {startDate}
              {areDifferentDates && shouldShowEndDate ? ` - ${endDate}` : ""}
            </p>
            <div className="text-[10px]">
              <p>{startTime}</p>
              <p>{startYear}</p>
            </div>
          </div>

          <div className="flex-1 items-center">
            {/* {event?.attributes?.featuredImage?.data?.attributes?.url && (
              <Image
                src={event.attributes.featuredImage.data.attributes.url}
                className="size-16 rounded-md object-cover"
                alt={event?.attributes?.title || "Event image"}
                width={500}
                height={500}
              />
            )} */}

            <Link href={`/events/${event?.id}`}>
              <div
                className={cn(
                  "md:ml-6",
                  isPastEvent ? "text-gray-700/50" : "text-gray-700",
                )}
              >
                <p className="text-1xl font-semibold">
                  {event?.attributes?.title || "Untitled Event"}
                </p>

                {venName && <p className="text-xs">{venName}</p>}
                {venAdd && <p className="text-xs">{venAdd}</p>}
              </div>
            </Link>
          </div>
        </li>
      )}
    </>
  );
}
