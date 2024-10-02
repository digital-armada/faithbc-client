"use client";
import { cn } from "@/lib/utils";
import SidebarContainer from "../dashpanel/SidebarContainer";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useRedux";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const sidebar = useAppSelector((state) => state.sidebar);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Avoid rendering anything until the component is mounted on the client
  }

  return (
    <>
      <SidebarContainer />
      <main
        className={cn(
          "min-h-[calc(100vh)] bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900",
          sidebar.isCollapsed === false ? "lg:ml-[90px]" : "lg:ml-72",
        )}
      >
        {children}
      </main>
    </>
  );
}
