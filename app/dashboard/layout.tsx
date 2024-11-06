import React from "react";
import DashboardLayout from "./_components/Layouts/DashboardLayout";
import { Toaster } from "@/components/ui/toaster";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      {children}
      <Toaster />
    </DashboardLayout>
  );
}
