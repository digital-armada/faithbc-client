import { getUsers } from "@/data/services/getUsers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ContentLayout from "@/app/dashboard/_components/Layouts/DashboardContentWrapper";
import ContactsTable from "@/features/contacts/components/ContactsTable";

export default async function page() {
  const { data: users } = await getUsers();

  return (
    <ContentLayout title="Contacts">
      <Link href="/dashboard/contacts/new">
        <Button>Add New</Button>
      </Link>
      <ContactsTable initialData={users} />
    </ContentLayout>
  );
}
