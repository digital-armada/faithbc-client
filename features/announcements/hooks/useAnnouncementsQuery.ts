"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import createAnnouncementService from "@/src/application/services/announcementService";
import useClientAuth from "@/src/infrastructure/utils/useClientAuth";
// import { useSession } from "next-auth/react";

interface StrapiResponse<T> {
  data: T;
  meta: any;
}

export const useAnnouncementsQuery = (
  pageIndex: number,
  pageSize: number,
  initialData: StrapiResponse<any> | undefined,
) => {
  const { session } = useClientAuth();
  const token = session?.strapiToken;

  const { getPublicAnnouncementsUseCase } = createAnnouncementService();
  const page = pageIndex + 1;

  const { data, error, isLoading, isPlaceholderData, isFetching } = useQuery({
    queryKey: ["announcements", pageIndex, pageSize, token],
    queryFn: async () =>
      await getPublicAnnouncementsUseCase.execute({
        page,
        pageSize,
        token,
      }),

    initialData: pageIndex === 0 ? initialData : undefined,
    placeholderData: keepPreviousData,
    // staleTime: 0,
    // Add initialDataUpdatedAt to tell React Query when the initial data was generated
    initialDataUpdatedAt: pageIndex === 0 ? Date.now() : undefined,
  });
  return {
    data,
    error,
    isLoading,
    isPlaceholderData,
    isFetching,
  };
};
