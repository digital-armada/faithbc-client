"use client";
export default function ContactsTable({ initialData }) {
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
  console.log(initialData);
  return <div>ContactsTable</div>;
}
