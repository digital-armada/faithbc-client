"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
// import { DataTableColumnHeader } from "./data-table-column-header";
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
import { TiTrash } from "react-icons/ti";
import { deleteEvent } from "@/data/actions/event-action";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import EventDelete from "@/components/features/events/dashboard/components/Table-event-delete";

export const EventsColumns: ColumnDef<any>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "title",
    // header: ({ column }) => (
    //   // <DataTableColumnHeader column={column} title="First Name" />
    // ),
    header: () => (
      <span className="max-w-[500px] truncate font-medium">Title</span>
    ),

    cell: ({ row }) => {
      console.log("row", row.original.attributes.title);
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <Link href={`/dashboard/events/${row.original.id}`}>
          <div className="text-md flex space-x-2">
            {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
            <span className="max-w-[500px] truncate font-medium">
              {row.original.attributes.title}
            </span>
          </div>
        </Link>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const title = row.original.attributes.title;
      return title?.toLowerCase().includes(filterValue.toLowerCase());
    },
    // enableFiltering: true, // Make sure filtering is enabled for this column
  },
  {
    accessorKey: "startDate",
    // header: ({ column }) => (
    //   // <DataTableColumnHeader column={column} title="First Name" />
    // ),
    header: () => (
      <span className="max-w-[500px] truncate font-medium">Start Date</span>
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.original.attributes.eventStartDate}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "endDate",
    // header: ({ column }) => (
    //   // <DataTableColumnHeader column={column} title="First Name" />
    // ),
    header: () => (
      <span className="max-w-[500px] truncate font-medium">End Date</span>
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.original.attributes.eventEndDate}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => (
      <span className="max-w-[500px] truncate font-medium">Actions</span>
    ),
    cell: ({ row }) => <EventDelete id={row.original.id} />,
  },
  //   {
  //     accessorKey: "lastName",
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="Last Name" />
  //     ),
  //     cell: ({ row }) => {
  //       // const label = labels.find((label) => label.value === row.original.label);
  //
  //       return (
  //         <div className="flex space-x-2">
  //           {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
  //           <span className="max-w-[500px] truncate font-medium">
  //             {row.getValue("lastName")}
  //           </span>
  //         </div>
  //       );
  //     },
  //   },
  // {
  //   accessorKey: "role",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Role" />
  //   ),
  //   cell: ({ row }) => {
  //     console.log(row);
  //     const role = row.getValue("role");
  //     console.log(role);
  //     return <div>{role.name}</div>;
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },

  // {
  //   accessorKey: "blocked",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Blocked" />
  //   ),
  //   cell: ({ row }) => {
  //     const blocked = row.getValue("blocked");
  //     return (
  //       <>
  //         {blocked ? (
  //           <span className="text-red-500">Yes</span>
  //         ) : (
  //           <span className="text-green-500">No</span>
  //         )}
  //       </>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },

  //   {
  //     id: "actions",
  //     enableHiding: false,
  //     cell: ({ row }) => {
  //       const payment = row.original;
  //
  //       return (
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <DotsHorizontalIcon className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //             <DropdownMenuItem onClick={() => {}}>View Contact</DropdownMenuItem>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem>Delete Contact</DropdownMenuItem>
  //             {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       );
  //     },
  //   },
];
