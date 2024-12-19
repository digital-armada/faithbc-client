"use client";
import { DateTime } from "luxon";

export default function EventDateClient({ startDate, endDate }) {
  // Log the incoming date for verification
  console.log("Input startDate:", startDate);

  const sydneyTime = DateTime.fromISO(startDate)
    .setZone("Australia/Sydney")
    .toFormat("EEE, d MMM yyyy, h:mm a ZZZZZ");

  // Log the calculated time for verification
  console.log("Calculated Sydney time:", sydneyTime);

  return <div>{sydneyTime}</div>;
}
