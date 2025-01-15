"use client";

import React, { use, useState } from "react";
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
import { SidebarCollapsibleButton } from "./SidebarCollapsibleButton";
import { logout } from "@/components/features/auth/auth-actions";
// import { menuItems } from "@/lib/constants/MenuItems";
import { useRoleBasedMenu } from "@/hooks/userRoleBasedMenu";

type Role = "member" | "admin" | "ministry";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = useRoleBasedMenu();

  // const session = useSession();
  // const [userRole, setUserRole] = useState(
  //   session?.data?.user as { role?: Role },
  // );
  // const userRole = (session?.data?.user as { role?: Role })?.role || "member";
  // console.log("client", userRole);
  // React.useEffect(() => {
  //   if (session?.data?.user) {
  //     setUserRole(session?.data?.user.role || "member");
  //   }
  // }, [session]);
  // console.log("menu", menuItems);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const renderIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons];
    // @ts-ignore
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
      const { success, error } = await logout();

      if (success) {
        router.push("/");
        return;
      }

      console.error("Sign out failed:", error);
    } catch (error) {
      console.error("Sign out error:", error);
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
        <SidebarCollapsibleButton
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
        <nav>
          {menuItems.map((category) => (
            <div key={category.title}>
              <h2>{category.title}</h2>
              <ul>
                {category.items.map((item) => (
                  <li key={item.text}>
                    <Link href={item.link}>
                      {item.icon}
                      <span>{item.text}</span>
                    </Link>
                    {item.subItems && (
                      <ul>
                        {item.subItems.map((subItem) => (
                          <li key={subItem.text}>
                            <Link href={subItem.link}>
                              <span>{subItem.text}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        {/* <nav className="h-full w-full pt-4">
          <ul className="flex flex-col items-start space-y-1 px-2">
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
        </nav> */}
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
                  {isLoggingOut ? "Signing out..." : "Sign out"}
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
