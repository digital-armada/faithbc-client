"use client";
import React, { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewCurrentProgress } from "@/store/features/playerSlice";
import { useAppSelector } from "@/hooks/useRedux";

interface ProgressCSSProps extends React.CSSProperties {
  "--progress-width": number;
  "--buffered-width": number;
}

const AudioProgressBar = () => {
  const { duration, currentProgress, buffered } = useAppSelector(
    (state) => state.player,
  );
  const dispatch = useDispatch();

  const [seekingProgress, setSeekingProgress] = useState(currentProgress);
  const [isDragging, setIsDragging] = useState(false);

  const progressBarWidth = useMemo(() => {
    return isNaN(seekingProgress / duration) ? 0 : seekingProgress / duration;
  }, [seekingProgress, duration]);

  const bufferedWidth = useMemo(() => {
    return isNaN(buffered / duration) ? 0 : buffered / duration;
  }, [buffered, duration]);

  const progressStyles: ProgressCSSProps = useMemo(() => {
    return {
      "--progress-width": progressBarWidth,
      "--buffered-width": bufferedWidth,
    };
  }, [progressBarWidth, bufferedWidth]);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.currentTarget.value);
    // dispatch(setNewCurrentProgress(newTime)); // Update Redux state

    setSeekingProgress(newTime); // Update component state
  };

  // const handleMouseDown = e => {
  //     setSeekingProgress(parseInt(e.currentTarget.value)); // Update on start drag
  // };

  const handleMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    dispatch(setNewCurrentProgress(seekingProgress)); // Update Redux state
  };

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLInputElement>) => {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      const newProgress = Math.floor((touchX / rect.width) * duration);
      setSeekingProgress(newProgress);
      // dispatch(setNewCurrentProgress(newProgress));
      setIsDragging(true); // Set isDragging to true
    },
    [duration],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLInputElement>) => {
      // e.preventDefault();
      if (isDragging) {
        const rect = e.currentTarget.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        const newProgress = Math.floor((touchX / rect.width) * duration);
        setSeekingProgress(newProgress);
        // dispatch(setNewCurrentProgress(newProgress));
      }
    },
    [duration, isDragging],
  );

  const handleTouchEnd = (e: React.TouchEvent<HTMLInputElement>) => {
    dispatch(setNewCurrentProgress(seekingProgress));
  };

  return (
    <div className="group absolute -top-[4px] left-0 right-0 h-1">
      <input
        type="range"
        name="progress"
        className="progress-bar absolute inset-0 m-0 h-full w-full cursor-pointer appearance-none bg-transparent accent-sky-600 transition-all before:absolute before:inset-0 before:h-full before:w-full before:origin-left before:bg-sky-600 after:absolute after:h-full after:w-full after:bg-sky-600/50 hover:accent-sky-600 group-hover:h-2 dark:bg-gray-700"
        style={progressStyles}
        min={0}
        max={duration}
        value={currentProgress} // Controlled value
        onChange={handleProgressChange}
        // onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
};

export default AudioProgressBar;
