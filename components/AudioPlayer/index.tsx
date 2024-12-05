"use client";
import React from "react";

import { useDispatch } from "react-redux";

import AudioProgressBar from "@/components/AudioPlayer/AudioProgressBar";
import VolumeInput from "@/components/AudioPlayer/VolumeInput";
// import { set } from "date-fns";
import Audio from "./Audio";
import PlayAndPause from "./PlayAndPause";
import Image from "next/image";
import { useAppSelector } from "@/hooks/useRedux";
import { Sermon } from "@/features/sermons/types";

function formatDurationDisplay(duration: number) {
  const min = Math.floor(duration / 60);
  const sec = Math.floor(duration - min * 60);

  const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":");

  return formatted;
}

export default function AudioPlayer({
  activeSermon,
}: {
  activeSermon: Sermon;
}) {
  const { duration, currentProgress, buffered, isReady, volume } =
    useAppSelector((state) => state.player);

  // const dispatch = useDispatch();
  const durationDisplay = formatDurationDisplay(duration);
  const elapsedDisplay = formatDurationDisplay(currentProgress);

  return (
    <div className="relative bg-gray-800 p-3 text-gray-400">
      <Audio
        activeSermon={activeSermon}
        src={`${activeSermon?.attributes?.audio?.data?.attributes?.url}`}
      />
      <AudioProgressBar />

      <div className="mt-2 grid grid-cols-3">
        <div className="flex">
          {activeSermon?.attributes?.imageUrl ? (
            <Image
              src={activeSermon?.attributes?.imageUrl}
              className="size-14 rounded-md object-cover"
              width={56}
              height={56}
              alt=""
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
              className="size-14 rounded-md object-cover"
              width={56}
              height={56}
              alt=""
            />
          )}
          {/* FIXME */}
          {/* <div className="mb-1 ml-4 min-w-[183px] items-center">
            {activeSermon?.attributes?.name && (
              <p className="truncate font-bold text-slate-300">
                {activeSermon?.attributes?.name}
              </p>
            )}
            {activeSermon?.attributes?.speaker?.data?.attributes?.speaker && (
              <p className="text-xs">
                {activeSermon?.attributes?.speaker?.data?.attributes?.speaker}
              </p>
            )}
          </div> */}
        </div>
        <div className="flex items-center justify-center gap-4 text-xs">
          {elapsedDisplay} <PlayAndPause />
          {durationDisplay}
        </div>
        <div className="flex items-center gap-4 justify-self-center">
          {/* <IconButton
                        onClick={handlePrev}
                        disabled={songIndex === 0}
                        aria-label='go to previous'
                        intent='secondary'>
                        <MdSkipPrevious size={24} />
                    </IconButton> */}

          {/* <IconButton
                        onClick={handleNext}
                        disabled={songIndex === songCount - 1}
                        aria-label='go to next'
                        intent='secondary'>
                        <MdSkipNext size={24} />
                    </IconButton> */}
          <VolumeInput />
        </div>
      </div>
    </div>
  );
}
