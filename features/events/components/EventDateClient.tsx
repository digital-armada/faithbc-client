"use client";
import { DateTime } from "luxon";

export default function EventDateClient({ startDate, endDate }) {
  const formattedDate = DateTime.fromISO(startDate)
    .setZone("Australia/Sydney")
    .toFormat("dd/MM/yyyy, h:mm a");

  return <div>{formattedDate}</div>;
}
