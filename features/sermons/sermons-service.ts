import { strapiRequest } from "@/lib/strapi-service";
import { API } from "@/lib/constants/api-endpoints";
import { Sermon, SermonResponse } from "@/features/sermons/types";
import { strapiRequestClient } from "@/lib/strapiClient-service";

export const sermonsService = {
  getSermon: async (id: string) => {
    return strapiRequest<Sermon[]>("GET", API.SERMONS.GET_ONE(id), {
      query: { populate: "*" },
    });
  },

  getInfiniteSermons: async ({
    page = 1,
    pageSize = 10,
  }: {
    page?: number;
    pageSize?: number;
  }) => {
    const query = {
      populate: "*",
      sort: "date:desc",
      pagination: {
        page,
        pageSize,
      },
    };

    const response = await strapiRequest<Sermon[]>("GET", API.SERMONS.GET_ALL, {
      query,
      // requireAuth: true,
      // next: { revalidate: 60 },
    });
    console.log("response", response);
    return response;
  },

  getSermonsByYoutubeIds: async (youtubeIds: string[]) => {
    const query = {
      "filters[youtubeId][$in]": youtubeIds,
      "fields[0]": "youtubeId",
      "pagination[limit]": 100,
    };

    const response = await strapiRequest<Sermon[]>("GET", API.SERMONS.GET_ALL, {
      query,
    });
    return response.data.reduce((acc, sermon) => {
      acc[sermon.attributes.youtubeId] = sermon.id;
      return acc;
    }, {});
  },

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

  getClientInfiniteSermons: async ({
    page = 1,
    search = "",
    pageSize = 10,
  }: {
    page?: number;
    search?: string;
    pageSize?: number;
  }) => {
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
