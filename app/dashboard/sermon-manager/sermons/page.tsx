import ContentLayout from "@/app/dashboard/_components/Layouts/DashboardContentWrapper";
import { sermonsService } from "@/features/sermons/sermons-service";
import { Suspense } from "react";
import SermonsTable from "@/features/sermons/components/SermonsTable";

async function page() {
  const initialSermons = await sermonsService.getInfiniteSermons({ page: 1 });
  return (
    <ContentLayout title="Sermons">
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            Loading
          </div>
        }
      >
        <SermonsTable initialData={initialSermons.data} />
      </Suspense>
    </ContentLayout>
  );
}
export default page;
