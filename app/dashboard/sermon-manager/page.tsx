import { fetchVideos } from "@/data/services/youtube-service";
import DashHeader from "../_components/DashHeader";
import SermonManagerClient from "./_components/SermonManagerClient";
import { ContentLayout } from "../_components/Layouts/DashboardContentWrapper";

export default async function page() {
  // const { videos } = await fetchVideos();
  // console.log(videos);
  return (
    <>
      <ContentLayout title="Sermon Manager">
        <SermonManagerClient />
      </ContentLayout>
    </>
  );
}
