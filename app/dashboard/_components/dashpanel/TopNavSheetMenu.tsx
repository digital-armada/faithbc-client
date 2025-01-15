"use client";
import Link from "next/link";
import { MenuIcon, PanelsTopLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "./SidebarMenuArea";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/hooks/useRedux";

export function TopNavSheetMenu() {
  const sidebar = useAppSelector((state) => state.sidebar.isCollapsed);

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col px-3 sm:w-72" side="left">
        <SheetHeader>
          <Button
            className="flex items-center justify-center pb-2 pt-1"
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
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
