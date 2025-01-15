import ContentLayout from "../../../../components/common/Layouts/DashboardContentWrapper";
import FormEvent from "../_components/FormEvent";

export default function page() {
  return (
    <ContentLayout title="Create New Event">
      <FormEvent />
    </ContentLayout>
  );
}
