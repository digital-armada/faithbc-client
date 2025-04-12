"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { eventsService } from "@/features/events/event-services";
import { useSession } from "next-auth/react";

export const useEvents = ({
  pageIndex = 0, // Tanstack uses 0-based indexing
  pageSize = 10,
  sorting = [{ id: "eventStartDate", desc: true }],
} = {}) => {
  const session = useSession();

  // console.log("useEvents ==> ", session);

  return useQuery({
    queryKey: ["events", { pageIndex, pageSize, sorting }],
    queryFn: async () => {
      const response = await eventsService.getAllEvents({
        session,
        page: pageIndex + 1, // Convert to 1-based indexing for API
        pageSize,
        sort: sorting.map((sort) => `${sort.id}:${sort.desc ? "desc" : "asc"}`),
      });

      return {
        data: response.data,
        pageCount: Math.ceil(response.meta.total / pageSize),
        total: response.meta.total,
      };
    },
    placeholderData: keepPreviousData,
  });
};
