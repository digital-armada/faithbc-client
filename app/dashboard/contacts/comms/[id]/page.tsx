import PageHeader from "@/app/dashboard/_components/side-nav/page-header";
import { getComm } from "@/data/services/comms-service";
import DeleteUserButton from "@/app/dashboard/_components/DeleteUserButton";
import DeleteCommsButton from "@/app/dashboard/_components/DeleteCommsButton";
import AddNew from "@/app/dashboard/_components/AddNew";
import { getUsers } from "@/data/services/getUsers";
import DashHeader from "@/app/dashboard/_components/DashHeader";
import { ContentLayout } from "@/app/dashboard/_components/dashpanel/content-layout";

const PROTECTED_GROUPS = ["All", "Members", "Non-members"];

export default async function CommGroupPage({ params }) {
  // FETCH USER DATA
  const { data } = await getComm(params.id);
  const users = await getUsers();
  const group = parseInt(params.id);

  // PREPARE THE USER DATA
  const commUsers = data.data.attributes.users.data.map((user) => ({
    id: user.id,
    name: `${user.attributes.firstName} ${user.attributes.lastName}`,
  }));
  const allUsers = users.data.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
  }));

  // Check if the group is protected
  const isProtectedGroup = PROTECTED_GROUPS;

  return (
    <ContentLayout title={data.data.attributes.groupName}>
      {/* <DashHeader heading={data.data.attributes.groupName} /> */}
      <div>
        <AddNew allUsers={allUsers} commUsers={commUsers} group={group} />
        {isProtectedGroup.includes(data.data.attributes.groupName) ? (
          ""
        ) : (
          <DeleteCommsButton groupId={data.data.id} />
        )}

        {commUsers.map((user) => {
          return (
            <div key={user.id} className="flex justify-between">
              <div className="flex gap-2">
                <div>{user.name}</div>
              </div>
              <DeleteUserButton userId={user.id} groupId={params.id} />
            </div>
          );
        })}
      </div>
    </ContentLayout>
  );
}
