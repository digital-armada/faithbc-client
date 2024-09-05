// utils/menuUtils.ts
import { MenuSection, RoleSpecificMenuItem, BaseMenuItem } from "@/types/types";

export function filterMenuItemsByRole(
  menuSections: MenuSection[],
  userRole: string,
): MenuSection[] {
  return menuSections
    .map((section) => ({
      ...section,
      items: section.items
        .filter((item) => item.roles[userRole]?.show)
        .map((item) => transformMenuItem(item, userRole)),
    }))
    .filter((section) => section.items.length > 0);
}

function transformMenuItem(
  item: RoleSpecificMenuItem,
  userRole: string,
): BaseMenuItem {
  const roleConfig = item.roles[userRole];

  if (roleConfig.asSubItem && roleConfig.subItems) {
    return {
      ...item,
      subItems: roleConfig.subItems,
    };
  }

  return {
    icon: item.icon,
    text: item.text,
    link: item.link,
  };
}
