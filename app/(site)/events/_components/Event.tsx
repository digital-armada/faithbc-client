"use client";

import React, { useEffect, useState } from "react";
import InfiniteScroll from "@/components/ui/InfiniteScroll";
import { getInfiniteEvents } from "@/data/events";
import EventItem from "@/app/(site)/events/_components/EventItem";
import { format, isAfter, isBefore, isSameDay, isSameMonth } from "date-fns";
import { toDate, formatInTimeZone } from "date-fns-tz";
import PageHeader from "@/components/ui/PageHeader";

export default function Event({ initialEvents }) {
  const sydneyTimeZone = "Australia/Sydney";

  const [dates, setDates] = useState({
    today: null,
    tomorrow: null,
    currentMonth: null,
  });

  useEffect(() => {
    const today = toDate(new Date(), { timeZone: sydneyTimeZone });
    const currentMonth = formatInTimeZone(today, sydneyTimeZone, "MMMM");
    const tomorrow = toDate(new Date(today), { timeZone: sydneyTimeZone });
    tomorrow.setDate(tomorrow.getDate() + 1);

    setDates({
      today,
      tomorrow,
      currentMonth,
    });
  }, []);

  const { today, tomorrow, currentMonth } = dates;

  const fetchData = async ({ page }) => {
    const { data } = await getInfiniteEvents({ page });
    return data;
  };

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

  if (!today || !tomorrow || !currentMonth) {
    return null; // or a loader, or placeholder UI
  }

  // Future events (beyond current month)
  const upcomingEvents = initialEvents
    .filter((event) => {
      if (!isRegularEvent(event)) return false;

      const eventDate = getEventDate(event);
      if (!eventDate) return false;

      return (
        isAfter(eventDate, today) &&
        (eventDate.getMonth() > today.getMonth() ||
          eventDate.getFullYear() > today.getFullYear())
      );
    })
    .sort((a, b) => {
      const dateA = getEventDate(a);
      const dateB = getEventDate(b);
      return dateA.getTime() - dateB.getTime();
    });

  // Current month events
  const thisMonthEvents = initialEvents
    .filter((event) => {
      if (!isRegularEvent(event)) return false;

      const eventDate = getEventDate(event);
      if (!eventDate) return false;

      return (
        isSameMonth(eventDate, today) &&
        (isSameDay(eventDate, today) || isAfter(eventDate, today))
      );
    })
    .sort((a, b) => {
      const dateA = getEventDate(a);
      const dateB = getEventDate(b);
      return dateA.getTime() - dateB.getTime();
    });

  // Past events
  const pastEvents = initialEvents
    .filter((event) => {
      const eventDate = getEventDate(event);
      if (!eventDate) return false;

      return isBefore(eventDate, tomorrow) && !isSameDay(eventDate, today);
    })
    .sort((a, b) => {
      const dateA = getEventDate(a);
      const dateB = getEventDate(b);
      return dateB.getTime() - dateA.getTime(); // Reverse chronological order for past events
    });

  const renderItem = (event, index) => <EventItem key={index} event={event} />;

  return (
    <section>
      <div className="container">
        <PageHeader heading="Events" />

        <ul className="text-gray-700">
          {thisMonthEvents.length > 0 && (
            <div className="mb-20">
              <h2 className="mb-4 text-2xl font-bold text-gray-600">
                Events This {currentMonth}
              </h2>
              <div className="divide-y divide-gray-800/10">
                {thisMonthEvents.map(renderItem)}
              </div>
            </div>
          )}

          {upcomingEvents.length > 0 && (
            <div className="mb-20">
              <h2 className="mb-4 text-2xl font-bold text-gray-600">
                Future Events
              </h2>
              <div className="divide-y divide-gray-800/10">
                {upcomingEvents.map(renderItem)}
              </div>
            </div>
          )}

          <h2 className="mb-4 text-2xl font-bold text-gray-600">Past Events</h2>
          <div className="divide-y divide-gray-800/10">
            <InfiniteScroll
              initialData={pastEvents}
              fetchData={fetchData}
              renderItem={renderItem}
            />
          </div>
        </ul>
      </div>
    </section>
  );
}
