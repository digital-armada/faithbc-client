"use client";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  const sidebar = useSelector((state) => state.sidebar);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Avoid rendering anything until the component is mounted on the client
  }

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
