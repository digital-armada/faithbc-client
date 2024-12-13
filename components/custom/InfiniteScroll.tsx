"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";

interface FetchDataParams {
  page: number;
}

export default function InfiniteScroll<T>({
  fetchData,
  renderItem,
  initialData,
}) {
  const [data, setData] = useState<T[]>(initialData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView({ threshold: 0 });

  const loadMoreData = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetchData({ page: page + 1 });

      // Extract data array from Strapi response structure
      const newData = response;

      setHasMore(newData.length > 0);
      if (newData.length) {
        setData((prevData) => [...prevData, ...newData]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching more data.");
    } finally {
      setLoading(false);
    }
  }, [fetchData, loading, hasMore, page]);

  useEffect(() => {
    if (inView) {
      console.log("inView triggered, loading more data");
      loadMoreData();
    }
  }, [inView, loadMoreData]);

  return (
    <div className="space-y-4" aria-live="polite">
      {data.map((item, index) => renderItem(item, index))}
      {hasMore && (
        <div ref={ref} className="flex justify-center p-4" aria-busy={loading}>
          {loading && <Loader2 className="h-6 w-6 animate-spin" />}
          {!loading && error && <p className="text-red-500">{error}</p>}
        </div>
      )}
      {!hasMore && (
        <div className="flex justify-center p-4">
          <p>No more items to load.</p>
        </div>
      )}
    </div>
  );
}
