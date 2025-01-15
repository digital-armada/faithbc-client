"use client";

import { useState } from "react";
import ContentLayout from "../../../../components/common/Layouts/DashboardContentWrapper";
import {
  DataTable,
  DataTableToolbar,
  DataTableFilter,
  DataTableColumnVisibility,
  DataTableContent,
  DataTablePagination,
} from "../../../../components/blocks/Table/data-table";
import { EventsColumns } from "./_components/EventsColumns";
import { useEvents } from "../../../../db/hooks/events/useEvents";

export default function Page() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, isFetching } = useEvents({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <ContentLayout title="Manage Events">
      <DataTable
        data={data?.data ?? []}
        columns={EventsColumns}
        pageCount={data?.pageCount ?? 0}
        pagination={pagination}
        onPaginationChange={setPagination}
        isLoading={isLoading}
        isFetching={isFetching}
      >
        <DataTableToolbar>
          {/* <DataTableFilter column="title" /> */}
          <DataTableColumnVisibility />
        </DataTableToolbar>

        <DataTableContent />

        <DataTablePagination />
      </DataTable>
    </ContentLayout>
  );
}
