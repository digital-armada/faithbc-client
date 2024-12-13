import { format } from "date-fns";
import { CalendarIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import WidgetHeadings from "../WidgetHeadings";

interface Event {
  id: number;
  attributes: {
    title: string;
    startDate: string;
    endDate?: string;
  };
}

interface EventsProps {
  className?: string;
  events: {
    data: Event[];
  };
}

export default function EventWidget({ className, events }: EventsProps) {
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <WidgetHeadings heading="Upcoming Events" />
      </CardHeader>
      {events.data.length > 0 ? (
        <CardContent>
          <ScrollArea className="h-[250px] pr-4">
            {events?.data.map((event, index) => (
              <div key={event?.id} className="mb-4 last:mb-0">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium">
                      {event?.attributes?.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {event?.attributes?.startDate &&
                        format(
                          new Date(event.attributes.startDate),
                          "MMMM d, yyyy",
                        )}
                      {event?.attributes?.endDate && (
                        <>
                          <span>&ndash;</span>
                          {format(
                            new Date(event.attributes.endDate),
                            "MMMM d, yyyy",
                          )}
                        </>
                      )}
                    </p>
                  </div>
                </div>
                {index < events.data.length - 1 && (
                  <hr className="my-2 border-muted" />
                )}
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      ) : (
        <CardContent>
          <p className="text-center text-sm text-muted-foreground">
            No new events
          </p>
        </CardContent>
      )}
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Events
          <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
