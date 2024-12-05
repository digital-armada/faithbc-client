import { strapiRequest } from "@/lib/strapi-service";
import { API } from "@/lib/constants/api-endpoints";
import { strapiRequestClient } from "@/lib/strapiClient-service";
import { getUsers } from "@/data/services/getUsers";

export const contactsService = {
  getUsers: async () => {
    return strapiRequest<User[]>("GET", API.CONTACTS.GET_ALL, {
      query: { populate: "*" },
    });
  },
};
