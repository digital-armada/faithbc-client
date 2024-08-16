import { getDashEvents } from "@/data/events";
import Link from "next/link";
import { TiTrash } from "react-icons/ti";
import ManageEventsClient from "../_components/ManageEventsClient";
import DashHeader from "../../_components/DashHeader";
import { ContentLayout } from "../../_components/dashpanel/content-layout";
import { DataTable } from "../_components/DataTable";
import { columns } from "../_components/columns";

export default async function page() {
  const { data } = await getDashEvents();

  // console.log(data);

  return (
    <ContentLayout title="Manage Events">
      <DataTable columns={columns} data={data} />
      <ManageEventsClient data={data} />
    </ContentLayout>
  );
}
