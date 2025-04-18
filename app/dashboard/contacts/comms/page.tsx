import UpdateMembers from "@/features/contacts/components/UpdateMembers";
import CommsDisplay from "../../_components/CommsDisplay";
import CommsForm from "../../_components/CommsForm";
import ContentLayout from "../../../../components/common/Layouts/DashboardContentWrapper";

export default function page() {
  return (
    <ContentLayout title="Communications">
      <UpdateMembers />

      <div className="divide-y-[1px] divide-slate-950/10">
        <CommsForm />
        <CommsDisplay />
      </div>
      <hr />
      <div className="mt-2 text-gray-400">
        <ul>Todo</ul>
        <li>
          Automaticaly reassign members and non-members to difference groups
        </li>
        <li>Remove the buttons component once completed</li>
      </div>
    </ContentLayout>
  );
}

// Check member status, if member is now blocked, add them to non-members list
// Check non-member status, if non-member is now unblocked, add them to members list
