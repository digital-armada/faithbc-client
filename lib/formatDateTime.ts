import { format } from "date-fns";

/**
 * Helper function to format a time string (e.g., "20:00:00.000")
 * @param {string} timeString - The time string to format (e.g., "20:00:00.000").
 * @param {string} outputFormat - The desired format for the output (default: "hh:mm a").
 * @returns {string} - The formatted time string.
 */
const formatEventTime = (
  timeString: string | null,
  outputFormat = "h:mm a",
) => {
  if (!timeString) {
    return null;
  }

  const [hours, minutes, seconds] = timeString.split(":");
  const now = new Date();
  const eventDateTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    parseInt(hours),
    parseInt(minutes),
    parseInt(seconds),
  );

  return format(eventDateTime, outputFormat);
};

export default formatEventTime;
