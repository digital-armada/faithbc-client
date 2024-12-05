import { ReactNode, useEffect, useState } from "react";

export interface Meta {
  pagination: {
    total: number;
    page: number;
    pageSize: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: {
    data: T[];
    meta: Meta;
  };
}

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

// export interface Speaker {
//   id: number;
//   attributes: {
//     speaker: string;
//     sermons?: {
//       data: Sermon[];
//     };
//     createdAt: string;
//     updatedAt: string;
//     publishedAt: string;
//   };
// }

// export interface Sermon {
//   id: string;
//   attributes: {
//     name: string;
//     date: string;
//     audio?: {
//       data: {
//         attributes: {
//           url: string;
//         };
//       };
//     };
//     slug: string;
//     youtube?: string;
//     verse?: string;
//     speaker?: {
//       data: {
//         attributes: Speaker;
//       };
//     };
//     series?: {
//       data: {
//         attributes: Series;
//       };
//     };
//     service_type?:
//       | "Sunday Morning"
//       | "Sunday Evening"
//       | "Wednesday Evening"
//       | "Friday Youth"
//       | "Sunday School"
//       | "Special Events";
//     youtubeId?: string;
//     description?: string;
//     imageUrl?: string;
//   };
// }

interface Address {
  // Define the structure of the address component
  // For example:
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface WWCCCheck {
  // Define the structure of the WWCC check component
  // For example:
  number?: string;
  expiryDate?: string;
  verified?: boolean;
}

export interface User {
  id: string;
  attributes: {
    username: string;
    email: string;
    provider?: string;
    confirmed: boolean;
    blocked: boolean;
    contactNumber?: string;
    address?: Address;
    dateOfBirth?: string; // Assuming the date is returned as a string
    firstName?: string;
    lastName?: string;
    role?: {
      data: {
        attributes: Role;
      };
    };
    commgroups?: {
      data: Array<{
        attributes: Commgroup;
      }>;
    };
    image?: {
      data: {
        attributes: {
          url: string;
          // Add other relevant image attributes
        };
      };
    };
    wwcc_check?: WWCCCheck;
    createdAt: string;
    updatedAt: string;
  };
}
const response: ApiResponse<Sermon[]> = await sermonsService.getSermons({
  pageSize: 4,
});

const sermons = response.success ? response.data.data : [];
