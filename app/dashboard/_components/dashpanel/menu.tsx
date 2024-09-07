"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Ellipsis, LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import * as Icons from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { CollapseMenuButton } from "./collapse-menu-button";
import { logout } from "@/data/actions/auth-actions";
import { menuItems } from "@/app/dashboard/_components/Sidenav/MenuItems";

type Role = "member" | "admin" | "ministry";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  const userRole = (session?.data?.user?.role as Role) || "member";
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const renderIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons];
    return IconComponent ? <IconComponent className="mr-2 h-4 w-4" /> : null;
  };

  const isActive = (link: string) => pathname === link;

  const toggleExpanded = (itemText: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemText)
        ? prev.filter((item) => item !== itemText)
        : [...prev, itemText],
    );
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const result = await logout();

      if (result.success) {
        console.log("Sign out successful, redirecting...");
        router.push("/"); // Redirect on the client side
      } else {
        console.error("Sign out failed:", result.error);
        // Optionally, show an error message to the user
      }
    } catch (error) {
      console.error("Sign out error:", error);
      // Optionally, show an error message to the user
    } finally {
      setIsLoggingOut(false);
    }
  };

  const renderMenuItem = (item: any) => {
    const roleConfig = item.roles[userRole];

    if (!roleConfig || !roleConfig.show) return null;

    const active = isActive(item.link);

    if (roleConfig.asSubItem && roleConfig.subItems) {
      const subMenuActive = roleConfig.subItems.some((subItem: any) =>
        isActive(subItem.link),
      );
      return (
        <CollapseMenuButton
          key={item.text}
          icon={item.icon}
          label={item.text}
          active={subMenuActive}
          submenus={roleConfig.subItems.map((subItem: any) => ({
            href: subItem.link,
            label: subItem.text,
            active: isActive(subItem.link),
          }))}
          isOpen={isOpen}
          isExpanded={expandedItems.includes(item.text)}
          onToggle={() => toggleExpanded(item.text)}
        />
      );
    }

    return (
      <div key={item.text} className="w-full">
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <Button
                variant={active ? "secondary" : "ghost"}
                className={cn(
                  "mb-1 h-10 w-full justify-start",
                  active && "bg-accent",
                )}
                asChild
              >
                <Link href={item.link}>
                  <span className={cn(isOpen === false ? "" : "mr-4")}>
                    {renderIcon(item.icon)}
                    {item.icon}
                  </span>
                  <p
                    className={cn(
                      "max-w-[200px] truncate",
                      isOpen === false
                        ? "-translate-x-96 opacity-0"
                        : "translate-x-0 opacity-100",
                    )}
                  >
                    {item.text}
                  </p>
                </Link>
              </Button>
            </TooltipTrigger>
            {isOpen === false && (
              <TooltipContent side="right">{item.text}</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  };

  return (
    <>
      <ScrollArea className="[&>div>div[style]]:!block">
        <nav className="mt-4 h-full w-full">
          <ul className="flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col items-start space-y-1 px-2 lg:min-h-[calc(100vh-32px-40px-32px)]">
            {menuItems.map(({ title, items }, index) => (
              <li className={cn("w-full", title ? "pt-5" : "")} key={index}>
                {(isOpen && title) || isOpen === undefined ? (
                  <p className="max-w-[248px] truncate px-4 pb-2 text-sm font-medium text-muted-foreground">
                    {title}
                  </p>
                ) : !isOpen && isOpen !== undefined && title ? (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger className="w-full">
                        <div className="flex w-full items-center justify-center">
                          <Ellipsis className="h-5 w-5" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <p className="pb-2"></p>
                )}
                {items.map(renderMenuItem)}
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>
      <div className="flex w-full grow items-end">
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="mt-5 h-10 w-full justify-center"
              >
                <span className={cn(isOpen === false ? "" : "mr-4")}>
                  <LogOut size={18} />
                </span>
                <p
                  className={cn(
                    "whitespace-nowrap",
                    isOpen === false ? "hidden opacity-0" : "opacity-100",
                  )}
                >
                  {isLoggingOut ? "Signing out..." : "Sign out"}{" "}
                </p>
              </Button>
            </TooltipTrigger>
            {isOpen === false && (
              <TooltipContent side="right">
                {isLoggingOut ? "Signing out..." : "Sign out"}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}
