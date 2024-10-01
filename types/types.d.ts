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

// src/types/types.ts or lib/types/types.ts

export interface Speaker {
  id: string;
  attributes: {
    speaker: string;
    sermons?: {
      data: Sermon[];
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Sermon {
  id: string;
  attributes: {
    name: string;
    date: string;
    audio?: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    slug: string;
    youtube?: string;
    verse?: string;
    speaker?: {
      data: {
        attributes: Speaker;
      };
    };
    series?: {
      data: {
        attributes: Series;
      };
    };
    service_type?:
      | "Sunday Morning"
      | "Sunday Evening"
      | "Wednesday Evening"
      | "Friday Youth"
      | "Sunday School"
      | "Special Events";
    youtubeId?: string;
    description?: string;
    imageUrl?: string;
  };
}

// Define the types for the API response
export interface EventAttributes {
  slug: string;
  title: string;
  featuredImage?: {
    data?: {
      attributes?: {
        formats?: {
          thumbnail?: {
            url: string;
          };
        };
      };
    };
  };
  startDate: string; // Assuming dates are strings in the API response
  endDate?: string;
}

export interface Event {
  id: number;
  attributes: EventAttributes;
}
