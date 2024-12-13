// menuItems.ts
import {
  TiHomeOutline,
  TiVideoOutline,
  TiVolumeUp,
  TiGroupOutline,
  TiCalendarOutline,
  TiCogOutline,
  TiInfoLargeOutline,
  TiPower,
  TiWorldOutline,
} from "react-icons/ti";
import { PiHandsPraying } from "react-icons/pi";
import { sub } from "date-fns";
// import { MenuSection } from "@/types/types";
export const menuItems = [
  {
    title: "Main",
    items: [
      {
        icon: <TiHomeOutline />,
        text: "Dashboard",
        link: "/dashboard",
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
    ],
  },
  // {
  //   title: "Settings",
  //   items: [
  //     {
  //       text: "Profile",
  //       link: "/dashboard/profile",
  //       icon: <TiCogOutline />,
  //       roles: {
  //         member: { show: true },
  //         admin: { show: true },
  //         ministry: { show: true },
  //       },
  //     },
  //     {
  //       text: "Info",
  //       link: "/dashboard/info",
  //       icon: <TiInfoLargeOutline />,
  //       roles: {
  //         member: { show: true },
  //         admin: { show: true },
  //         ministry: { show: true },
  //       },
  //     },
  //   ],
  // },
];
