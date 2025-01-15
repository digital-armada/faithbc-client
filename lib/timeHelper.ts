import { format } from "date-fns";

// Add this helper function
const formatTimeString = (time: string | null) => {
  const baseTime = time?.split(":").slice(0, 2).join(":");
  return `${baseTime}:00.000`;
};

export default formatTimeString;

export const formatTime = (timeString: string | null) => {
  if (!timeString) return null;
  // Create a full date string by adding the time to a base date
  const date = new Date(`1970-01-01T${timeString}`);
  return format(date, "h:mm a"); // will output "5:13 AM"
};
