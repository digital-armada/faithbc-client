import { API } from "@/lib/constants/api-endpoints";
import { strapiRequest } from "@/lib/strapi-service";
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

  getEvents: async () => {
    const query = {
      populate: "*",
      sort: ["startDate:desc"],
      pagination: {
        pageSize: 100,
      },
      filters: {
        $and: [
          {
            startDate: {
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
      query,
    });

    return response;
  },
};
