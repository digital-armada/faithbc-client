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
