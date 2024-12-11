"use client";

import React from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/Table/data-table";
import { columns } from "./columns";
import { sermonsService } from "@/features/sermons/sermons-service";

export default function SermonsTable() {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, isFetching, error } = useSuspenseQuery({
    queryKey: ["sermons", pagination.pageIndex, pagination.pageSize],
    queryFn: async () => {
      const response = await sermonsService.getInfiniteSermons({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
      });
      return response;
    },
  });

  if (error) {
    return <div>Error loading sermons: {(error as Error).message}</div>;
  }

  return (
    <DataTable
      columns={columns}
      data={data?.data?.data || []}
      pageCount={data?.data?.meta?.pagination?.pageCount || -1}
      pagination={pagination}
      setPagination={setPagination}
      isLoading={isLoading || isFetching}
    />
  );
}
