import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";

import { contactsService } from "@/features/contacts/contacts-service";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ContentLayout from "@/app/dashboard/_components/Layouts/DashboardContentWrapper";
import ContactsTable from "@/features/contacts/components/ContactsTable";

export default async function page() {
  const queryClient = getQueryClient();

  // Prefetch the initial data
  queryClient.prefetchQuery({
    queryKey: ["contacts", { page: 1, pageSize: 10 }],
    queryFn: async () =>
      await contactsService.getUsers({ page: 1, pageSize: 10 }),
  });
  const users = await contactsService.getUsers({ page: 1, pageSize: 10 });
  return (
    <ContentLayout title="Contacts">
      <Link href="/dashboard/contacts/new">
        <Button>Add New</Button>
      </Link>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ContactsTable />
      </HydrationBoundary>
    </ContentLayout>
  );
}
