"use client";
import InfiniteScroll from "@/components/custom/InfiniteScroll";
import SermonItem from "./SermonItem";
import { sermonsService } from "@/features/sermons/sermons-service";
import PageHeader from "../ui/PageHeader";
import { useCallback } from "react";

export default function WrapperSermons({ initialSermons }) {
  const fetchData = useCallback(async ({ page }) => {
    const { data } = await sermonsService.getClientInfiniteSermons({ page });
    return data ?? [];
  }, []);

  return (
    <section>
      <div className="container text-gray-700">
        <PageHeader heading="Sermons" />
        <InfiniteScroll
          initialData={initialSermons}
          fetchData={fetchData}
          renderItem={(sermon, index) => (
            <SermonItem key={index} sermon={sermon} />
          )}
        />
      </div>
    </section>
  );
}
