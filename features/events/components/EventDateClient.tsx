"use client";
import { DateTime } from "luxon";

export default function EventDateClient({ startDate, endDate }) {
  // First create a DateTime from the ISO string in UTC
  const utcDate = DateTime.fromISO(startDate, { zone: "UTC" });

  // Convert to Sydney time while preserving the intended local time
  const formattedDate = utcDate
    .setZone("Australia/Sydney", { keepLocalTime: false })
    .toFormat("EEE, d MMM yyyy, h:mm a ZZZZZ");

  console.log("UTC input:", startDate);
  console.log("Sydney output:", formattedDate);

  return <div>{formattedDate}</div>;
}
