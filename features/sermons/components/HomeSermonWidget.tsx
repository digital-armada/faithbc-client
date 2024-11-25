import More from "@/components/custom/more";
import { sermonsService } from "@/features/sermons/sermons-service";
import HomeSermonCard from "./HomeSermonCard";
import HeadingTwo from "@/components/custom/headingtwo";
import { Sermon } from "@/features/sermons/types";

export default async function HomeSermonWidget() {
  const data = await sermonsService.getSermons({
    pageSize: 4,
  });
  console.log("dataData", data);
  const sermons: Sermon[] = data.data ?? [];

  return (
    <section>
      <div className="container mt-10 w-full space-y-4 font-body text-sm">
        <div className="w-full items-center justify-between pb-10 sm:flex">
          <div>
            <HeadingTwo heading="Recent Sermons" />
          </div>
          <div>
            <More title="All Sermons" link="/sermons" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {sermons.map((sermon: Sermon) => {
            return <HomeSermonCard sermon={sermon} key={sermon.id} />;
          })}
        </div>
      </div>
    </section>
  );
}
