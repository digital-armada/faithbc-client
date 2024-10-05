// @ts-nocheck
"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { fetchVideos } from "@/data/services/youtube-service";
import { getSermonsByYoutubeIds } from "@/data/sermons";

export default function VideoList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useSession();
  const queryClient = useQueryClient();

  const pageToken = searchParams.get("pageToken") || "";

  const fetchVideosAndCheckSermons = useCallback(async ({ queryKey }) => {
    const [_, token] = queryKey;
    const res = await fetchVideos(token);
    const videoIds = res.videos.map((video) => video.id);
    const sermons = await getSermonsByYoutubeIds(videoIds);

    const videosWithSermonStatus = res.videos.map((video) => ({
      ...video,
      isConverted: !!sermons[video.id],
      sermonId: sermons[video.id],
    }));

    return {
      videos: videosWithSermonStatus,
      nextPageToken: res.nextPageToken || "",
      prevPageToken: res.prevPageToken || "",
    };
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["videos", pageToken],
    queryFn: fetchVideosAndCheckSermons,
    keepPreviousData: true,
  });

  const convertMutation = useMutation({
    mutationFn: (video) =>
      axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/customroutes/convert-sermon`,
        { videoId: video.id },
        {
          headers: {
            Authorization: `Bearer ${session?.data?.strapiToken}`,
            "Content-Type": "application/json",
          },
        },
      ),
    onSuccess: (response, video) => {
      queryClient.setQueryData(["videos", pageToken], (oldData) => ({
        ...oldData,
        videos: oldData.videos.map((v) =>
          v.id === video.id
            ? { ...v, isConverted: true, sermonId: response.data.sermon.id }
            : v,
        ),
      }));
    },
  });

  const handleConvert = (video) => {
    convertMutation.mutate(video);
  };

  const handlePageChange = (newToken) => {
    router.push(`?pageToken=${newToken}`, { scroll: false });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>My YouTube Videos</h1>
      <ul>
        {data.videos.map((video) => (
          <li key={video.id}>
            <h3>{video.title}</h3>
            <p>Published: {new Date(video.publishTime).toLocaleDateString()}</p>
            <Image
              src={video.thumbnailUrl.url}
              alt={video.title}
              width={video.thumbnailUrl.width}
              height={video.thumbnailUrl.height}
            />
            {video.isConverted ? (
              <span>Already converted (Sermon ID: {video.sermonId})</span>
            ) : (
              <button
                onClick={() => handleConvert(video)}
                disabled={convertMutation.isLoading}
              >
                {convertMutation.isLoading
                  ? "Converting..."
                  : "Convert to Sermon"}
              </button>
            )}
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => handlePageChange(data.prevPageToken)}
          disabled={!data.prevPageToken || isLoading}
        >
          Previous Page
        </button>
        <button
          onClick={() => handlePageChange(data.nextPageToken)}
          disabled={!data.nextPageToken || isLoading}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
