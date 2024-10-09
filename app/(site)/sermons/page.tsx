import { getInfiniteSermons } from "@/data/sermons";
import WrapperSermons from "@/components/Sermons/WrapperSermons";

export default async function page() {
  const { data } = await getInfiniteSermons({
    page: 1,
  });
  const initialSermons = data;
  console.log("initialSermons", initialSermons);
  return <WrapperSermons initialSermons={initialSermons} />;
}
