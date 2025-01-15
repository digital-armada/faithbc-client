"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";

export default function SermonSearch() {
  const [searchValue, setSearchValue] = React.useState("");
  const queryClient = useQueryClient();
  const debouncedSearch = useDebounce(searchValue, 300);

  React.useEffect(() => {
    // Set the search term in the query cache
    queryClient.setQueryData(["sermons", "search"], debouncedSearch);
    // Invalidate queries to trigger refetch with new search term
    queryClient.invalidateQueries({
      queryKey: ["sermons"],
      exact: false,
    });
  }, [debouncedSearch, queryClient]);

  return (
    <div className="flex items-center justify-between">
      <Input
        placeholder="Search Sermons..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
}
