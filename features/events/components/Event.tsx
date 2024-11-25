"use client";

import React, { useEffect, useState } from "react";
import {
  format,
  isAfter,
  isSameDay,
  isSameMonth,
  startOfMonth,
  compareAsc,
} from "date-fns";
import { toDate, formatInTimeZone } from "date-fns-tz";
import EventItem from "@/features/events/components/EventItem";
import PageHeader from "@/components/ui/PageHeader";

const MonthHeader = ({ month }) => (
  <div className="sticky top-0 mb-4 py-2 backdrop-blur-sm">
    <h2 className="text-xl font-semibold text-gray-700">{month}</h2>
  </div>
);

export default function Event({ initialEvents }) {
  const sydneyTimeZone = "Australia/Sydney";
  const [dates, setDates] = useState({
    today: null,
    currentMonth: null,
  });

  useEffect(() => {
    const today = toDate(new Date(), { timeZone: sydneyTimeZone });
    const currentMonth = formatInTimeZone(today, sydneyTimeZone, "MMMM");

    setDates({
      today,
      currentMonth,
    });
  }, []);

  const { today } = dates;

  const isRegularEvent = (event) =>
    !event?.attributes?.eventType || event?.attributes?.eventType === "event";

  const getEventDate = (event) => {
    try {
      return event?.attributes?.startDate
        ? toDate(new Date(event.attributes.startDate), {
            timeZone: sydneyTimeZone,
          })
        : null;
    } catch {
      return null;
    }
  };

  if (!today) {
    return null;
  }

  // Filter and sort all valid future events (including today)
  const validEvents = initialEvents
    .filter((event) => {
      if (!isRegularEvent(event)) return false;
      const eventDate = getEventDate(event);
      if (!eventDate) return false;
      return isSameDay(eventDate, today) || isAfter(eventDate, today);
    })
    .sort((a, b) => {
      const dateA = getEventDate(a);
      const dateB = getEventDate(b);
      return compareAsc(dateA, dateB);
    });

  // Group events by month
  const eventsByMonth = validEvents.reduce((acc, event) => {
    const eventDate = getEventDate(event);
    const monthYear = format(eventDate, "MMMM yyyy");

    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(event);
    return acc;
  }, {});

  return (
    <section className="min-h-screen">
      <div className="container py-8">
        <PageHeader heading="Events" />

        <div className="mt-8 space-y-12">
          {Object.entries(eventsByMonth).map(([monthYear, events]) => (
            <div key={monthYear} className="rounded-lg p-6">
              <MonthHeader month={monthYear} />
              <div className="divide-y divide-gray-100">
                {events.map((event, index) => (
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
