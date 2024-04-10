import { apiSlice } from './apiSlice';
import paths from '@/lib/paths';

export const playerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllSermons: builder.query({
            query: () => paths.getAllSermons(), // Use paths.getAllSermons() as the query
        }),
        getSermonDetails: builder.query({
            query: ({ songId }) => `sermons/${songId}?populate=*`,
        }),
    }),
});

export const { useGetSermonDetailsQuery, useGetAllSermonsQuery } =
    playerApiSlice;
