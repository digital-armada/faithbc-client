import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Clock, Map, MapPinIcon } from "lucide-react";
import formatEventTime from "@/lib/formatDateTime";

export default function EventItem({ event }) {
  const {
    title,
    organiser,
    venName,
    venAdd,
    eventStartDate,
    eventEndDate,
    eventStartTime,
    eventEndTime,
  } = event.attributes;

  return (
    <>
      <Link href={`/events/${event?.id}`}>
        {/* <pre>{JSON.stringify(event, null, 4)}</pre> */}
        <li key={event.id} className="flex justify-start space-x-4 py-4">
          <div className="mx-auto flex flex-col items-center pt-1 font-body text-sm">
            <div className="text-center">{format(eventStartDate, "EEE")}</div>
            <div className="text-center font-bold">
              {format(eventStartDate, "do")}
            </div>
          </div>
          {event?.attributes?.featuredImage?.data?.attributes?.url && (
            <Image
              src={event.attributes.featuredImage.data.attributes.url}
              className="size-28 flex-none rounded-md object-cover"
              alt={event?.attributes?.title || "Event image"}
              width={200}
              height={200}
            />
          )}
          <div className="flex-1 space-y-1">
            <p className="text-2xl font-semibold">
              {event?.attributes?.title || "Untitled Event"}
            </p>

            {eventStartTime && (
              <div className="inline-flex items-center rounded-md bg-gray-400 px-[4px] py-[2px] font-body text-[10px] font-light text-gray-300">
                <Clock width={12} height={12} className="mr-1" />
                <span>
                  {formatEventTime(eventStartTime)}
                  {eventEndTime && ` - ${formatEventTime(eventEndTime)}`}
                </span>
              </div>
            )}
            {venName && (
              <div className="flex items-center text-[10px]">
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
      </Link>
    </>
  );
}
