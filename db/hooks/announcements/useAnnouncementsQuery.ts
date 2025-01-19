// components/features/announcements/hooks/useAnnouncementsQuery.ts
"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import createAnnouncementService from "@/src/domain/services/announcementService";

export const useAnnouncementsQuery = (pageIndex: number, pageSize: number) => {
  const { getPublicAnnouncementsUseCase } = createAnnouncementService();
  // const page = pageIndex + 1;

  return useQuery({
    queryKey: ["announcements", pageIndex, pageSize],
    queryFn: async () =>
      await getPublicAnnouncementsUseCase.execute({ pageIndex, pageSize }),
    placeholderData: keepPreviousData,
  });
};
