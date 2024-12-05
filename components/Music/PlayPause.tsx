"use client";
import { Sermon } from "@/features/sermons/types";
import { FaPauseCircle, FaPlay, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({
  isPlaying,
  activeSermon,
  sermon,
  handlePause,
  handlePlay,
}: {
  isPlaying: boolean;
  activeSermon: Sermon;
  sermon: Sermon;
  handlePause: () => void;
  handlePlay: () => void;
}) => {
  return (
    <>
      <div className="flex cursor-pointer items-center gap-2">
        {isPlaying &&
        activeSermon?.attributes?.name === sermon?.attributes?.name ? (
          <FaPauseCircle
            className="text-2xl text-gray-600"
            onClick={handlePause}
          />
        ) : (
          <FaPlayCircle
            onClick={handlePlay}
            className="text-2xl text-gray-600"
          />
        )}
      </div>
    </>
  );
};

export default PlayPause;
