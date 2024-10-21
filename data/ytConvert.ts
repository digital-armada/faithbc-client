"use server";
import axios from "axios";
import path from "path";
import fs from "fs";
import os from "os";
import { fileUploadService } from "./services/file-service";
import ffmpeg from "fluent-ffmpeg";

// Utility function for filename sanitation
function sanitizeFilename(filename) {
  return filename
    .replace(/[^a-z0-9]/gi, "_")
    .replace(/_{2,}/g, "_")
    .toLowerCase();
}

export async function convertVideo(videoUrl) {
  console.log("Starting video conversion:", videoUrl);

  try {
    // Extract the video ID from the URL
    const videoId = extractVideoId(videoUrl); // Implement this function to return the video ID
    // Make API request to get the download link
    const options = {
      method: "GET",
      url: "https://yt-api.p.rapidapi.com/dl",
      params: {
        id: videoId,
        cgeo: "AU",
      },
      headers: {
        "x-rapidapi-key": "83011428c8msh997d7936bc09d13p1fbfacjsn6246953181aa",
        "x-rapidapi-host": "yt-api.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    const title = response.data.title;
    const link = response.data.formats[0].url;
    const sanitizedTitle = sanitizeFilename(title);
    const tempDir = os.tmpdir();
    const videoOutputPath = path.join(tempDir, `${sanitizedTitle}.video`);
    const outputPath = path.join(tempDir, `${sanitizedTitle}.mp3`);

    console.log(`Downloading video: ${title}`);

    // Download the video file from the provided link
    const downloadResponse = await axios({
      url: link,
      method: "GET",
      responseType: "stream",
    });

    // Save the downloaded stream to a file
    const writer = fs.createWriteStream(videoOutputPath);
    downloadResponse.data.pipe(writer);

    // Wait for download completion
    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    console.log("Video downloaded. Starting conversion to MP3...");

    // Convert video to MP3 using ffmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(videoOutputPath)
        .toFormat("mp3")
        .on("end", resolve)
        .on("error", reject)
        .save(outputPath);
    });

    console.log("MP3 conversion done:", outputPath);

    // Proceed with upload
    console.log("Starting file upload...");
    const mp3FileStream = fs.createReadStream(outputPath);
    const uploadResult = await fileUploadService(mp3FileStream, {
      name: `${sanitizedTitle}.mp3`,
    });

    console.log("Upload successful:", uploadResult);

    // Clean up the temporary files
    await fs.promises.unlink(videoOutputPath);
    await fs.promises.unlink(outputPath);

    return {
      success: true,
      data: uploadResult,
      videoDetails: {
        name: title,
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

function extractVideoId(url) {
  try {
    console.log("Attempting to extract ID from URL:", url);
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");

    if (!videoId) {
      console.error("Failed to retrieve video ID from URL:", url);
      return null;
    }
    console.log("Video ID:", videoId);
    return videoId;
  } catch (error) {
    console.error("Error extracting video ID:", error.message);
    return null;
  }
}
