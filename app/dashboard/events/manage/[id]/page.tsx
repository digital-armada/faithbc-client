import { getEvent } from "@/data/events";
import FormEvent from "../../_components/FormEvent";
import { ContentLayout } from "@/app/dashboard/_components/dashpanel/content-layout";

export default async function page({ params }) {
  const { data } = await getEvent(params.id);

  return (
    <ContentLayout title="Events">
      <FormEvent data={data} id={params.id} />;
    </ContentLayout>
  );
}
