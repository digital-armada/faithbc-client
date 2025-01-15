"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { filterMenuItems, MenuItemType } from "@/lib/constants/filterMenuItems";
import { menuItems } from "@/lib/constants/MenuItems";

export function useRoleBasedMenu() {
  const { data: session, status } = useSession();
  const [filteredMenu, setFilteredMenu] = useState<MenuItemType[]>([]);

  useEffect(() => {
    if (status === "authenticated") {
      const role = session?.user?.role || "member";
      const filtered = filterMenuItems(menuItems, role);
      console.log("Filtered Menu:", filtered);
      setFilteredMenu(filtered);

      // Save to local storage
      localStorage.setItem("userMenu", JSON.stringify(filtered));
    } else if (status === "unauthenticated") {
      // Clear the menu when logged out
      setFilteredMenu([]);
      localStorage.removeItem("userMenu");
    }
  }, [session, status]);

  return filteredMenu;
}
// "use client";
//
// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { filterMenuItems, MenuItemType } from "@/lib/constants/filterMenuItems";
// import { menuItems } from "@/lib/constants/MenuItems";
//
// export function useRoleBasedMenu() {
//   const { data: session } = useSession();
//   const [filteredMenu, setFilteredMenu] = useState<MenuItemType[]>([]);
//
//   useEffect(() => {
//     const role = session?.user?.role || "member";
//     const filtered = filterMenuItems(menuItems, role);
//     console.log("Filtered Menu:", filtered);
//     setFilteredMenu(filtered);
//
//     // Save to local storage
//     localStorage.setItem("userMenu", JSON.stringify(filtered));
//   }, [session]);
//
//   return filteredMenu;
// }
