import HomeSermonCard from "./HomeSermonCard";
import { sermonsService } from "../sermons-service";

export default async function HomeSermonWidget() {
  const { data } = await sermonsService.getSermons({
    pageSize: 4,
  });

  const sermons = data?.data;

  return (
    <section>
      <div className="container mt-10 w-full space-y-4 font-body text-sm">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {sermons.map((sermon) => (
            <HomeSermonCard sermon={sermon} key={sermon.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
