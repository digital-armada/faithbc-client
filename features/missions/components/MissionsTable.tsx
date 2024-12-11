"use client";
import { DataTable } from "@/components/Table/data-table";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import { MissionsColumns } from "./MissionsColumns";

export default function MissionsTable({ initialData }) {
  const queryClient = useQueryClient();
  const searchTerm = queryClient.getQueryData(["missionaries"]) as string;
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["missionaries", pagination.pageIndex, pagination.pageSize],
    queryFn: () =>
      // sermonsService.getClientInfiniteSermons({
      //   page: pagination.pageIndex + 1,
      //   pageSize: pagination.pageSize,
      //   search: searchTerm || "",
      // }),
      initialData,
    placeholderData: keepPreviousData,
  });

  // // Pre-fetch next page
  // React.useEffect(() => {
  //   if (pagination.pageIndex < (data?.meta?.pagination?.pageCount ?? 0) - 1) {
  //     queryClient.prefetchQuery({
  //       queryKey: [
  //         "sermons",
  //         searchTerm,
  //         pagination.pageIndex + 1,
  //         pagination.pageSize,
  //       ],
  //       queryFn: () =>
  //         sermonsService.getClientInfiniteSermons({
  //           page: pagination.pageIndex + 2,
  //           pageSize: pagination.pageSize,
  //           search: searchTerm || "",
  //         }),
  //     });
  //   }
  // }, [pagination, queryClient, searchTerm, data?.meta?.pagination?.pageCount]);

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
