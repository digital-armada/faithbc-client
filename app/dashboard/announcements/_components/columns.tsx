"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { labels } from "./data/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import { TiTrash } from "react-icons/ti";
import { deleteAnnouncement } from "@/components/features/announcements/announcement-actions";
// import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { set } from "lodash";
import formatTimeString, { formatTime } from "@/lib/timeHelper";

type AnnouncementAttributes = {
  message: string;
  announcementDate: string;
  announcementTime: string;
};

type Announcements = {
  id: number; // Unique identifier for the announcement
  attributes: AnnouncementAttributes; // Nested attributes
};

const columnHelper = createColumnHelper<Announcements>();

export const defaultColumns = [
  columnHelper.accessor("attributes.announcementDate", {
    header: () => <span>Date & Time</span>,
    cell: (props) => {
      const date = new Date(props.getValue());
      const time = formatTime(props.row.original.attributes.announcementTime); // access the time field

      return (
        <div>
          <span>{format(new Date(date), "EEE MMM dd yyyy")}</span>
          {time && <span> {`@ ${time}`}</span>}
        </div>
      );
    },
  }),

  columnHelper.accessor("attributes.message", {
    header: () => <span>Message</span>,
    cell: (props) => <span>{props.getValue()}</span>,
  }),

  columnHelper.display({
    id: "actions",
    cell: (props) => {
      // const { toast } = useToast();
      // const [pending, setIsPending] = useState(false);

      const handleDelete = async () => {
        // setIsPending(true);
        // toast({
        //   title: "Deleting...",
        //   description: "Please wait while we delete the announcement",
        // });
        const result = await deleteAnnouncement(props.row.original.id);
        // setIsPending(false);
        // if (result.error) {
        //   toast({
        //     variant: "destructive",
        //     title: "Error",
        //     description: result.error,
        //   });
        // } else {
        //   toast({
        //     variant: "success",
        //     title: "Success",
        //     description: "Announcement deleted successfully",
        //   });
        // }
      };

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDelete}>
                <TiTrash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  }),
];
