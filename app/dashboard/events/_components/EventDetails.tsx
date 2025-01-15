"use client";

import EventMap from "@/components/features/events/components/EventMap";
import RenderTipTap from "@/components/features/events/components/RenderTipTap";
import formatEventTime from "@/lib/formatDateTime";
import { format } from "date-fns";
import { Suspense } from "react";
import { IoMdCalendar, IoMdMap } from "react-icons/io";

interface EventDetailsProps {
  title: string;
  startDate: string;
  endDate: string | null;
  venName: string | null;
  venAdd: string;
  content: string | null;
  startTime: string | null;
  endTime: string | null;
  organizer: string | null;
}

const EventDetails = ({
  startDate,
  endDate,
  startTime,
  endTime,
  venName,
  venAdd,
  content,
  organizer,
}: EventDetailsProps) => {
  return (
    <div className="w-full space-y-8 pb-8 text-gray-700">
      <div>
        <div className="mb-8 space-y-8">
          {/* /// DATE AND TIME */}
          <div>
            <h3 className="text-lg font-bold">Date and Time</h3>
            <div className="flex items-center gap-3">
              <IoMdCalendar className="text-2xl" />
              {format(startDate, "PPPP")}
              {startTime &&
                ` @ ${formatEventTime(startTime)}${endTime ? ` - ${formatEventTime(endTime)}` : ""}`}
            </div>
          </div>
          {/* /// LOCATION */}
          {(venName || venAdd) && (
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="flex-1">
                <h3 className="text-lg font-bold">Location</h3>
                <div className="flex items-start gap-3">
                  <IoMdMap className="text-2xl" />
                  <div>
                    {venName && <div className="text-md">{venName}</div>}
                    {venAdd && (
                      <div className="text-xs font-light">{venAdd}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* /// ORGANIZER */}
          {organizer && (
            <div>
              <h3 className="text-lg font-bold">Organizer</h3>
              <div className="flex items-start gap-3">
                <div>
                  <div className="text-md">{organizer}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* /// MAP */}
        <div className="w-full flex-1">
          <Suspense fallback={<div>Loading...</div>}>
            <EventMap address={venAdd} />
          </Suspense>
        </div>{" "}
      </div>
      <div>
        {/* /// ABOUT */}
        {content && content !== "<p></p>" && (
          <>
            <h3 className="mt-10 text-lg font-bold text-gray-700">About</h3>
            <RenderTipTap content={content} />
          </>
        )}{" "}
      </div>
    </div>
  );
};

export default EventDetails;
