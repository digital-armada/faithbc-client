import { sermonsService } from "@/features/sermons/sermons-service";
import WrapperSermons from "@/components/Sermons/WrapperSermons";

export default async function Page() {
  const { data } = (await sermonsService.getInfiniteSermons({
    page: 1,
  })) || { data: { data: [] } }; // Add fallback

  const initialSermons = data?.data || [];

  return <WrapperSermons initialSermons={initialSermons} />;
}
