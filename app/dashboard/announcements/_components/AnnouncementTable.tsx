import { DataTable } from "./DataTable";
import { defaultColumns } from "./columns";

type AnnouncementTableProps = {
  message: string;
  date: string;
};

export default function AnnouncementTable({
  announcements,
}: {
  announcements: AnnouncementTableProps[];
}) {
  return <DataTable data={announcements} columns={defaultColumns} />;
}
