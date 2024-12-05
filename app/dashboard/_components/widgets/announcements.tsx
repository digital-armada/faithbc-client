import { getAnnouncements } from "@/data/services/announcement-service";
import WidgetHeadings from "../WidgetHeadings";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BellIcon, BellOffIcon } from "lucide-react";
import { format, parseISO } from "date-fns";

interface Announcement {
  id: number;
  attributes: {
    date: string;
    message: string;
  };
}

interface AnnouncementsProps {
  className?: string;
}

export default async function AnnouncementsWidget({
  className,
}: AnnouncementsProps) {
  const { data } = await getAnnouncements({ includesPast: false });

  return (
    <Card className={`h-auto w-full ${className}`}>
      <CardHeader>
        <WidgetHeadings
          heading={data?.data.length ? "Announcements" : "No New Announcements"}
          icon={
            data?.data.length ? (
              <BellIcon className="h-5 w-5" />
            ) : (
              <BellOffIcon className="h-5 w-5" />
            )
          }
        />
      </CardHeader>
      <CardContent>
        {data?.data.length === 0 ? (
          <p className="text-center text-muted-foreground">
            There are no new announcements at this time.
          </p>
        ) : (
          <ScrollArea className="pr-4">
            {data?.data.map((announcement: Announcement) => (
              <div key={announcement.id} className="mb-4 last:mb-0">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">
                    {announcement.attributes.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(
                      parseISO(announcement.attributes.date),
                      announcement.attributes.date.endsWith("13:00:00.000Z")
                        ? "eeee PP"
                        : "eeee PPpp",
                    )}
                  </p>
                </div>
                <hr className="my-2 border-muted" />
              </div>
            ))}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
