import { getStrapiURL } from "@/lib/utils";
import { auth } from "@/auth";
import { strapiRequest } from "@/lib/strapi-service";
import { User } from "@/types/types";
import { API } from "@/lib/constants/api-endpoints";

export const contactService = {
  getUsers: async ({
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
    const response = await strapiRequest("GET", API.USERS.GET_ALL, {
      query,
    });
    console.log("response", response);
    return response;
  },
};

export async function getBirthdayUsers() {
  const baseUrl = getStrapiURL();
  const url = new URL("api/get-birthday", baseUrl);
  const session = await auth();

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.strapiToken}`,
      },
      cache: "no-cache",
    });
    const data = await response.json();
    console.log(data);
    if (data.error) return { ok: false, data: null, error: data.error };

    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}
