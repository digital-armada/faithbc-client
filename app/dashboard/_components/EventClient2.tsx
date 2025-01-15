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
import { format, parseISO } from "date-fns";
import formatEventTime from "@/lib/formatDateTime";

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
  const {
    title,
    eventStartDate,
    eventEndDate,
    eventStartTime,
    eventEndTime,
    featuredImage,
    venAdd,
    venName,
    organiser,
  } = event;
  return (
    <>
      <Card className="w-full overflow-hidden">
        {/* <pre>{JSON.stringify(event, null, 2)}</pre> */}
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
            <div className="flex-initial text-xs sm:inline-block">
              <p>
                {format(eventStartDate, "PPPP")}
                {eventStartTime &&
                  ` @ ${formatEventTime(eventStartTime)}${eventEndTime ? ` - ${formatEventTime(eventEndTime)}` : ""}`}
              </p>
            </div>
            <div className="flex flex-col text-xs text-muted-foreground md:flex-row md:gap-4">
              {event.venName && (
                <div className="mt-1 flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />

                  <span>{event.venName}</span>
                </div>
              )}

              {event.venAdd && (
                <div className="mt-1 flex items-center">
                  <Map className="mr-1 h-4 w-4" />
                  <span>{event.venAdd}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
