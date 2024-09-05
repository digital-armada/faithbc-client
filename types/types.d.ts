import { ReactNode } from "react";

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type FormErrorsT = {
  identifier?: undefined | string[];
  password?: undefined | string[];
  strapiError?: string;
};

export interface StringMap {
  [key: string]: string;
}

export interface StringToBooleanMap {
  [key: string]: boolean;
}

// MENU TYPES
export interface BaseMenuItem {
  icon: ReactNode;
  text: string;
  link: string;
}

export interface RoleSpecificMenuItem extends BaseMenuItem {
  roles: {
    [key: string]: {
      show: boolean;
      asSubItem?: boolean;
      subItems?: BaseMenuItem[];
    };
  };
}

export interface MenuSection {
  title: string;
  items: RoleSpecificMenuItem[];
}
