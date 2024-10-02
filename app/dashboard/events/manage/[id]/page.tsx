import { getEvent } from "@/data/events";
import FormEvent from "../../_components/FormEvent";
import { ContentLayout } from "@/app/dashboard/_components/Layouts/DashboardContentWrapper";

export default async function page({ params }) {
  const { data } = await getEvent(params.id);

  return (
    <ContentLayout title="Events">
      <div>fix</div>
      {/* <FormEvent data={data} id={params.id} />; */}
    </ContentLayout>
  );
}
