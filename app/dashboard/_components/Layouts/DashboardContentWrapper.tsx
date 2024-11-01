import React from "react";
import BreadCrumbs from "../Breadcrumb";
import { TopNavContainer } from "../dashpanel/TopNavContainer";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
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
