import ContentLayout from "@/app/dashboard/_components/Layouts/DashboardContentWrapper";

import ClientSermon from "@/features/sermons/components/ClientSermon";
import { getSpeakers } from "@/data/services/speaker-service";
import { getSeries } from "@/data/services/series-service";
import { sermonsService } from "@/features/sermons/sermons-service";

export default async function page({ params }: { params: { id: string } }) {
  const sermonId = params.id;

  const { data: sermon } = await sermonsService.getSermon(sermonId);
  const { data: series } = await getSeries();
  const { data: speakers } = await getSpeakers();

  const sermonData = sermon?.data;

  return (
    <ContentLayout title="Sermon">
      <ClientSermon sermon={sermonData} speakers={speakers} series={series} />
    </ContentLayout>
  );
}
