"use client";

import {
  DataTable,
  DataTableContent,
  DataTablePagination,
} from "@/components/blocks/Table/data-table";
import { AnnouncementColumns } from "./columns";
import { useState } from "react";
import { useAnnouncementsQuery } from "@/db/hooks/announcements/useAnnouncementsQuery";

// type AnnouncementTableProps = {
//   message: string;
//   date: string;
// };

export default function AnnouncementTable() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: response,
    isLoading,
    // isPreviousData,
  } = useAnnouncementsQuery(pagination.pageIndex, pagination.pageSize);

  const announcements = response?.data;
  const meta = response?.meta;

  console.log("useAnnouncementsQuery", response);

  return (
    <DataTable
      columns={AnnouncementColumns}
      data={announcements || []}
      pageCount={meta?.pagination?.pageCount ?? 0}
      pagination={pagination}
      onPaginationChange={setPagination}
      enablePagination
      // isLoading={isLoading || isFetching}
    >
      <DataTableContent />
      <DataTablePagination />
    </DataTable>
  );
}
