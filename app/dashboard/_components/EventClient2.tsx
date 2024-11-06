"use client";
/**
 //TODO: Enable the dropdown to open for additional details
 //TODO: Fix the markdown rendering for event details
 */
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Map, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { format, toDate } from "date-fns-tz";

export default function EventClient2({ events }) {
  return (
    <div className="container mx-auto space-y-4 p-4">
      <h2 className="mb-4 text-center text-2xl font-bold">Upcoming Events</h2>
      {events.data.map((event) => {
        return <EventCard key={event.id} event={event.attributes} />;
      })}
    </div>
  );
}

function EventCard({ event }) {
  // const [isExpanded, setIsExpanded] = useState(false);

  const sydneyTimeZone = "Australia/Sydney";

  // Convert dates to Date objects
  const startDateObj = event?.startDate
    ? toDate(new Date(event.startDate), { timeZone: sydneyTimeZone })
    : null;

  const endDateObj = event?.endDate
    ? toDate(new Date(event.endDate), { timeZone: sydneyTimeZone })
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

  // Check if dates are different for comparison
  const areDifferentDates =
    startDateObj &&
    endDateObj &&
    startDateObj.getTime() !== endDateObj.getTime();

  const shouldShowEndDate = endDate && endDate !== "Jan 1st";

  return (
    <>
      <Card className="w-full overflow-hidden">
        <div className="flex items-center p-4">
          {event.featuredImage.data?.attributes?.url ? (
            <Image
              src={event.featuredImage.data?.attributes?.url}
              alt={event.title}
              width={100}
              height={100}
              className="mr-4 h-12 w-12 rounded-full object-cover"
            />
          ) : (
            ""
          )}
          <div className="flex-grow">
            <h3 className="font-semibold">{event.title}</h3>
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
            <div className="flex gap-4 text-xs text-muted-foreground">
              {event.venAdd && (
                <div className="mt-1 flex items-center">
                  <Map className="mr-1 h-4 w-4" />
                  <span>{event.venAdd}</span>
                </div>
              )}

              {event.venName && (
                <div className="mt-1 flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />

                  <span>{event.venName}</span>
                </div>
              )}
            </div>
          </div>
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls={`details-${event.id}`}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span className="sr-only">
              {isExpanded ? "Hide" : "Show"} details
            </span>
          </Button> */}
        </div>
        {/* {isExpanded && (
          <CardContent id={`details-${event.id}`}>
            <p className="text-sm">{event.description}</p>
          </CardContent>
        )} */}
      </Card>
    </>
  );
}
