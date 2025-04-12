"use client";
// import { dehydrate, HydrationBoundary, useQuery } from "@tanstack/react-query";

import { contactsService } from "@/features/contacts/contacts-service";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ContentLayout from "@/components/common/Layouts/DashboardContentWrapper";
import ContactsTable from "@/features/contacts/components/ContactsTable";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function page() {
  // const session = useSession();
  // console.log("session", session);
  //   const queryClient = getQueryClient();
  //

  // const users = await contactsService.getUsers({ page: 1, pageSize: 10 });
  // const { data, isPending, error } = useQuery({
  //   queryKey: ["contacts", { page: 1, pageSize: 10 }],
  //   queryFn: async () =>
  //     await contactsService.getUsers({ page: 1, pageSize: 10, session }),
  // });

  // console.log("data", data);
  return (
    <ContentLayout title="Contacts">
      {/* <div>{session}</div> */}
      <Link href="/dashboard/contacts/new">
        <Button>Add New</Button>
      </Link>
      {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
      <ContactsTable />
      {/* </HydrationBoundary> */}
    </ContentLayout>
  );
}
