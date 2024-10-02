import { getUsers } from "@/data/services/getUsers";
import Table from "../../_components/Table";
import { getUserRoles } from "@/data/services/auth-service";
import DashHeader from "../../_components/DashHeader";
import { DataTable } from "../_components/DataTable";
import { columns } from "../_components/columns";
import { ContentLayout } from "../../_components/Layouts/DashboardContentWrapper";

export default async function page() {
  const { data: users } = await getUsers();
  // const roles = await getUserRoles();

  return (
    <ContentLayout title="Contacts">
      <DataTable data={users} columns={columns} />
    </ContentLayout>
  );
}
