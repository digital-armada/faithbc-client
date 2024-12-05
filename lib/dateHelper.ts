import { format } from "date-fns-tz";

export function formatDateForTimezone(date, timeZone = "Australia/Sydney") {
  // Ensure the input date is a valid Date object
  const parsedDate = new Date(date);

  // Using format from date-fns-tz to format the date according to the specified timezone
  return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone });
}
