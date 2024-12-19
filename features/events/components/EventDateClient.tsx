"use client";
import { DateTime } from "luxon";

export default function EventDateClient({ startDate, endDate }) {
  // Log input for verification
  console.log("Original UTC input:", startDate);

  const formattedDate = DateTime.fromISO(startDate)
    .toUTC()
    .setZone("Australia/Sydney")
    .toFormat("EEE, d MMM yyyy, h:mm a ZZZZZ");

  // Log output for verification
  console.log("Formatted Sydney time:", formattedDate);

  return <div>{formattedDate}</div>;
}
