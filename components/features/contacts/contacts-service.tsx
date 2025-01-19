import { strapiRequest } from "@/src/interface-adapters/strapi-client";
import { API } from "@/lib/constants/api-endpoints";

export const contactsService = {
  getUsers: async ({
    session,
    currentMonth,
    page,
    pageSize,
  }: {
    page?: number;
    pageSize?: number;
    session?: any;
    currentMonth?: number; // Expecting month as a 0-based index (0 = January, 11 = December)
  }) => {
    const query: any = {
      populate: "*",
      sort: "dateOfBirth:asc",
      pagination: {
        page,
        pageSize,
      },
    };

    // Add filters dynamically if `month` is provided
    if (currentMonth !== undefined) {
      const monthString = String(currentMonth + 1).padStart(2, "0"); // Convert to "01" for January
      query.filters = {
        $and: [
          {
            dateOfBirth: {
              $notNull: true,
            },
          },
          {
            dateOfBirth: {
              $containsi: `-${monthString}-`, // Matches the month part in the date
            },
          },
        ],
      };
    }

    const response = await strapiRequest("GET", API.USERS.GET_ALL, {
      query,
      session,
      requireAuth: true,
    });
    console.log("response", response);
    return response;
  },
};
