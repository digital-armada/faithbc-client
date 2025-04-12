"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { contactsService } from "@/features/contacts/contacts-service";
import { useSession } from "next-auth/react";
import {
  DataTable,
  DataTableContent,
} from "@/components/blocks/Table/data-table";
import { columns } from "./columns";

export default function ContactsTable() {
  const session = useSession();

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 3,
  });

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["contacts", pagination.pageIndex, pagination.pageSize],
    queryFn: async () => {
      const response = await contactsService.getUsers({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        session,
      });
      return response;
    },
  });

  return (
    <DataTable
      columns={columns}
      data={data?.data || []}
      isLoading={isLoading || isFetching}
    >
      <DataTableContent />
    </DataTable>
  );
}
