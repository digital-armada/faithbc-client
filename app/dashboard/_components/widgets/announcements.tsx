import { getAnnouncements } from "@/data/services/announcement-service";
import formatDateTime from "@/lib/formatDateTime";
import WidgetHeadings from "../WidgetHeadings";

export default async function Announcements({ className }) {
  const { data } = await getAnnouncements({ includesPast: false });
  console.log(data);
  if (data?.data.length == 0) {
    return (
      <div className={className}>
        <WidgetHeadings heading="No New Announcements" />
      </div>
    );
  }
  if (data?.data.length > 0) {
    return (
      <>
        <div className={className}>
          <WidgetHeadings heading="Announcements" />
          {data?.data.map((announcement) => (
            <div key={announcement.id} className="flex gap-4">
              <div>{formatDateTime(announcement.attributes.date)}</div>
              <div>{announcement.attributes.message}</div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
