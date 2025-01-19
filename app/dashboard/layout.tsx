import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/blocks/dashboard/Sidebar/app-sidebar";
import { auth } from "@/lib/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Check if session exists and has user property
  const user =
    session && typeof session.user === "object" ? session.user : null;

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main className="w-full">
        {children}
        <Toaster />
      </main>
    </SidebarProvider>
  );
}
