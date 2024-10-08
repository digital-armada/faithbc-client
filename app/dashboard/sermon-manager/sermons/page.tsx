import { getInfiniteSermons } from "@/data/sermons";
import { ContentLayout } from "../../_components/Layouts/DashboardContentWrapper";
import DashWrapperSermons from "@/components/Sermons/DashWrapperSermons";
import { DataTable } from "../_components/DataTable";
import { columns } from "../_components/columns";

async function page() {
  const { data } = await getInfiniteSermons({ page: 1 });
  console.log(data);
  return (
    <ContentLayout title="Sermons">
      <DataTable data={data} columns={columns} />
    </ContentLayout>
  );
}
export default page;
