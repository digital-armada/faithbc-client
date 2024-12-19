"use client";
import { DateTime } from "luxon";

export function formatDateForTimezone(
  date: string | Date,
  timeZone = "Australia/Sydney",
) {
  return DateTime.fromISO(date.toString())
    .setZone(timeZone)
    .toFormat("yyyy-MM-dd'T'HH:mm:ssZZ");
}
