import { google } from "googleapis";

export async function fetchVideos(pageToken = "") {
  const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY,
  });

  const response = await youtube.search.list({
    part: "snippet",
    channelId: "UCTcAfgLaSyHGAUIDF2DFayw",
    order: "date",
    type: "video",
    maxResults: 10,
    pageToken: pageToken,
  });
  return {
    videos: response.data.items,
    nextPageToken: response.data.nextPageToken,
    prevPageToken: response.data.prevPageToken,
  };
}
