import React from "react";
import BreadCrumbs from "../../blocks/Breadcrumb";
import { TopNavContainer } from "../../../app/dashboard/_components/dashpanel/TopNavContainer";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <TopNavContainer title={title} />
      <div className="container px-4 pb-8 pt-8 sm:px-8">
        <BreadCrumbs />
        <div className="rounded-md p-4">{children}</div>
      </div>
    </div>
  );
}
