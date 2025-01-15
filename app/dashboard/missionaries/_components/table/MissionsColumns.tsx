"use client";
import { ColumnDef } from "@tanstack/react-table";
import { deleteMissionary } from "@/app/dashboard/missionaries/_api/missions-actions";

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
  {
    id: "actions", // Unique ID for the actions column
    header: "Actions",
    cell: ({ row }) => (
      <button onClick={() => deleteMissionary(row.original.id)}>Delete</button>
    ),
  },
];
