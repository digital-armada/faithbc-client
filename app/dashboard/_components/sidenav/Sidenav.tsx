"use client";
import {
  setSidebarCollapsed,
  toggleSidebar,
} from "@/redux/features/sidebarSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  TiArrowSortedDown,
  TiChevronLeft,
  TiChevronRight,
} from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Avatar from "./Avatar";

import { filterMenuItemsByRole } from "@/lib/menuUtils";
import { menuItems } from "@/app/dashboard/_components/Sidenav/MenuItems";
import { BaseMenuItem } from "@/types/types";
import { useSession } from "next-auth/react";

export default function Sidenav() {
  const [activeItems, setActiveItems] = useState({});
  const isSidebarCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const dispatch = useDispatch();
  const menuRef = useRef();
  const pathname = usePathname();

  const { data: session } = useSession();
  const userRoles = session?.user?.role ? [session.user.role] : [];
  console.log(session);
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        handleOutsideClick();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isSidebarCollapsed]);

  const handleOutsideClick = () => {
    // If sidebar is expanded, collapse it
    if (!isSidebarCollapsed) {
      dispatch(setSidebarCollapsed(false));
    }
    // Close all active subitems
    setActiveItems({});
  };

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    dispatch(toggleSidebar());
  };

  //   const menuItems = [
  //     {
  //       title: "Main",
  //       items: [
  //         {
  //           icon: <TiHomeOutline />,
  //           text: "Dashboard",
  //           link: "/dashboard/home",
  //         },
  //         {
  //           text: "Sermon Manager",
  //           link: "/dashboard/sermon-manager",
  //           icon: <TiVideoOutline />,
  //         },
  //         {
  //           text: "Announcements",
  //           link: "/dashboard/announcements",
  //           icon: <TiVolumeUp />,
  //         },
  //         {
  //           text: "Contacts",
  //           link: "/dashboard/contacts",
  //           icon: <TiGroupOutline />,
  //           subItems: [
  //             { text: "All", link: "/dashboard/contacts/all" },
  //             {
  //               text: "Comms Lists",
  //               link: "/dashboard/contacts/comms",
  //             },
  //           ],
  //         },
  //         {
  //           text: "Events",
  //           link: "/dashboard/events",
  //           icon: <TiCalendarOutline />,
  //           subItems: [
  //             { text: "All Events", link: "/dashboard/events" },
  //             {
  //               text: "Create New Event",
  //               link: "/dashboard/events/new",
  //             },
  //             {
  //               text: "Manage Events",
  //               link: "/dashboard/events/manage",
  //             },
  //           ],
  //         },
  //
  //         {
  //           text: "Prayer Requests",
  //           link: "/dashboard/prayer-requests",
  //           icon: <PiHandsPraying />,
  //         },
  //         {
  //           text: "Missionaries",
  //           link: "/dashboard/missionaries",
  //           icon: <TiWorldOutline />,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Settings",
  //       items: [
  //         {
  //           text: "Profile",
  //           link: "/dashboard/profile",
  //           icon: <TiCogOutline />,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Account",
  //       items: [
  //         {
  //           text: "Info",
  //           link: "/dashboard/info",
  //           icon: <TiInfoLargeOutline />,
  //         },
  //         ,
  //         { icon: <TiPower />, text: "Logout", link: "#" },
  //       ],
  //     },
  //   ];

  const handleItemClick = (itemText, subItemText = null) => {
    setActiveItems((prevActiveItems) => {
      const newActiveItems = { ...prevActiveItems };
      Object.keys(newActiveItems).forEach((key) => {
        if (key !== itemText) {
          newActiveItems[key] = false;
        }
      });
      if (subItemText) {
        newActiveItems[itemText] = {
          ...newActiveItems[itemText],
          [subItemText]: !newActiveItems[itemText]?.[subItemText],
        };
      } else {
        newActiveItems[itemText] = !newActiveItems[itemText];
      }
      return newActiveItems;
    });
  };

  const renderMenuItem = (item) => {
    const isActive =
      pathname.includes(item.link) ||
      item.subItems?.some((subItem) => pathname.includes(subItem.link));
    return (
      <li
        key={item.text}
        className={cn(
          isActive
            ? "bg-fbc-default text-white hover:bg-fbc-default"
            : "text-gray-600 hover:bg-gray-100",
          "cursor-pointer text-xs",
        )}
        onClick={() => handleItemClick(item.text)}
      >
        {/* MENU ITEM WITH CHILDREN*/}
        {item.subItems ? (
          <>
            <div
              className={cn(
                isActive
                  ? "bg-fbc-default text-white"
                  : "text-gray-600 hover:bg-gray-100",
                "flex w-full items-center justify-between pr-4",
              )}
            >
              <div className="flex items-center">
                <div className="flex h-[40px] w-iconPanel items-center justify-center text-xl">
                  {item.icon}
                </div>
                <span>{item.text}</span>
              </div>
              <TiArrowSortedDown />
            </div>
          </>
        ) : (
          // MENU ITEM NO CHILDREN
          <Link href={item.link} className="flex w-full items-center">
            <div className="flex h-[40px] w-iconPanel items-center justify-center text-xl">
              {item.icon}
            </div>
            <span>{item.text}</span>
          </Link>
        )}

        {/* CHILDREN SUBMENU */}
        {/* <div className="bg-blue-500"> */}
        {item.subItems && (
          <ul
            className="space-y-2 overflow-hidden bg-gray-200 transition-all duration-300"
            style={{
              maxHeight: activeItems[item.text] ? "1000px" : "0",
              // opacity: activeItems[item.text] ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {isSidebarCollapsed &&
              item.subItems.map((subItem) => (
                <Link href={subItem.link} key={subItem.text}>
                  <li
                    className={cn(
                      pathname === subItem.link
                        ? "font-bold text-gray-900"
                        : "font-light text-gray-700",
                      "ml-iconPanel flex h-[30px] w-full items-center justify-between",
                    )}
                  >
                    <span className="text-xs">{subItem.text}</span>
                  </li>
                </Link>
              ))}
          </ul>
        )}
        {/* </div> */}

        {/* CHILDREN SUBMENU WHEN COLLAPPSED */}
        {!isSidebarCollapsed && item.subItems && (
          <div className="relative">
            <ul
              className={`absolute -top-10 left-iconPanel z-50 space-y-2 bg-white p-2 before:absolute before:left-[-10px] before:top-0 before:h-0 before:w-0 before:border-b-[10px] before:border-r-[10px] before:border-t-[10px] before:border-b-transparent before:border-r-white before:border-t-transparent before:content-[''] ${
                activeItems[item.text] ? "block" : "hidden"
              }`}
            >
              <span className="cursor-default text-gray-800">{item.text}</span>
              <hr className="my-1 w-full border-[0.3px] border-black/20" />

              {item.subItems.map((subItem, i) => (
                <li key={subItem.text}>
                  <Link
                    href={subItem.link}
                    className={cn(
                      pathname === subItem.link
                        ? "font-bold text-gray-800"
                        : "text-gray-600",
                      "flex w-full items-center justify-between rounded-md p-1 pr-4 hover:bg-gray-100",
                    )}
                  >
                    <span className="">{subItem.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </li>
    );
  };

  return (
    <div
      className="absolute left-0 top-0 flex w-sideBarPanel flex-col bg-gray-100"
      ref={menuRef}
    >
      <div className="flex-shrink-0">
        {/* LOGO */}
        <div className="mb-4 flex items-center">
          <div className="relative mt-4 flex h-[52px] w-iconPanel items-center justify-center">
            <Image src="/logo.png" alt="logo" fill />
          </div>

          <span className="font-light">Faith Baptist Church</span>
        </div>

        {/* NAVIGATION ARROW     */}
        <div
          className={`top-16 cursor-pointer ${
            isSidebarCollapsed ? "left-56" : "left-12"
          } absolute z-50 rounded-md bg-white px-1 py-1 shadow-md transition-all duration-300 ease-in-out`}
          onClick={toggleMenu}
        >
          {isSidebarCollapsed ? <TiChevronRight /> : <TiChevronLeft />}
        </div>
      </div>

      {/* NAVIGATION AREA */}
      <div className="flex-grow overflow-y-auto">
        <div className="flex flex-col">
          {menuItems.map((menu, index) => (
            <div key={index}>
              {isSidebarCollapsed === false ? (
                <div className="flex h-6 w-iconPanel items-center justify-center px-2">
                  <hr className="w-full border-b-[.05px] border-black/10" />
                </div>
              ) : (
                <div className="flex h-6 items-center px-4 text-xs font-semibold text-gray-600">
                  <h2>{menu.title}</h2>
                </div>
              )}
              <ul className="mb-4">{menu.items.map(renderMenuItem)}</ul>
            </div>
          ))}
        </div>
      </div>
      <div className="sticky bottom-0 flex-shrink-0 bg-white">
        <Avatar />
      </div>
    </div>
  );
}
