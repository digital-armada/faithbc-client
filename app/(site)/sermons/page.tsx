import { sermonsService } from "@/components/features/sermons/sermons-service";
import WrapperSermons from "@/components/features/sermons/Sermons/WrapperSermons";

export default async function Page() {
  const { data } = (await sermonsService.getInfiniteSermons({
    page: 1,
  })) || { data: { data: [] } }; // Add fallback

  const initialSermons = data?.data || [];

  return <WrapperSermons initialSermons={initialSermons} />;
}
