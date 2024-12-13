"use client";
import { ColumnDef } from "@tanstack/react-table";

export const MissionsColumns: ColumnDef<any>[] = [
  {
    accessorKey: "attributes.name",
    header: () => <div>Missionary</div>,
    cell: ({ row }) => {
      const missionary = row.original.attributes.name;
      return <div className="flex space-x-2">{missionary}</div>;
    },
  },
  {
    accessorKey: "attributes.location",
    header: () => <div>Location</div>,
    cell: ({ row }) => {
      const missionary = row.original.attributes.location;
      return <div className="flex space-x-2">{missionary}</div>;
    },
  },
];
