"use server";
import ytdl from "@distube/ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";
import os from "os";
import { fileUploadService } from "./services/file-service";

export async function convertVideo(videoUrl) {
  console.log("Converting video:", videoUrl);
  try {
    // 1. Fetch video info
    const videoInfo = await ytdl.getInfo(videoUrl);
    console.log("Video info:", videoInfo);

    const videoDetails = {
      name: videoInfo.videoDetails.title,
      // Uncomment these lines if needed
      // description: videoInfo.videoDetails.description,
      // duration: videoInfo.videoDetails.lengthSeconds,
      // author: videoInfo.videoDetails.author.name,
      // thumbnailUrl: videoInfo.videoDetails.thumbnails[0]?.url,
    };
    console.log("Video details:", videoDetails);

    // 2. Define paths
    const videoId = ytdl.getURLVideoID(videoUrl);
    const tempDir = os.tmpdir();
    const outputPath = path.join(tempDir, `${videoId}.mp3`);

    // 3. Convert the video to audio
    await new Promise((resolve, reject) => {
      ffmpeg(ytdl(videoUrl, { filter: "audioonly" }))
        .audioCodec("libmp3lame")
        .toFormat("mp3")
        .save(outputPath)
        .on("end", resolve)
        .on("error", reject);
    });

    // 4. Use a stream for file upload
    const mp3FileStream = fs.createReadStream(outputPath);

    // 5. Upload the file to Strapi
    const uploadResult = await fileUploadService(mp3FileStream, {
      ...videoDetails,
    });
    console.log("Upload result:", uploadResult);

    // 6. Clean up temporary file
    fs.unlink(outputPath, (err) => {
      if (err) console.error(`Error deleting temporary file: ${err}`);
    });

    return {
      success: true,
      data: uploadResult,
      videoDetails,
    };
  } catch (error) {
    console.error("Error converting video:", error);
    return { success: false, error: error.message };
  }
}
