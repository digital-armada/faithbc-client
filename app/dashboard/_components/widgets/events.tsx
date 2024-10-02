import { format } from "date-fns";
import WidgetHeadings from "../WidgetHeadings";

export default function Events({ className, events }) {
  return (
    <div className={className}>
      <WidgetHeadings heading="Events" />
      {events?.data.map((event) => {
        return (
          <div key={event?.id}>
            <div>{event?.attributes?.title}</div>
            <div className="flex text-sm font-light">
              {event?.attributes?.startDate ? (
                <div>
                  {format(event?.attributes?.startDate, "MMMM d, yyyy")}
                </div>
              ) : (
                ""
              )}
              {event?.attributes?.endDat && <span>&nbsp;-&nbsp;</span>}
              {event?.attributes?.endDate ? (
                <div>{format(event?.attributes?.endDate, "MMMM d, yyyy")}</div>
              ) : (
                ""
              )}
            </div>
            {event?.data > 1 && <hr />}
          </div>
        );
      })}
    </div>
  );
}
