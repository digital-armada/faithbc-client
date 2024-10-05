"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "./LoadingSpinner";

interface FetchDataParams {
  page: number;
}

interface InfiniteScrollProps<T> {
  fetchData: (params: FetchDataParams) => Promise<T[]>;
  renderItem: (item: T, index: number) => React.ReactNode;
  initialData: T[];
}

const InfiniteScroll = <T,>({
  fetchData,
  renderItem,
  initialData,
}: InfiniteScrollProps<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  const loadMoreData = useCallback(async () => {
    if (loading) return;

    setLoading(true);

    try {
      const newData = await fetchData({ page: page + 1 });
      setData((prevData) => [...prevData, ...newData]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      // Handle error without console logging
      // You can implement a custom error handler here if needed
    } finally {
      setLoading(false);
    }
  }, [fetchData, loading, page]);

  useEffect(() => {
    if (inView) loadMoreData();
  }, [inView, loadMoreData]);

  return (
    <>
      {data.map((item, index) => renderItem(item, index))}
      {loading && <LoadingSpinner />}
      <div ref={ref} />
    </>
  );
};

export default InfiniteScroll;
