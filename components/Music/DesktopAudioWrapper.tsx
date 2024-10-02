"use client";
import React, { use, useEffect, useState } from "react";
import { playPause } from "@/redux/features/playerSlice";

import AudioPlayer from "@/components/AudioPlayer/index";
import { MdPlayArrow, MdPause } from "react-icons/md";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import MiniPlayer from "./MiniPlayer";
import MobilePlayer from "./MobilePlayer";
import { useAppSelector } from "@/hooks/useRedux";

export default function DesktopAudioWrapper() {
  const [miniOut, SetMiniOut] = useState(false);
  const { activeSermon, isPlaying, isActive } = useAppSelector(
    (state) => state.player,
  );

  const dispatch = useDispatch();

  const togglePlayPause = (e) => {
    e.stopPropagation();

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const toggleMiniPlayer = () => {
    SetMiniOut(!miniOut);
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="one"
          className="fixed bottom-0 left-0 right-0 z-40 hidden bg-[#212121] sm:h-auto md:inline-block"
          initial={{ y: "100%" }}
          animate={{ y: isActive ? 0 : "100%" }}
          transition={{
            y: { duration: 0.5, ease: "easeInOut" }, // Adjust the duration here
          }}
          exit={{
            y: "100%", // You can customize the exit animation here
          }}
        >
          {activeSermon && (
            <AudioPlayer key={activeSermon?.id} activeSermon={activeSermon} />
          )}
        </motion.div>
      )}
      <motion.div
        key="two"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`fixed bottom-0 left-0 right-0 z-40 w-full sm:h-auto md:hidden ${
          isActive ? "mb-1" : "mb-0"
        } mx-auto cursor-pointer rounded-sm p-2`}
        onClick={toggleMiniPlayer}
        initial={{ y: "100%" }}
        animate={{ y: isActive && miniOut == false ? 0 : "100%" }}
        transition={{
          y: miniOut == false ? { delay: 0.5 } : { delay: 0 },
        }}
        exit={{ y: "100%" }}
      >
        <MiniPlayer
          activeSermon={activeSermon}
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
        />
      </motion.div>
      <motion.div
        key="three"
        className="fixed bottom-0 left-0 right-0 top-0 md:hidden"
        initial={{ y: "100%" }}
        animate={{ y: isActive && miniOut == true ? 0 : "100%" }}
        exit={{ y: "100%" }}
        transition={{
          y:
            miniOut == true
              ? { delay: 0.3, ease: "easeInOut", duration: 0.3 }
              : { delay: 0, ease: "easeInOut", duration: 0.2 },
        }}
      >
        <MobilePlayer
          activeSermon={activeSermon}
          toggleMiniPlayer={toggleMiniPlayer}
        />
      </motion.div>
    </AnimatePresence>
  );
}
