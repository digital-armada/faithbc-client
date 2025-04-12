import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import paths from "@/lib/paths";

const baseQuery = fetchBaseQuery({
  baseUrl: paths.baseApi(),
});

export const apiSlice = createApi({
  baseQuery,
  // tagTypes: ['Product', 'Order', 'User'],

  endpoints: (builder) => ({}),
});
