import { google } from "googleapis";
import { NextResponse } from "next/server";
import axios from "axios";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

// Function to fetch a matching sermon for a YouTube video
async function getSermonForYoutube(videoId) {
  const strapiResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/sermons`,
    {
      params: {
        filters: { youtubeId: videoId },
      },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    },
  );

  const matchingSermons = strapiResponse.data.data;
  return matchingSermons.length === 1 ? matchingSermons[0].id : null;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pageToken = searchParams.get("pageToken") || "";

  try {
    // Fetch uploads playlist ID for the channel
    const channelResponse = await youtube.channels.list({
      part: "contentDetails",
      id: process.env.YOUTUBE_CHANNEL_ID,
    });

    const uploadsPlaylistId =
      channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;

    // Fetch the playlist items
    const playlistItemsResponse = await youtube.playlistItems.list({
      part: "snippet,contentDetails",
      playlistId: uploadsPlaylistId,
      maxResults: 10,
      pageToken: pageToken,
    });

    const videos = playlistItemsResponse.data.items.map((item) => ({
      id: item.contentDetails.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnails: item.snippet.thumbnails,
      publishedAt: item.snippet.publishedAt,
    }));

    // Fetch sermon data for each YouTube video and mark as converted or not
    const videosWithConversionStatus = await Promise.all(
      videos.map(async (video) => {
        const sermonId = await getSermonForYoutube(video.id);
        return {
          ...video,
          isConverted: !!sermonId,
          sermonId: sermonId,
        };
      }),
    );

    return NextResponse.json({
      videos: videosWithConversionStatus,
      nextPageToken: playlistItemsResponse.data.nextPageToken,
      prevPageToken: playlistItemsResponse.data.prevPageToken,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
