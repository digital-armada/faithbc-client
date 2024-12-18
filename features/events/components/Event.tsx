"use client";

import React, { useEffect, useState } from "react";
import {
  format,
  isAfter,
  isSameDay,
  startOfToday,
  parseISO,
  compareAsc,
} from "date-fns";
import EventItem from "@/features/events/components/EventItem";
import PageHeader from "@/components/ui/PageHeader";

const MonthHeader = ({ month }) => (
  <div className="sticky top-0 mb-4 py-2 backdrop-blur-sm">
    <h2 className="text-xl font-semibold text-gray-700">{month}</h2>
  </div>
);

export default function Event({ initialEvents }) {
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(startOfToday());
  }, []);

  const isRegularEvent = (event) =>
    !event?.attributes?.eventType || event?.attributes?.eventType === "event";

  const getEventDate = (event) => {
    try {
      return event?.attributes?.startDate
        ? parseISO(event.attributes.startDate)
        : null;
    } catch {
      return null;
    }
  };

  if (!today) {
    return null;
  }

  // Filter and sort all valid future events (including today)
  const validEvents = Array.isArray(initialEvents)
    ? initialEvents
        .filter((event) => {
          if (!isRegularEvent(event)) return false;
          const eventDate = getEventDate(event);
          if (!eventDate) return false;
          return isSameDay(eventDate, today) || isAfter(eventDate, today);
        })
        .sort((a, b) => {
          const dateA = getEventDate(a);
          const dateB = getEventDate(b);
          if (dateA && dateB) {
            return compareAsc(dateA, dateB);
          }
          return 0;
        })
    : [];

  // Group events by month
  const eventsByMonth = validEvents.reduce(
    (acc, event) => {
      const eventDate = getEventDate(event);
      if (eventDate) {
        const monthYear = format(eventDate, "MMMM yyyy");

        if (!acc[monthYear]) {
          acc[monthYear] = [];
        }
        acc[monthYear].push(event);
      }
      return acc;
    },
    {} as Record<string, typeof validEvents>,
  );

  return (
    <section className="min-h-screen">
      <div className="container py-8">
        <PageHeader heading="Events" />

        <div className="mt-8 space-y-12">
          {Object.entries(eventsByMonth).map(([monthYear, events]) => (
            <div key={monthYear} className="rounded-lg p-6">
              <MonthHeader month={monthYear} />
              <div>
                {(events as any[]).map((event, index) => (
                  <div key={index} className="py-4">
                    <EventItem event={event} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {Object.keys(eventsByMonth).length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">
              No upcoming events scheduled
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
