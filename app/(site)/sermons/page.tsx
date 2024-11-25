import { sermonsService } from "@/features/sermons/sermons-service";
import WrapperSermons from "@/components/Sermons/WrapperSermons";

export default async function Page() {
  const { data } = await sermonsService.getInfiniteSermons({
    page: 1,
  });
  const initialSermons = data ?? [];

  return <WrapperSermons initialSermons={initialSermons} />;
}
