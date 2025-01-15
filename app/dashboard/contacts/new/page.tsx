import ContentLayout from "../../../../components/common/Layouts/DashboardContentWrapper";
import FormRegisterUser from "../../_components/FormRegisterUser";

export default function page() {
  return (
    <ContentLayout title="Add New Contact">
      <FormRegisterUser />
    </ContentLayout>
  );
}
