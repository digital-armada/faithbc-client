"use server";
import ytdl from "@distube/ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";
import os from "os";
import { fileUploadService } from "./services/file-service";

// Utility function for filename sanitation
function sanitizeFilename(filename) {
  return filename
    .replace(/[^a-z0-9]/gi, "_") // Replace non-alphanumeric characters with underscores
    .replace(/_{2,}/g, "_") // Replace multiple underscores with a single one
    .toLowerCase(); // Optionally convert to lower case for consistency
}

export async function convertVideo(videoUrl) {
  console.log("Starting video conversion:", videoUrl);
  try {
    const cookiesPath = path.resolve(process.cwd(), "cookies.json");
    if (!fs.existsSync(cookiesPath)) {
      throw new Error(`Cookies file not found: ${cookiesPath}`);
    }

    const cookies = JSON.parse(fs.readFileSync(cookiesPath, "utf-8"));
    const options = {
      requestOptions: {
        headers: {
          cookie: cookies
            .map((cookie) => `${cookie.name}=${cookie.value}`)
            .join("; "),
        },
      },
    };

    const videoInfo = await ytdl.getInfo(videoUrl, options);
    const videoTitle = videoInfo.videoDetails.title;
    const sanitizedTitle = sanitizeFilename(videoTitle);
    console.log("Video info retrieved:", {
      title: videoTitle,
      lengthSeconds: videoInfo.videoDetails.lengthSeconds,
    });

    const videoId = ytdl.getURLVideoID(videoUrl);
    const tempDir = os.tmpdir();
    const outputPath = path.join(tempDir, `${videoId}.mp3`);
    console.log("Converting video to MP3:", {
      outputPath,
      videoId,
    });

    await new Promise((resolve, reject) => {
      const stream = ytdl(videoUrl, {
        ...options,
        filter: "audioonly",
        quality: "highestaudio",
      });

      stream.on("error", (error) => {
        console.error("YouTube download error:", error);
        reject(error);
      });

      ffmpeg(stream)
        .audioCodec("libmp3lame")
        .toFormat("mp3")
        .audioBitrate(192)
        .on("start", () => console.log("FFmpeg conversion started"))
        .on("progress", (progress) => console.log("FFmpeg progress:", progress))
        .on("error", (error) => {
          console.error("FFmpeg error:", error);
          reject(error);
        })
        .on("end", () => {
          console.log("FFmpeg conversion completed");
          resolve(null);
        })
        .save(outputPath);
    });

    console.log("Starting file upload...");
    const mp3FileStream = fs.createReadStream(outputPath);

    // Use sanitized filename
    const uploadResult = await fileUploadService(mp3FileStream, {
      name: `${sanitizedTitle}.mp3`,
    });

    await fs.promises.unlink(outputPath).catch(console.error);

    return {
      success: true,
      data: uploadResult,
      videoDetails: {
        name: videoTitle,
      },
    };
  } catch (error) {
    console.error("Video conversion error:", {
      message: error.message,
      stack: error.stack,
      type: error.constructor.name,
    });

    return {
      success: false,
      error: error.message,
    };
  }
}
