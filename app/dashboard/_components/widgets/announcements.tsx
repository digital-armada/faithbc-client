import { getAnnouncements } from "@/data/services/announcement-service";
import WidgetHeadings from "../WidgetHeadings";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BellIcon, BellOffIcon } from "lucide-react";
import AnnouncementItem from "../../announcements/_components/AnnouncementItem";

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
  // console.log("announcements", data);
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
              <AnnouncementItem
                key={announcement.id}
                announcement={announcement}
              />
            ))}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
