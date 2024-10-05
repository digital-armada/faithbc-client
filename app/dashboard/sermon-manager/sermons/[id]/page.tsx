import { ContentLayout } from "@/app/dashboard/_components/Layouts/DashboardContentWrapper";

import ClientSermon from "../../_components/ClientSermon";
import { getSermon } from "@/data/sermons";
import { getSpeakers } from "@/data/services/speaker-service";

export default async function page({ params }: { params: { id: string } }) {
  const sermonId = params.id;
  const sermon = await getSermon(sermonId);

  const { data: speakers } = await getSpeakers();
  console.log(speakers);

  return (
    <ContentLayout title="Sermon">
      <ClientSermon sermon={sermon} speakers={speakers} />
      <pre>{JSON.stringify(speakers.data, null, 4)}</pre>
      <pre>{JSON.stringify(sermon, null, 4)}</pre>
    </ContentLayout>
  );
}
