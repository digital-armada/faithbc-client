"use client";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { SidebarToggle } from "./SidebarToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "./SidebarMenuArea";
import Image from "next/image";
import { useAppSelector } from "@/hooks/useRedux";

export default function SidebarContainer() {
  const sidebar = useAppSelector((state) => state.sidebar.isCollapsed);

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0",
          sidebar === false ? "w-[90px]" : "w-72",
        )}
      >
        <SidebarToggle isOpen={sidebar} />
        <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800">
          <Button
            className={cn(
              "mb-1 transition-transform duration-300 ease-in-out",
              sidebar === false ? "translate-x-1" : "translate-x-0",
            )}
            variant="link"
            asChild
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              {/* <PanelsTopLeft className="mr-1 h-6 w-6" /> */}
              <div className="relative mt-4 flex h-12 w-14 flex-shrink-0 items-center justify-center">
                <Image src="/logo.png" alt="logo" fill />
              </div>
              <h1
                className={cn(
                  "whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out",
                  sidebar === false
                    ? "hidden -translate-x-96 opacity-0"
                    : "translate-x-0 opacity-100",
                )}
              >
                FBC
              </h1>
            </Link>
          </Button>
          <Menu isOpen={sidebar} />
        </div>
      </aside>
    </>
  );
}
