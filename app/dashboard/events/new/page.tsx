import DashHeader from "../../_components/DashHeader";
import { ContentLayout } from "../../_components/dashpanel/content-layout";
import FormEvent from "../_components/FormEvent";

export default function page() {
  return (
    <ContentLayout title="Create New Event">
      <>
        {/* <DashHeader heading="Create New Event" /> */}
        <FormEvent />
      </>
    </ContentLayout>
  );
}
