"use client";
import { DataTable } from "@/features/missions/components/data-table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import { MissionsColumns } from "./MissionsColumns";

export default function MissionsTable({ initialData }) {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["missionaries", pagination.pageIndex, pagination.pageSize],
    queryFn: () => initialData,
    placeholderData: keepPreviousData,
  });

  return (
    <DataTable
      columns={MissionsColumns}
      data={data?.data || []}
      pageCount={data?.meta?.pagination?.pageCount || -1}
      pagination={pagination}
      setPagination={setPagination}
      isLoading={isLoading || isFetching}
    />
  );
}
