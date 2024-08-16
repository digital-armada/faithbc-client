import { format, isValid } from "date-fns";

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  if (!isValid(date)) return ""; // Return an empty string or handle invalid dates accordingly
  const timeString = format(date, "p"); // Format the time
  const isMidnight = timeString === "12:00 AM";
  if (isMidnight) {
    return format(date, "PP"); // Format only the date
  } else {
    return format(date, "PPpp"); // Format date and time
  }
};
export default formatDateTime;
