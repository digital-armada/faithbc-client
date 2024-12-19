"use client";
import { DateTime } from "luxon";

export function formatDateForTimezone(
  date: string | Date,
  timeZone = "Australia/Sydney",
) {
  // Convert the input date to a Luxon DateTime object
  const dateTime =
    typeof date === "string"
      ? DateTime.fromISO(date, { zone: "utc" }) // Parse string as UTC
      : DateTime.fromJSDate(date); // Handle Date object

  // Convert to the specified time zone
  const localDateTime = dateTime.setZone(timeZone);

  // Format the date as needed
  return localDateTime.toFormat("yyyy-MM-dd'T'HH:mm:ssZZ");
}
