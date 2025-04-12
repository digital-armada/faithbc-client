"use client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { Announcement } from "@/src/domain/entities/models/Announcement";
import AnnouncementDelete from "@/features/announcements/ctx.Dashboard/Table/data-table-action-delete";

const columnHelper = createColumnHelper<Announcement>();

export const AnnouncementColumns: ColumnDef<Announcement>[] = [
  columnHelper.display({
    id: "dateAndTime",
    header: () => <span>Date & Time</span>,
    cell: (props) => {
      return (
        <div>
          <span>
            {format(
              new Date(props.row.original.announcementDate),
              "EEE MMM dd yyyy",
            )}
          </span>
          {props.row.original.announcementTime && (
            <span> {`@ ${props.row.original.announcementTime}`}</span>
          )}
        </div>
      );
    },
  }),
  //@ts-ignore
  columnHelper.accessor("message", {
    header: () => <span>Message</span>,
    cell: (props) => {
      console.log("props", props.row.original);
      return <span>{props.getValue()}</span>;
    },
  }),

  columnHelper.display({
    id: "actions",
    cell: (props) => <AnnouncementDelete id={props.row.original.id} />,
  }),
];

// TODO:fix the date and time display
// TODO: update the page when a new announcement is created
