"use server";
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");

function convertToMp3(videoUrl, outputDir) {
  return new Promise((resolve, reject) => {
    const videoId = ytdl.getURLVideoID(videoUrl);
    const outputPath = path.join(outputDir, `${videoId}.mp3`);

    ffmpeg(ytdl(videoUrl, { filter: "audioonly" }))
      .audioCodec("libmp3lame")
      .toFormat("mp3")
      .save(outputPath)
      .on("end", () => resolve(outputPath))
      .on("error", reject);
  });
}
