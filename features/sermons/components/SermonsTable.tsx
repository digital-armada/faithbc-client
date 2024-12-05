"use client";

import React from "react";

import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { DataTable } from "@/components/Table/DataTable";
import { columns } from "./columns";
import { sermonsService } from "@/features/sermons/sermons-service";

export default function SermonsTable({ initialData }) {
  const queryClient = useQueryClient();
  const searchTerm = queryClient.getQueryData(["sermons", "search"]) as string;
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, isFetching, error, isPlaceholderData } = useQuery({
    queryKey: [
      "sermons",
      // searchTerm,
      pagination.pageIndex,
      pagination.pageSize,
    ],
    queryFn: async () => {
      const response = await sermonsService.getClientInfiniteSermons({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        // search: searchTerm || "",
      });
      return response;
    },
    initialData,
    placeholderData: keepPreviousData,
  });

  React.useEffect(() => {
    if (pagination.pageIndex < (data?.meta?.pagination?.pageCount ?? 0) - 1) {
      queryClient.prefetchQuery({
        queryKey: [
          "sermons",
          // searchTerm,
          pagination.pageIndex + 1,
          pagination.pageSize,
        ],
        queryFn: async () => {
          const response = await sermonsService.getClientInfiniteSermons({
            page: pagination.pageIndex + 2,
            pageSize: pagination.pageSize,
            // search: searchTerm || "",
          });
          return response;
        },
      });
    }
  }, [pagination, queryClient, searchTerm, data?.meta?.pagination?.pageCount]);

  if (error) {
    return <div>Error loading sermons: {(error as Error).message}</div>;
  }

  return (
    <DataTable
      columns={columns}
      data={data?.data || []}
      pageCount={data?.meta?.pagination?.pageCount || -1}
      pagination={pagination}
      setPagination={setPagination}
      isLoading={isLoading || isFetching}
    />
  );
}
