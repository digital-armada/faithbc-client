import { ReduxProvider } from "@/redux/provider";
import AdminLayout from "./_components/dashpanel/AdminLayout";

export default function Layout({ children }) {
  return (
    <ReduxProvider>
      <AdminLayout>{children}</AdminLayout>
    </ReduxProvider>
  );
}
