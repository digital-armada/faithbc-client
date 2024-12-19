"use client";
import { DateTime } from "luxon";

interface DateDisplayProps {
  isoString: string;
}

export default function DateDisplay({ isoString }: DateDisplayProps) {
  console.log("isoString", isoString);
  const sydneyDate = DateTime.fromISO(isoString)
    .setZone("Australia/Sydney")
    .toFormat("MMM dd, yyyy h:mm a");
  console.log(sydneyDate);
  // Simple check if we have a valid date string
  if (!isoString) {
    return <div>No date available</div>;
  }

  return <div>{sydneyDate}</div>;
}

// "use client";
// import { DateTime } from "luxon";
//
// export default function DateDisplay({ date }, timeZone = "Australia/Sydney") {
//   console.log(typeof date);
//   // Convert the input date to a Luxon DateTime object
//   const dateTime =
//     typeof date === "string"
//       ? DateTime.fromISO(date, { zone: "utc" }) // Parse string as UTC
//       : DateTime.fromJSDate(date); // Handle Date object
//   console.log(dateTime);
//   // Convert to the specified time zone
//   const localDateTime = dateTime.setZone(timeZone);
//
//   // Format the date as needed
//   return localDateTime.toFormat("yyyy-MM-dd'T'HH:mm:ssZZ");
// }

// "use client";
// import { DateTime } from "luxon";
//
// interface DateDisplayProps {
//   isoString: string;
// }
//
// export default function DateDisplay({ isoString }: DateDisplayProps) {
//   const sydneyDate = DateTime.fromISO(isoString)
//     .setZone("Australia/Sydney")
//     .toFormat("MMM dd, yyyy h:mm a");
//
//   return <div>{sydneyDate}</div>;
// }
