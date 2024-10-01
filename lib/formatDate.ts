import { format, isSameDay, parseISO } from "date-fns";

const formatDateRange = (
  startDate: string | null,
  endDate: string | null,
): string => {
  if (!startDate && !endDate) {
    return "";
  }

  const start = startDate ? parseISO(startDate) : null;
  const end = endDate ? parseISO(endDate) : null;

  if (!start && !end) {
    return "";
  }

  const hasTime = (date: Date | null): boolean =>
    date?.getHours() !== 0 ||
    date?.getMinutes() !== 0 ||
    date?.getSeconds() !== 0;

  const startHasTime = hasTime(start);
  const endHasTime = hasTime(end);

  const startDateFormat = startHasTime ? "EEE, d MMM, h:mm a" : "EEE, d MMM";
  const endDateFormat = endHasTime ? "h:mm a" : "";
  const endDateFullFormat = endHasTime ? "EEE, d MMM, h:mm a" : "EEE, d MMM";

  if (start && end && isSameDay(start, end)) {
    return startHasTime || endHasTime
      ? `${format(start, startDateFormat)} to ${format(end, endDateFormat)}`
      : format(start, startDateFormat);
  } else if (start && end) {
    return `${format(start, startDateFormat)} to ${format(end, endDateFullFormat)}`;
  } else if (start) {
    return format(start, startDateFormat);
  } else if (end) {
    return format(end, endDateFullFormat);
  }

  return "";
};

export default formatDateRange;
