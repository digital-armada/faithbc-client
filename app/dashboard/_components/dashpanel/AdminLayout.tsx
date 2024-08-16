"use client";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  const sidebar = useSelector((state) => state.sidebar);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />
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
