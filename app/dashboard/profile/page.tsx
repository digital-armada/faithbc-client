import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import FormUpdateUser from "../_components/FormUpdateUser";
import ContentLayout from "../_components/Layouts/DashboardContentWrapper";

export default async function page() {
  const { data } = await getUserMeLoader();
  return (
    <ContentLayout title="Profile">
      <FormUpdateUser user={data} />
    </ContentLayout>
  );
}
