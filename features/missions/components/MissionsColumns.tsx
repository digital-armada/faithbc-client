"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../app/dashboard/sermon-manager/_components/data-table-column-header";
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
import Link from "next/link";
import Image from "next/image";

export const MissionsColumns: ColumnDef<any>[] = [
  {
    accessorKey: "attributes.name",
    header: ({ column }) => (
      // <DataTableColumnHeader column={column} title="Missionary" />
      <div>Missionary</div>
    ),
    cell: ({ row }) => {
      const missionary = row.original.attributes.name;
      return <div className="flex space-x-2">{missionary}</div>;
    },
  },
  {
    accessorKey: "attributes.location",
    header: () => (
      // <DataTableColumnHeader column={column} title="Missionary" />
      <div>Location</div>
    ),
    cell: ({ row }) => {
      const missionary = row.original.attributes.location;
      return <div className="flex space-x-2">{missionary}</div>;
    },
  },
  // {
  //   accessorKey: "attributes.date",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Date" />
  //   ),
  //   cell: ({ row }) => {
  //     const date = row.original.attributes.date;
  //     return (
  //       <span className="max-w-[500px] truncate font-medium">{date} </span>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   accessorKey: "attributes.name",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Sermon Title" />
  //   ),
  //   cell: ({ row }) => {
  //     // const label = labels.find((label) => label.value === row.original.label);
  //     const title = row.original.attributes.name;
  //     return (
  //       <div className="flex space-x-2">
  //         {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
  //         <Link href={`/dashboard/sermon-manager/sermons/${row.original.id}`}>
  //           <span className="max-w-[500px] truncate font-medium">{title}</span>
  //         </Link>
  //       </div>
  //     );
  //   },
  // },
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
];
