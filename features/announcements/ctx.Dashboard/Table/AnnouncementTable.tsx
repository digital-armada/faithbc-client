"use client";

import { useState } from "react";
import {
  DataTable,
  DataTableContent,
  DataTablePagination,
} from "@/components/blocks/Table/data-table";
import { AnnouncementColumns } from "./data-table-columns";
import { useAnnouncementsQuery } from "@/features/announcements/hooks/useAnnouncementsQuery";
import { Announcement } from "@/src/domain/entities/models/Announcement";

interface StrapiResponse<T> {
  data: T;
  meta: any;
}

type AnnouncementTableProps = {
  initialData: StrapiResponse<Announcement[]> | undefined;
};

export default function AnnouncementTable({
  initialData,
}: AnnouncementTableProps) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, isFetching } = useAnnouncementsQuery(
    pagination.pageIndex,
    pagination.pageSize,
    initialData,
  );

  const announcements = data?.data;
  const meta = data?.meta;

  return (
    <DataTable
      columns={AnnouncementColumns}
      data={announcements || []}
      pageCount={meta?.pagination?.pageCount ?? 0}
      pagination={pagination}
      onPaginationChange={setPagination}
      enablePagination
      isLoading={isLoading}
      isFetching={isFetching}
    >
      <DataTableContent />
      <DataTablePagination />
    </DataTable>
  );
}
