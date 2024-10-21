"use server";
import axios from "axios";
import path from "path";
import fs from "fs";
import os from "os";
import { fileUploadService } from "./services/file-service";

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
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      params: { id: videoId },
      headers: {
        "x-rapidapi-key": "83011428c8msh997d7936bc09d13p1fbfacjsn6246953181aa",
        "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    console.log("response", response);
    const { link, title } = response.data;
    const sanitizedTitle = sanitizeFilename(title);
    const tempDir = os.tmpdir();
    const outputPath = path.join(tempDir, `${sanitizedTitle}.mp3`);

    console.log(`Downloading MP3: ${title}`);

    // Download the MP3 file from the provided link
    const downloadResponse = await axios({
      url: link,
      method: "GET",
      responseType: "stream",
    });

    // Save the downloaded stream to a file
    const writer = fs.createWriteStream(outputPath);
    downloadResponse.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    console.log("MP3 downloaded and saved to:", outputPath);

    console.log("Starting file upload...");
    const mp3FileStream = fs.createReadStream(outputPath);
    const uploadResult = await fileUploadService(mp3FileStream, {
      name: `${sanitizedTitle}.mp3`,
    });

    console.log("Upload successful:", uploadResult);

    // Clean up the temporary file
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
  // Logic to extract video ID from the URL (assuming YouTube URL format)
  const urlObj = new URL(url);
  return urlObj.searchParams.get("v") || ""; // Adjust if your URL format differs
}
