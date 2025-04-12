import { API } from "@/lib/constants/api-endpoints";
import { strapiRequest } from "@/src/interface-adapters/strapi-client";
import qs from "qs";
import { Event } from "./types";

export const eventsService = {
  getEvent: async (id: string) => {
    const query = qs.stringify(
      {
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      },
    );

    const response = await strapiRequest<Event>("GET", API.EVENTS.GET_ONE(id), {
      query,
      // requireAuth: true, // Ensure Authorization is included
    });
    console.log("response", response);

    // console.log("EVENT_SERVICE_GET_EVENT", response.data?.attributes, {
    //   depth: null,
    // });
    return {
      data: response.success ? response.data : null,
      error: response.success ? null : response.error,
    };
  },

  getEvents: async (sessionParam: { session?: any } = {}) => {
    const session = sessionParam.session;
    console.log("Session Details for getEvents:", {
      sessionExists: !!session,
      strapiTokenPresent: session?.data?.strapiToken
        ? "Token is present"
        : "Token is missing",
    });

    const query = {
      populate: "*",
      sort: ["eventStartDate:desc"],
      pagination: {
        pageSize: 200,
      },
      filters: {
        $and: [
          {
            eventStartDate: {
              $gte: new Date().toISOString().split("T")[0],
            },
          },
          {
            $or: [
              {
                internal: {
                  $null: true,
                },
              },
              {
                internal: {
                  $eq: false,
                },
              },
            ],
          },
        ],
      },
    };
    const response = await strapiRequest<Event[]>("GET", API.EVENTS.GET_ALL, {
      session,
      query,
    });
    console.log("getEvents Response:", {
      success: response.success,
      error: response.error || "No error",
      dataCount: response.data
        ? Array.isArray(response.data)
          ? response.data.length
          : "Single item"
        : "No data",
    });
    return response;
  },

  getAllEvents: async ({
    session,
    page = 1,
    pageSize = 10,
    sort = ["eventStartDate:desc"],
  }) => {
    const query = {
      populate: "*",
      sort,
      pagination: {
        page,
        pageSize,
      },
    };

    const response = await strapiRequest<Event[]>("GET", API.EVENTS.GET_ALL, {
      session,
      query,
    });

    return {
      data: response.data,
      meta: response.meta.pagination,
    };
  },
};
