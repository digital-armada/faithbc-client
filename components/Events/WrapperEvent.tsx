"use client";

import InfiniteScroll from "@/components/ui/InfiniteScroll";
import { getInfiniteEvents } from "@/data/events";
import EventItem from "./EventItem";
import { format, isAfter, isBefore, isSameDay, isSameMonth } from "date-fns";
import PageHeader from "../ui/PageHeader";
// import formatDateRange from "@/lib/formatDate";

export default function WrapperEvent({ initialEvents }) {
  //////////////////////////////
  const fetchData = async ({ page }) => {
    const { data } = await getInfiniteEvents({ page });
    return data;
  };
  //////////////////////////////

  const renderItem = (event, index) => <EventItem key={index} event={event} />;
  const today = new Date();
  const currentMonth = format(today, "MMMM");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  //////////////////////////////

  const upcomingEvents = initialEvents
    .filter((event) => {
      const eventDate = new Date(event?.attributes?.startDate);
      return (
        event?.attributes?.eventType === null && // filter out eventType null
        isAfter(eventDate, today) &&
        (eventDate?.getMonth() > today.getMonth() ||
          eventDate?.getFullYear() > today.getFullYear())
      );
    })
    .sort(
      (a, b) =>
        new Date(a?.attributes?.startDate).getTime() -
        new Date(b?.attributes?.startDate).getTime(),
    );

  /**
   * The error you're encountering is due to TypeScript's type checking, which expects the operands of the subtraction operation to be of type number, bigint, or enum. When you subtract two Date objects, TypeScript doesn't automatically convert them to numbers (timestamps).To fix this, you need to explicitly convert the Date objects to their timestamp values (which are numbers) before performing the subtraction. You can do this using the getTime method of the Date object.
   */

  const thisMonthEvents = initialEvents.filter((event) => {
    const eventDate = new Date(event.attributes.startDate);
    return (
      event.attributes.eventType === null && // filter out eventType null
      isSameMonth(eventDate, today) &&
      (isSameDay(eventDate, today) || isAfter(eventDate, today))
    );
  });

  const pastEvents = initialEvents.filter((event) => {
    const eventDate = new Date(event.attributes.startDate);
    return isBefore(eventDate, tomorrow) && !isSameDay(eventDate, today);
  });
  console.log(pastEvents);
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
