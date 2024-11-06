import { getEvent } from "@/data/events";
import FormEvent from "../../_components/FormEvent";
import { ContentLayout } from "@/app/dashboard/_components/Layouts/DashboardContentWrapper";

export default async function page({ params }) {
  const { data } = await getEvent(params.id);
  const id = data.id;
  const events = data.attributes;
  return (
    <ContentLayout title="Events">
      <FormEvent data={events} eventID={id} />
    </ContentLayout>
  );
}
