"use client";
import { DateTime } from "luxon";
export default function EventDateClient({ startDate, endDate }) {
  console.log("startDate", startDate);
  const startDateObj = DateTime.fromISO(startDate, { zone: "utc" })
    .setZone("Australia/Sydney")
    .toFormat("EEE, d MMM, h:mm a");
  return <div>{startDateObj}</div>;
}
