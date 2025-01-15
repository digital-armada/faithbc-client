"use client";
import { useDispatch } from "react-redux";
import { playPause, setActiveSermon } from "@/store/features/playerSlice";
import PlayPause from "./PlayPause";
import { Sermon } from "@/components/features/sermons/types";

export const MusicItem = ({
  sermon,
  isPlaying,
  activeSermon,
  data,
}: {
  sermon: Sermon;
  isPlaying: boolean;
  activeSermon: Sermon;
  data: any;
}) => {
  // console.log("sermon", sermon);
  // console.log('activeSermon', activeSermon);
  // console.log("data", data)

  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSermon({ sermon, data }));
    dispatch(playPause(true));
  };

  return (
    <>
      <PlayPause
        isPlaying={isPlaying}
        activeSermon={activeSermon}
        sermon={sermon}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </>
  );
};
