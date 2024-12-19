"use client";
import { DateTime } from "luxon";

export default function EventDateClient({ startDate, endDate }) {
  const formattedDate = DateTime.fromISO(startDate, { zone: "UTC" })
    .setZone("Australia/Sydney", { keepLocalTime: true })
    .toFormat("EEE, d MMM yyyy, h:mm a ZZZZZ");

  return <div>{formattedDate}</div>;
}
