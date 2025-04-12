// @ts-nocheck
"use client";
import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { fetchVideos } from "@/data/services/youtube-service";
import { getSermonsByYoutubeIds } from "@/data/sermons";
import { createSermonFromVideo } from "@/features/sermons/sermon-actions";

export default function VideoList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
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
      sermonId: sermons[video.id] || null,
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
  });

  const handleConvert = async (video) => {
    try {
      const response = await createSermonFromVideo(video);

      if (response.data) {
        queryClient.setQueryData(["videos", pageToken], (oldData) => ({
          ...oldData,
          videos: oldData.videos.map((v) =>
            v.id === video.id
              ? { ...v, isConverted: true, sermonId: response.data.id }
              : v,
          ),
        }));
        router.refresh();
      }
    } catch (error) {
      console.error("Error converting video:", error);
    }
  };
  const handlePageChange = (newToken) => {
    router.push(`?pageToken=${newToken}`, { scroll: false });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">My YouTube Videos</h1>
      <ul className="space-y-4">
        {data?.videos.map((video) => (
          <li key={video.id} className="rounded-lg border p-4">
            <h3 className="text-xl font-semibold">{video.title}</h3>
            <p className="text-sm text-gray-600">
              Published: {new Date(video.publishTime).toLocaleDateString()}
            </p>
            {video.thumbnailUrl.url && (
              <Image
                src={video.thumbnailUrl.url}
                alt={video.title}
                width={video.thumbnailUrl.width}
                height={video.thumbnailUrl.height}
                className="my-2 rounded"
              />
            )}
            {video.isConverted ? (
              <span className="text-green-600">
                Already converted (Sermon ID: {video.sermonId})
              </span>
            ) : (
              <button
                onClick={() => handleConvert(video)}
                // disabled={createSermonMutation.isLoading}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
              >
                {/* {createSermonMutation.isLoading
                  ? "Converting..."
                  : "Convert to Sermon"} */}
              </button>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(data?.prevPageToken)}
          disabled={!data?.prevPageToken || isLoading}
          className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 disabled:bg-gray-100"
        >
          Previous Page
        </button>
        <button
          onClick={() => handlePageChange(data?.nextPageToken)}
          disabled={!data?.nextPageToken || isLoading}
          className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 disabled:bg-gray-100"
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export interface SermonCreateData {
  data: {
    name: string;
    date: string;
    slug: string;
    youtubeId: string;
    youtube: string;
    description: string;
    imageUrl: string;
  };
}
