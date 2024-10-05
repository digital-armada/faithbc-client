//@ts-nocheck
"use server";
import { google, youtube_v3 } from "googleapis";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: youtube_v3.Schema$Thumbnail;
  publishTime: string;
}

interface FetchVideosResponse {
  videos: Video[];
  nextPageToken?: string;
  prevPageToken?: string;
}

async function getUploadPlaylistId(
  youtube: youtube_v3.Youtube,
  channelId: string,
): Promise<string> {
  const response = await youtube.channels.list({
    part: ["contentDetails"],
    id: [channelId],
  });

  return response.data.items[0].contentDetails.relatedPlaylists.uploads;
}

export async function fetchVideos(
  pageToken: string = "",
): Promise<FetchVideosResponse> {
  const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY,
  });

  try {
    const channelId = "UCTcAfgLaSyHGAUIDF2DFayw";
    const uploadPlaylistId = await getUploadPlaylistId(youtube, channelId);

    const response = await youtube.playlistItems.list({
      part: ["snippet", "contentDetails"],
      playlistId: uploadPlaylistId,
      maxResults: 50, // Increased to reduce pagination
      pageToken: pageToken,
    });

    const videos = response.data.items.map((item) => ({
      id: item.contentDetails.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.high,
      publishTime: item.snippet.publishedAt,
    }));

    return {
      videos,
      nextPageToken: response.data.nextPageToken,
      prevPageToken: response.data.prevPageToken,
    };
  } catch (error) {
    console.error("Error fetching videos:", error);
    return {
      videos: [],
    };
  }
}

// import { google, youtube_v3 } from "googleapis";
//
// interface FetchVideosResponse {
//   videos: youtube_v3.Schema$SearchResult[]; // Array of video results
//   nextPageToken?: string; // Optional next page token
//   prevPageToken?: string; // Optional previous page token
// }
//
// export async function fetchVideos(
//   pageToken: string = "",
// ): Promise<FetchVideosResponse> {
//   const youtube = google.youtube({
//     version: "v3",
//     auth: process.env.YOUTUBE_API_KEY, // API Key from environment
//   });
//
//   try {
//     //@ts-ignore
//     const response = await youtube.search.list({
//       part: ["snippet"], // Part is an array of strings, e.g., ["snippet"]
//       channelId: "UCTcAfgLaSyHGAUIDF2DFayw", // Example channel ID
//       order: "date", // Order by date
//       type: "video", // Filter by videos only
//       maxResults: 10, // Max results per request
//       pageToken: pageToken, // Optional pagination token
//     });
//
//     const videos = response.data.items.map((item) => {
//       return {
//         id: item.id.videoId,
//         title: item.snippet.title,
//         description: item.snippet.description,
//         thumbnailUrl: item.snippet.thumbnails.high,
//         publishTime: item.snippet.publishTime,
//       };
//     });
//
//     return {
//       videos: videos, // Fallback to empty array if items are undefined
//       nextPageToken: response.data.nextPageToken,
//       prevPageToken: response.data.prevPageToken,
//     };
//   } catch (error) {
//     console.error("Error fetching videos:", error);
//     return {
//       videos: [], // Fallback to empty videos array in case of error
//     };
//   }
// }
