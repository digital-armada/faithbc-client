import { NextResponse } from "next/server";
import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import axios from "axios";

// Convert YouTube video to MP3 and create a sermon in Strapi
async function convertYoutubeToSermon(videoId, title) {
  console.log("Converting video:", videoId, title);
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const outputPath = `/tmp/${videoId}-${title}.mp3`; // Use `/tmp` for serverless environments

  const videoStream = ytdl(videoUrl, { filter: "audioonly" });

  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(videoStream)
      .audioCodec("libmp3lame")
      .toFormat("mp3")
      .on("end", async () => {
        console.log("Conversion finished");

        // Upload MP3 to Strapi
        const uploadResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`,
          {
            data: {
              fileInfo: {
                name: `${videoId}-${title}.mp3`,
                alternativeText: title,
              },
              files: {
                path: outputPath,
                name: `${videoId}-${title}.mp3`,
                type: "audio/mpeg",
              },
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            },
          },
        );

        // Create sermon entry in Strapi
        const sermonResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/sermons`,
          {
            data: {
              title: title,
              youtubeId: videoId,
              audio: uploadResponse.data[0], // Assuming audio field accepts upload response data
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            },
          },
        );

        resolve(sermonResponse.data);
      })
      .on("error", (error) => {
        console.error("Conversion failed:", error);
        reject(error);
      })
      .save(outputPath);
  });
}

// API route handler for POST requests
export async function POST(request) {
  const { videoId, title } = await request.json();

  try {
    const sermonData = await convertYoutubeToSermon(videoId, title);
    return NextResponse.json({ success: true, sermonData });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to convert video" },
      { status: 500 },
    );
  }
}
