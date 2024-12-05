import ContentLayout from "../../_components/Layouts/DashboardContentWrapper";
import FormEvent from "../_components/FormEvent";

export default function page() {
  return (
    <ContentLayout title="Create New Event">
      <FormEvent />
    </ContentLayout>
  );
}
