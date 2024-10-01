"use client";
import { useAppSelector } from "@/hooks/useRedux";
import {
  playPause,
  setActiveSermon,
  setBuffered,
  setCurrentProgress,
  setDuration,
  setIsReady,
  setNewCurrentProgress,
  setVolume,
} from "@/redux/features/playerSlice";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Audio({
  src,
  activeSermon,
}: {
  src: string;
  activeSermon: any;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { isReady, isPlaying, volume, newCurrentProgress } = useAppSelector(
    (state) => state.player,
  );

  const handleBufferProgress: React.ReactEventHandler<HTMLAudioElement> = (
    e,
  ) => {
    const audio = e.currentTarget;
    const dur = audio.duration;
    if (dur > 0) {
      for (let i = 0; i < audio.buffered.length; i++) {
        if (
          audio.buffered.start(audio.buffered.length - 1 - i) <
          audio.currentTime
        ) {
          const bufferedLength = audio.buffered.end(
            audio.buffered.length - 1 - i,
          );
          dispatch(setBuffered(bufferedLength));
          break;
        }
      }
    }
  };

  useEffect(() => {
    if (audioRef.current && isReady) {
      audioRef.current.volume = volume; // Adjust volume after user interaction
    }
  }, [isReady, volume]);

  useEffect(() => {
    if (activeSermon) {
      const audioElement = audioRef.current; // Create a local variable
      const playAudio = () => {
        if (audioElement) {
          // Add this check to ensure it's not null
          audioElement.play();
          dispatch(playPause(true));
        }
      };

      // Check if the audio can be played without violating autoplay policies
      if (audioElement?.paused) {
        audioElement.play().catch((error) => {
          if (error.name === "NotAllowedError") {
            audioElement?.addEventListener("play", playAudio);
          }
        });
      } else {
        dispatch(playPause(true));
      }

      return () => {
        if (audioElement) {
          audioElement.removeEventListener("play", playAudio); // Use the local variable
        }
      };
    }

    return () => {}; // Add an empty return function for when activeSermon is false
  }, [activeSermon, dispatch]);

  // Add ability to control play/pause from Redux state
  const togglePlayAndPause = useCallback(() => {
    if (!isReady) return;

    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }

    dispatch(playPause(isPlaying));

    // Update progress
    const currentTime = audioRef.current?.currentTime;
    if (currentTime) {
      dispatch(setCurrentProgress(currentTime));
    }
  }, [isReady, isPlaying, dispatch, audioRef]);

  useEffect(() => {
    togglePlayAndPause();
  }, [isPlaying, togglePlayAndPause]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = newCurrentProgress;
  }, [newCurrentProgress]);

  return (
    <>
      {activeSermon && (
        <audio
          ref={audioRef}
          preload="auto"
          onCanPlay={() => dispatch(setIsReady(true))}
          onDurationChange={(e) =>
            dispatch(setDuration(e.currentTarget.duration))
          }
          onPlaying={() => dispatch(playPause(true))}
          onPause={() => dispatch(playPause(false))}
          onEnded={() => dispatch(setActiveSermon(false))}
          onVolumeChange={(e) => dispatch(setVolume(e.currentTarget.volume))}
          onProgress={handleBufferProgress}
          onTimeUpdate={(e) => {
            dispatch(setCurrentProgress(e.currentTarget.currentTime));
            handleBufferProgress(e);
          }}
          onSeeking={(e) => {
            dispatch(setCurrentProgress(e.currentTarget.currentTime));
            handleBufferProgress(e);
          }} // add this
          onSeeked={(e) => {
            dispatch(setCurrentProgress(e.currentTarget.currentTime));
            handleBufferProgress(e);
          }} // add this
        >
          <source type="audio/mpeg" src={src} />
        </audio>
      )}
    </>
  );
}
