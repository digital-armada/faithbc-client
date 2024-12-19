"use client";
import { DateTime } from "luxon";

interface DateDisplayProps {
  isoString: string;
}

export default function DateDisplay({ isoString }: DateDisplayProps) {
  const sydneyDate = DateTime.fromISO(isoString)
    .setZone("Australia/Sydney")
    .toFormat("MMM dd, yyyy h:mm a");

  return <div>{sydneyDate}</div>;
}
