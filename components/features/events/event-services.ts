import { API } from "@/lib/constants/api-endpoints";
import { strapiRequest } from "@/db/strapi-service";
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
      requireAuth: true, // Ensure Authorization is included
    });
    // console.log("EVENT_SERVICE_GET_EVENT", response.data?.attributes, {
    //   depth: null,
    // });
    return response.data;
  },

  getEvents: async ({ session }: { session: any }) => {
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
    console.log("res", response);
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
