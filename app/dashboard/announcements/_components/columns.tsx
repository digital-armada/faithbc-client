"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { labels } from "./data/data";
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
import { Announcement } from "@/src/domain/entities/models/Announcement";

const columnHelper = createColumnHelper<Announcement>();

export const AnnouncementColumns: ColumnDef<Announcement>[] = [
  {
    accessorFn: (row) => row.announcementDate,
    id: "announcementDate",
    header: () => <span>Date & Time</span>,
    cell: (props) => {
      return (
        <div>
          {/* <span>{format(props.getValue(), "EEE MMM dd yyyy")}</span> */}
          {props.row.original.announcementTime && (
            <span> {`@ ${props.row.original.announcementTime}`}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.message,
    id: "message",
    header: () => <span>Message</span>,
  },
  {
    id: "actions",
    cell: (props) => {
      const handleDelete = async () => {
        await deleteAnnouncement(props.row.original.id);
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
  },
];
