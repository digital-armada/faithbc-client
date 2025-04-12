import SermonManagerClient from "../../../../features/SermonManager/components/SermonManagerClient";
import ContentLayout from "../../../../components/common/Layouts/DashboardContentWrapper";

export default async function page() {
  return (
    <>
      <ContentLayout title="Sermon Manager">
        <SermonManagerClient />
      </ContentLayout>
    </>
  );
}
