import { ReactNode } from "react";

interface BaseMenuItem {
  icon: ReactNode;
  text: string;
  link: string;
  subItems?: BaseMenuItem[]; // Optional subItems for nested menus
}

interface RoleSpecificMenuItem extends BaseMenuItem {
  roles: {
    [key: string]: {
      show: boolean;
      asSubItem?: boolean;
      subItems?: BaseMenuItem[];
    };
  };
}

interface MenuSection {
  title: string;
  items: RoleSpecificMenuItem[];
}

interface TransformedMenuSection {
  title: string;
  items: BaseMenuItem[]; // Now this section will only hold BaseMenuItem[]
}

export function filterMenuItemsByRole(
  menuSections: MenuSection[],
  userRole: string,
): TransformedMenuSection[] {
  return menuSections
    .map((section) => ({
      title: section.title, // Keep the title unchanged
      items: section.items
        .filter((item) => item.roles[userRole]?.show)
        .map((item) => transformMenuItem(item, userRole)), // Transform RoleSpecificMenuItem to BaseMenuItem
    }))
    .filter((section) => section.items.length > 0); // Only return sections with items
}

function transformMenuItem(
  item: RoleSpecificMenuItem,
  userRole: string,
): BaseMenuItem {
  const roleConfig = item.roles[userRole];

  if (roleConfig.asSubItem && roleConfig.subItems) {
    return {
      icon: item.icon,
      text: item.text,
      link: item.link,
      subItems: roleConfig.subItems, // Ensure subItems are present if configured
    };
  }

  return {
    icon: item.icon,
    text: item.text,
    link: item.link,
  };
}
