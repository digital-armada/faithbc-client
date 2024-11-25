import { strapiRequest } from "@/lib/strapi-service";
import { API_CONFIG, API } from "@/lib/constants/api-endpoints";
import { Sermon } from "@/features/sermons/types";
import { strapiRequestClient } from "@/lib/strapiClient-service";
import { auth } from "@/auth";
import qs from "qs";

export const sermonsService = {
  //   getSermonsByYoutubeIds: async (youtubeIds: string[]) => {
  //     const query = {
  //       "filters[youtubeId][$in]": youtubeIds,
  //       "fields[0]": "youtubeId",
  //       "pagination[limit]": 100,
  //     };
  //
  //     const response = await strapiRequest<Sermon[]>(
  //       "GET",
  //       API_ENDPOINTS.SERMONS.GET_ALL,
  //       { query },
  //     );
  //     return response.data.reduce((acc, sermon) => {
  //       acc[sermon.attributes.youtubeId] = sermon.id;
  //       return acc;
  //     }, {});
  //   },
  //
  //   getSermon: async (id: string) => {
  //     return strapiRequest<Sermon>("GET", API_ENDPOINTS.SERMONS.GET_ONE(id), {
  //       query: {
  //         populate: "*",
  //       },
  //     });
  //   },

  getSermons: async ({
    pageIndex = 0,
    pageSize = 4,
    sort = ["date:desc"],
    populate = "*",
  }: {
    pageIndex?: number;
    pageSize?: number;
    sort?: string[];
    populate?: string;
  }) => {
    const query = {
      sort,
      pagination: {
        page: pageIndex + 1,
        pageSize,
      },
      populate,
    };

    // const url = `${API_CONFIG.API_URL}?${query}`;
    // const session = await auth();

    return strapiRequest<Sermon[]>("GET", API.SERMONS.GET_ALL, {
      query,
    });
  },

  getInfiniteSermons: async ({ page = 1, search = "" }) => {
    const query = qs.stringify({
      populate: "*",
      sort: "date:desc",
      pagination: {
        page,
        pageSize: 10,
      },
      ...(search?.trim() && {
        filters: {
          name: {
            $contains: search,
          },
        },
      }),
    });

    const response = await strapiRequest<Sermon[]>("GET", API.SERMONS.GET_ALL, {
      query,
      // next: { revalidate: 60 },
    });
    return response;
  },

  /**
   * Client-side function to fetch sermons using the client-specific request utility
   * @/lib/strapiClient-service.ts
   */

  getClientInfiniteSermons: async ({ page = 1, search = "" }) => {
    const query = {
      populate: "*",
      sort: "date:desc",
      "pagination[page]": page,
      "pagination[pageSize]": 10,
      ...(search?.trim() && {
        "filters[name][$contains]": encodeURIComponent(search),
      }),
    };

    // Use the client-specific request utility for client-side operations
    const response = await strapiRequestClient<Sermon[]>(
      "GET",
      API.SERMONS.GET_ALL,
      {
        query,
      },
    );

    return response;
  },
};
