"use client";

import React, { useEffect, useState, Fragment } from "react";
import Link from "next/link";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";

import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
  isAfter,
  isBefore,
  addDays,
  getHours,
  getMinutes,
  startOfDay,
} from "date-fns";
import Image from "next/image";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EventClient({ data }) {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today); // When a date is clicked on in the calendar, it will display the events for that day on the right
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  // console.log(currentMonth);
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date()); // GET THE FIRST DAY OF THE MONTH

  /**
   * SHAPE THE DATA
   */
  let meetings = data?.data.map((event) => ({
    id: event?.id,
    slug: event?.attributes?.slug,
    name: event?.attributes?.title,
    imageUrl:
      event?.attributes?.featuredImage?.data?.attributes?.formats?.thumbnail
        ?.url,
    startDatetime: event?.attributes?.startDate,
    endDatetime: event?.attributes?.endDate || "", // Use start date if end date is not available
  }));
  /**
   *  GENERATE DAYS FOR THE MONTH
   *
   *  eachDayOfInterval - generates all the days between that start and end
   *  endOfMonth - gets the last day of the month from the value passed in.
   */

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  /**
   * PAGINATE FUNCTIONS FOR CALENDAR NAV
   *
   * add - takes the data and then adds or subtracts according to the argument given. In this case, take the date and go back one month. Can also use years, months, weeks, days, hours, minutes, seconds.
   * format - formats the date to the desired format. In this case, MMM-yyyy. 'Jun-2024'
   *
   */

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  let selectedDayMeetings = meetings.filter((meeting) => {
    // console.log(meeting);

    const filtered =
      isWithinEventRange(
        selectedDay,
        parseISO(meeting.startDatetime),
        parseISO(meeting.endDatetime),
      ) || isSameDay(parseISO(meeting.startDatetime), selectedDay);
    return filtered;
  });
  // console.log(selectedDayMeetings);
  function isWithinEventRange(day, start, end) {
    if (!end || end.toString() === "Invalid Date" || isSameDay(start, end)) {
      // Handle events without an end date or end date on the same day (single-day event)
      const sameDay = isSameDay(day, start);
      return sameDay;
    }
    const withinRange =
      (isAfter(day, start) || isEqual(day, start)) &&
      (isBefore(day, end) || isEqual(day, end));
    // console.log(withinRange);
    return withinRange;
  }

  return (
    <>
      <div className="py-20">
        <div className="mx-auto max-w-md md:max-w-4xl">
          <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
            <div className="md:pr-14">
              <div className="flex items-center">
                <h2 className="flex-auto font-semibold text-gray-900">
                  {format(firstDayCurrentMonth, "MMMM yyyy")}
                </h2>
                <button
                  type="button"
                  onClick={previousMonth}
                  className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Previous month</span>
                  <BiChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={nextMonth}
                  type="button"
                  className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Next month</span>
                  <BiChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
              </div>
              <div className="mt-2 grid grid-cols-7 text-sm">
                {days.map((day, dayIdx) => (
                  <div
                    key={day.toString()}
                    className={classNames(
                      dayIdx === 0 && colStartClasses[getDay(day)],
                      "py-1.5",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={classNames(
                        isEqual(day, selectedDay) && "text-white",
                        !isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "text-red-500",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-900",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-400",
                        isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "bg-red-500",
                        isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          "bg-gray-900",
                        !isEqual(day, selectedDay) && "hover:bg-gray-200",
                        (isEqual(day, selectedDay) || isToday(day)) &&
                          "font-semibold",
                        "mx-auto flex h-8 w-8 items-center justify-center rounded-full",
                      )}
                    >
                      <time dateTime={format(day, "yyyy-MM-dd")}>
                        {format(day, "d")}
                      </time>
                    </button>
                    {/* CALENDAR EVENT DOTS */}
                    <div className="mx-auto mt-1 h-1 w-1">
                      {meetings.some((meeting) =>
                        isWithinEventRange(
                          day,
                          parseISO(meeting?.startDatetime),
                          parseISO(meeting?.endDatetime),
                        ),
                      ) && (
                        <div className="h-1 w-1 rounded-full bg-sky-500"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <section className="mt-12 md:mt-0 md:pl-14">
              <h2 className="font-semibold text-gray-900">
                <span>Events for </span>
                <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                  {format(selectedDay, "MMM dd, yyy")}
                </time>
              </h2>

              <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                {selectedDayMeetings.length > 0 ? (
                  selectedDayMeetings.map((meeting) => (
                    <Meeting meeting={meeting} key={meeting.id} />
                  ))
                ) : (
                  <p>No events for today.</p>
                )}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

function Meeting({ meeting }) {
  const startDateTime = parseISO(meeting.startDatetime);
  const endDateTime = meeting.endDatetime
    ? parseISO(meeting.endDatetime)
    : null;

  const isMidnight = (date) => getHours(date) === 0 && getMinutes(date) === 0;

  return (
    <Link href={`/events/${encodeURIComponent(meeting?.slug)}`}>
      <li className="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-200">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${meeting.imageUrl}`}
          alt=""
          className="h-10 w-10 flex-none rounded-full object-cover"
        />
        <div className="flex-auto">
          <p className="text-gray-900">{meeting.name}</p>
          <p className="mt-0.5">
            {meeting.endDatetime && !isSameDay(startDateTime, endDateTime) ? (
              <>
                <time dateTime={meeting?.startDatetime}>
                  {isMidnight(startDateTime)
                    ? format(startDateTime, "MMM d")
                    : format(startDateTime, "MMM d, h:mm a")}
                </time>
                <time dateTime={meeting?.endDatetime}>
                  <span> - </span>
                  {isMidnight(endDateTime)
                    ? format(endDateTime, "MMM d")
                    : format(endDateTime, "MMM d, h:mm a")}
                </time>
              </>
            ) : (
              <>
                <time dateTime={meeting?.startDatetime}>
                  {isMidnight(startDateTime)
                    ? format(startDateTime, "MMM d")
                    : format(startDateTime, "MMM d - h:mm a")}
                </time>
                {meeting?.endDatetime && (
                  <time dateTime={meeting?.endDatetime}>
                    <span> - </span>
                    {isMidnight(endDateTime)
                      ? format(endDateTime, "MMM d")
                      : format(endDateTime, "h:mm a")}
                  </time>
                )}
              </>
            )}
          </p>
        </div>
      </li>
    </Link>
  );
}

// CSS CLASS GRID
let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
