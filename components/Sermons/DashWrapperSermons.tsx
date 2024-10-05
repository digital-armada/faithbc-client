"use client";
import InfiniteScroll from "@/components/ui/InfiniteScroll";
import SermonItem from "./SermonItem";
import { getInfiniteSermons } from "@/data/sermons";
import PageHeader from "../ui/PageHeader";

export default function DashWrapperSermons({ initialSermons }) {
  const fetchData = async ({ page }) => {
    const { data } = await getInfiniteSermons({ page });
    return data;
  };

  const renderItem = (sermon, index) => (
    <SermonItem key={index} sermon={sermon} />
  );

  return (
    <section>
      <div className="container text-gray-700">
        <InfiniteScroll
          initialData={initialSermons}
          fetchData={fetchData}
          renderItem={renderItem}
        />
      </div>
    </section>
  );
}
