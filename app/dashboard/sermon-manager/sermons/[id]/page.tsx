import { ContentLayout } from "@/app/dashboard/_components/Layouts/DashboardContentWrapper";

import ClientSermon from "../../_components/ClientSermon";
import { getSermon } from "@/data/sermons";
import { getSpeakers } from "@/data/services/speaker-service";
import { getSeries } from "@/data/services/series-service";
import { getServices } from "@/data/services/service-service";

export default async function page({ params }: { params: { id: string } }) {
  const sermonId = params.id;
  const sermon = await getSermon(sermonId);
  const { data: series } = await getSeries();
  const { data: speakers } = await getSpeakers();

  return (
    <ContentLayout title="Sermon">
      <ClientSermon sermon={sermon} speakers={speakers} series={series} />
    </ContentLayout>
  );
}
