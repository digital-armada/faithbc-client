import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  User,
  BadgeInfo,
  Globe,
  HandHeart,
  Calendar,
} from "lucide-react";
import {
  TiArrowSortedDown,
  TiCalendarOutline,
  TiChevronLeft,
  TiChevronRight,
  TiCogOutline,
  TiGroupOutline,
  TiHomeOutline,
  TiInfoLargeOutline,
  TiPower,
  TiVideoOutline,
  TiVolumeUp,
  TiWorldOutline,
} from "react-icons/ti";
import { PiHandsPraying } from "react-icons/pi";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Main",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Contacts",
          active: pathname.includes("/dashboard/contacts"),
          icon: Users,
          submenus: [
            {
              href: "/dashboard/contacts/all",
              label: "All Contacts",
              active: pathname === "/dashboard/contacts/all",
            },
            {
              href: "/dashboard/contacts/comms",
              label: "Comms Lists",
              active: pathname === "/dashboard/contacts/comms",
            },
          ],
        },
        {
          href: "",
          label: "Events",
          active: pathname.includes("/dashboard/events"),
          icon: Calendar,
          submenus: [
            {
              href: "/dashboard/events",
              label: "All Events",
              active: pathname === "/dashboard/events",
            },
            {
              href: "/dashboard/events/new",
              label: "Create New Event",
              active: pathname === "/dashboard/events/new",
            },
            {
              href: "/dashboard/events/manage",
              label: "Manage Events",
              active: pathname === "/dashboard/events/manage",
            },
          ],
        },
        {
          href: "/dashboard/prayer-requests",
          label: "Prayer Requests",
          active: pathname.includes("/prayer-requests"),
          icon: HandHeart,
          submenus: [],
        },
        {
          href: "/dashboard/missionaries",
          label: "Missionaries",
          active: pathname.includes("/missionaries"),
          icon: Globe,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/dashboard/profile",
          label: "Profile",
          active: pathname.includes("/profile"),
          icon: User,
          submenus: [],
        },
        {
          href: "/dashboard/info",
          label: "Info",
          active: pathname.includes("/info"),
          icon: BadgeInfo,
          submenus: [],
        },
      ],
    },
  ];
}
