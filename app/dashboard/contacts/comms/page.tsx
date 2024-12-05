import CommsDisplay from "../../_components/CommsDisplay";
import CommsForm from "../../_components/CommsForm";
import DashHeader from "../../_components/DashHeader";
import ContentLayout from "../../_components/Layouts/DashboardContentWrapper";

export default function page() {
  return (
    <ContentLayout title="Communications">
      <div className="divide-y-[1px] divide-slate-950/10">
        <CommsForm />
        <CommsDisplay />
      </div>
    </ContentLayout>
  );
}
