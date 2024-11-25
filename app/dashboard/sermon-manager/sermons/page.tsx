import { getInfiniteSermons } from "@/data/sermons";
import { ContentLayout } from "../../_components/Layouts/DashboardContentWrapper";
import DashWrapperSermons from "@/components/Sermons/DashWrapperSermons";
import { DataTable } from "../_components/DataTable";
import { columns } from "../_components/columns";
import { sermonsService } from "@/features/sermons/sermons-service";

async function page() {
  const { data } = await sermonsService.getInfiniteSermons({ page: 1 });

  return (
    <ContentLayout title="Sermons">
      <DataTable data={data} columns={columns} />
    </ContentLayout>
  );
}
export default page;
