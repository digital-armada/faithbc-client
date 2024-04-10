import { format, isSameDay, parseISO } from 'date-fns';

const formatDateRange = (startDate, endDate) => {
    if (!startDate && !endDate) {
        return '';
    }

    const start = startDate ? parseISO(startDate) : null;
    const end = endDate ? parseISO(endDate) : null;

    if (!start && !end) {
        return '';
    }

    const startHasTime =
        start &&
        (start.getHours() !== 0 ||
            start.getMinutes() !== 0 ||
            start.getSeconds() !== 0);

    const endHasTime =
        end &&
        (end.getHours() !== 0 ||
            end.getMinutes() !== 0 ||
            end.getSeconds() !== 0);

    const startDateFormat = startHasTime ? 'EEE, d MMM, h:mm a' : 'EEE, d MMM';
    const endDateFormat = endHasTime ? 'h:mm a' : '';

    if (start && end && isSameDay(start, end)) {
        if (startHasTime && endHasTime) {
            return `${format(start, startDateFormat)} to ${format(
                end,
                endDateFormat
            )}`;
        } else if (startHasTime) {
            return `${format(start, startDateFormat)} to ${format(
                end,
                endDateFormat
            )}`;
        } else if (endHasTime) {
            return `${format(start, startDateFormat)} to ${format(
                end,
                endDateFormat
            )}`;
        } else {
            return format(start, startDateFormat);
        }
    } else if (start && end) {
        const endDateFullFormat = endHasTime
            ? 'EEE, d MMM, h:mm a'
            : 'EEE, d MMM';
        return `${format(start, startDateFormat)} to ${format(
            end,
            endDateFullFormat
        )}`;
    } else if (start) {
        return format(start, startDateFormat);
    } else if (end) {
        const endDateFullFormat = endHasTime
            ? 'EEE, d MMM, h:mm a'
            : 'EEE, d MMM';
        return format(end, endDateFullFormat);
    }

    return '';
};

export default formatDateRange;
