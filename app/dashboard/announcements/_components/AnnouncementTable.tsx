import { DataTable } from "./DataTable";
import { columns, defaultColumns } from "./columns";

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
