import React from "react";
import { MdPlayArrow, MdPause } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import IconButton from "@/components/AudioPlayer/IconButton";
import AudioProgressBar from "../AudioPlayer/AudioProgressBar";
import Image from "next/image";

export default function MiniPlayer({
  activeSermon,
  isPlaying,
  togglePlayPause,
}) {
  return (
    <div className="mx-auto max-w-md rounded-md bg-gray-800 text-gray-300">
      <div className="flex items-center justify-between px-3 py-2">
        {activeSermon?.attributes?.imageUrl ? (
          <Image
            src={activeSermon?.attributes?.imageUrl}
            className="size-10 rounded-md object-cover"
            width={40}
            height={40}
            alt="Image"
          />
        ) : (
          <Image
            src={
              activeSermon?.attributes?.youtube
                ? `https://i.ytimg.com/vi/${
                    activeSermon?.attributes?.youtube.split("=")[1]
                  }/0.jpg`
                : ""
            }
            className="size-10 rounded-md object-cover"
            width={40}
            height={40}
            alt="Image"
          />
        )}

        <div className="w-3/4">
          <p className="truncate font-body">
            {activeSermon?.attributes?.name ?? "Select a sermon"}
          </p>
          <p className="truncate text-[10px]">
            {activeSermon?.attributes?.speaker?.data?.attributes?.speaker ?? ""}
          </p>
        </div>
        <div className="flex gap-2">
          <IconButton
            disabled={!activeSermon}
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
            size="sm"
          >
            {!activeSermon ? null : isPlaying ? (
              <MdPause size={20} />
            ) : (
              <MdPlayArrow size={20} />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );
}
