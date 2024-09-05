import { ContentLayout } from "../../_components/dashpanel/content-layout";
import FormRegisterUser from "../../_components/FormRegisterUser";

export default function page() {
  return (
    <ContentLayout title="Add New Contact">
      <FormRegisterUser />
    </ContentLayout>
  );
}
