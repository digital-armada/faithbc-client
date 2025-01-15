// import { MenuItemType } from "../types/menuItem";

import { ReactNode } from "react";

export type SubItemType = {
  text: string;
  link: string;
};

export type RoleConfigType = {
  show: boolean;
  asSubItem?: boolean;
  subItems?: SubItemType[];
};

export type MenuItemType = {
  icon: ReactNode;
  text: string;
  link: string;
  roles: {
    [key: string]: RoleConfigType;
  };
  subItems?: SubItemType[];
};

export function filterMenuItems(
  menuItems: MenuItemType[],
  role: string,
): MenuItemType[] {
  return menuItems
    .filter((item) => item.roles[role]?.show)
    .map((item) => ({
      ...item,
      subItems: item.roles[role]?.asSubItem
        ? item.roles[role]?.subItems
        : undefined,
    }));
}
