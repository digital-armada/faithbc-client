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
    const agent = ytdl.createAgent(
      JSON.parse(fs.readFileSync("cookies.json", "utf-8")),
    );

    // 1. Fetch video info with the agent
    const videoInfo = await ytdl.getInfo(videoUrl, { agent });
    console.log("Video info:", videoInfo);
    const videoDetails = {
      name: videoInfo.videoDetails.title,
    };
    console.log("Video details:", videoDetails);

    // 2. Define paths
    const videoId = ytdl.getURLVideoID(videoUrl);
    const tempDir = os.tmpdir();
    const outputPath = path.join(tempDir, `${videoId}.mp3`);

    // 3. Convert the video to audio using agent
    await new Promise((resolve, reject) => {
      //@ts-ignore
      ffmpeg(ytdl(videoUrl, { filter: "audioonly", requestOptions: { agent } }))
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
