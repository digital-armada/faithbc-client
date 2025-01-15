"use client";

import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

import {
  TiHomeOutline,
  TiVideoOutline,
  TiVolumeUp,
  TiGroupOutline,
  TiCalendarOutline,
  TiWorldOutline,
} from "react-icons/ti";
import { PiHandsPraying } from "react-icons/pi";
import { MenuItemType } from "@/lib/constants/filterMenuItems";
import { SignOut } from "@/components/blocks/Forms/SignOut";

export const menuItems = [
  {
    text: "Dashboard",
    link: "/dashboard",
    icon: <TiHomeOutline />,
    roles: {
      member: { show: true },
      admin: { show: true },
      ministry: { show: true },
    },
  },
  {
    text: "Announcements",
    link: "/dashboard/announcements",
    icon: <TiVolumeUp />,
    roles: {
      member: { show: false },
      admin: { show: true },
      ministry: { show: true },
    },
  },
  {
    text: "Sermon Manager",
    link: "/dashboard/sermon-manager",
    icon: <TiVideoOutline />,
    roles: {
      member: { show: false },
      admin: {
        show: true,
        asSubItem: true,
        subItems: [
          { text: "Sermons", link: "/dashboard/sermon-manager" },
          { text: "Youtube", link: "/dashboard/sermon-manager/youtube" },
        ],
      },
      ministry: {
        show: true,
        asSubItem: true,
        subItems: [
          { text: "Sermons", link: "/dashboard/sermon-manager" },
          { text: "Youtube", link: "/dashboard/sermon-manager/youtube" },
        ],
      },
    },
  },

  {
    text: "Contacts",
    link: "/dashboard/contacts",
    icon: <TiGroupOutline />,
    roles: {
      member: { show: false },
      admin: {
        show: true,
        asSubItem: true,
        subItems: [
          { text: "All", link: "/dashboard/contacts" },
          { text: "Comms Lists", link: "/dashboard/contacts/comms" },
        ],
      },
      ministry: {
        show: false,
      },
    },
  },
  {
    text: "Events",
    link: "/dashboard/events",
    icon: <TiCalendarOutline />,
    roles: {
      member: { show: true },
      admin: {
        show: true,
        asSubItem: true,
        subItems: [
          { text: "All Events", link: "/dashboard/events" },
          { text: "Create New Event", link: "/dashboard/events/new" },
          { text: "Manage Events", link: "/dashboard/events/manage" },
        ],
      },
      ministry: {
        show: true,
        asSubItem: true,
        subItems: [
          { text: "All Events", link: "/dashboard/events" },
          { text: "Create New Event", link: "/dashboard/events/new" },
          { text: "Manage Events", link: "/dashboard/events/manage" },
        ],
      },
    },
  },
  {
    text: "Prayer Requests",
    link: "/dashboard/prayer-requests",
    icon: <PiHandsPraying />,
    roles: {
      member: { show: true },
      admin: { show: true },
      ministry: { show: true },
    },
  },
  {
    text: "Missionaries",
    link: "/dashboard/missionaries",
    icon: <TiWorldOutline />,
    roles: {
      member: { show: true },
      admin: { show: true },
      ministry: { show: true },
    },
  },
];

interface AppSidebarProps {
  user?: any; // Replace 'any' with the actual type of your user object
}
export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const [menu, setMenu] = useState<MenuItemType[]>([]);

  const role = user?.role || "member";

  useEffect(() => {
    const filteredMenu = menuItems.filter((item) => item.roles[role]?.show);
    console.log("filteredMenu", filteredMenu);
    setMenu(filteredMenu);
  }, [role]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="p-4">Logo</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item, index) => (
                <SidebarMenuItem key={index}>
                  {item?.roles[role]?.subItems ? (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          {item.icon}
                          <span>{item.text}</span>
                          <ChevronDown className="ml-auto h-4 w-4" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item?.roles[role]?.subItems?.map(
                            (subItem, subIndex) => (
                              <SidebarMenuSubItem key={subIndex}>
                                <SidebarMenuButton asChild>
                                  <a href={subItem.link}>{subItem.text}</a>
                                </SidebarMenuButton>
                              </SidebarMenuSubItem>
                            ),
                          )}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <a href={item.link}>
                        {item.icon}
                        <span>{item.text}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <SignOut />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {/* Add footer content if needed */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
