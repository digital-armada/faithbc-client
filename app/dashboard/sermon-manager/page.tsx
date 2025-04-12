import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import ContentLayout from "@/components/common/Layouts/DashboardContentWrapper";
import { sermonsService } from "@/features/sermons/sermons-service";
import SermonManager from "@/features/SermonManager";
import { getQueryClient } from "@/lib/get-query-client";

async function page() {
  const queryClient = getQueryClient();

  // Prefetch the initial data
  queryClient.prefetchQuery({
    queryKey: ["sermons", { page: 1 }],
    queryFn: async () => await sermonsService.getInfiniteSermons({ page: 1 }),
  });

  return (
    <ContentLayout title="Sermons">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SermonManager />
      </HydrationBoundary>
    </ContentLayout>
  );
}
export default page;
