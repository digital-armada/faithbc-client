export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
  API_URL: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api`,
} as const;

export const API = {
  SERMONS: {
    BASE: "/sermons",
    GET_ALL: `/sermons`,
    GET_ONE: (id: string) => `/sermons/${id}`,
    CREATE: `/sermons`,
    UPDATE: (id: string) => `/sermons/${id}`,
    DELETE: (id: string) => `/sermons/${id}`,
  },

  EVENTS: {
    BASE: "/events",
    GET_ALL: `/events`,
    GET_ONE: (id: string) => `/events/${id}`,
    CREATE: `/events`,
    UPDATE: (id: string) => `/events/${id}`,
    DELETE: (id: string) => `/events/${id}`,
  },
} as const;
