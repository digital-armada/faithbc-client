"use client";

import { format } from "date-fns";

export default function AnnouncementItem({ announcement }) {
  const date = new Date(announcement.attributes.announcementDate);
  return (
    <div key={announcement.id} className="mb-4 last:mb-0">
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium">{announcement.attributes.message}</p>
        <p className="text-xs text-muted-foreground">
          <span>
            {format(new Date(date), "EEE MMM dd yyyy")}
            {new Date(date).toTimeString().slice(0, 8) !== "00:00:00" &&
              ` ${format(new Date(date), "h:mm a")}`}
          </span>
          {/* {format(
            parseISO(announcement.attributes.date),
            announcement.attributes.date.endsWith("13:00:00.000Z")
              ? "eeee PP"
              : "eeee PPpp",
          )} */}
        </p>
      </div>
      <hr className="my-2 border-muted" />
    </div>
  );
}
