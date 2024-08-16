import BreadCrumbs from "../Breadcrumb";
import { Navbar } from "./navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} />
      <div className="container px-4 pb-8 pt-8 sm:px-8">
        <BreadCrumbs />
        <div className="rounded-md bg-white p-4 shadow-md">{children}</div>
      </div>
    </div>
  );
}
