import { google, youtube_v3 } from "googleapis";

interface FetchVideosResponse {
  videos: youtube_v3.Schema$SearchResult[]; // Array of video results
  nextPageToken?: string; // Optional next page token
  prevPageToken?: string; // Optional previous page token
}

export async function fetchVideos(
  pageToken: string = "",
): Promise<FetchVideosResponse> {
  const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY, // API Key from environment
  });

  try {
    //@ts-ignore
    const response = await youtube.search.list({
      part: ["snippet"], // Part is an array of strings, e.g., ["snippet"]
      channelId: "UCTcAfgLaSyHGAUIDF2DFayw", // Example channel ID
      order: "date", // Order by date
      type: "video", // Filter by videos only
      maxResults: 10, // Max results per request
      pageToken: pageToken, // Optional pagination token
    });

    // Return videos and pagination tokens
    return {
      //@ts-ignore
      videos: response.data.items || [], // Fallback to empty array if items are undefined
      //@ts-ignore
      nextPageToken: response.data.nextPageToken,
      //@ts-ignore
      prevPageToken: response.data.prevPageToken,
    };
  } catch (error) {
    console.error("Error fetching videos:", error);
    return {
      videos: [], // Fallback to empty videos array in case of error
    };
  }
}
