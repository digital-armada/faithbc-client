import More from "./ui/more";
import { getSermons } from "@/data/sermons";
import HomeSermonCard from "./HomeSermonCard";
import HeadingTwo from "./ui/headingtwo";

export default async function HomeSermonWidget() {
  const data = await getSermons();
  const sermons = data.data.slice(0, 4);

  console.log(data);

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
          {sermons?.map((sermon) => {
            return <HomeSermonCard sermon={sermon} key={sermon.id} />;
          })}
        </div>
      </div>
    </section>
  );
}
