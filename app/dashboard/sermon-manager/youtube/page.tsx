import SermonManagerClient from "../_components/SermonManagerClient";
import ContentLayout from "../../_components/Layouts/DashboardContentWrapper";

export default async function page() {
  return (
    <>
      <ContentLayout title="Sermon Manager">
        <SermonManagerClient />
      </ContentLayout>
    </>
  );
}
