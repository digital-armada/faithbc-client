'use client';
import React, { use, useEffect, useState } from 'react';
import { playPause } from '@/redux/features/playerSlice';

import AudioPlayer from '@/components/AudioPlayer/index';
import { MdPlayArrow, MdPause } from 'react-icons/md';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import MiniPlayer from './MiniPlayer';

export default function DesktopAudioWrapper() {
    const [miniOut, SetMiniOut] = useState(false);
    console.log(miniOut);
    const { activeSermon, isPlaying, isActive } = useSelector(
        state => state.player
    );
    const dispatch = useDispatch();

    const togglePlayPause = () => {
        //  if (!isReady) return;

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
                    className='hidden md:inline-block fixed sm:h-auto bottom-0 left-0 right-0 bg-[#212121] z-40'
                    initial={{ y: '100%' }}
                    animate={{ y: isActive ? 0 : '100%' }}
                    exit={{ y: '100%' }}>
                    <AudioPlayer
                        key={activeSermon?.id}
                        activeSermon={activeSermon}
                        isPlaying={isPlaying}
                        isActive={isActive}
                    />
                </motion.div>
            )}
            <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`fixed md:hidden sm:h-auto bottom-0 left-0 right-0 w-full z-40 ${
                    isActive ? 'mb-1' : 'mb-0'
                } rounded-sm p-2 mx-auto cursor-pointer`}
                onClick={toggleMiniPlayer}
                initial={{
                    y: miniOut ? '0%' : '100%',
                }}
                animate={{ y: isActive && miniOut ? '100%' : '0%' }}
                exit={{ y: '100%' }}>
                <MiniPlayer
                    activeSermon={activeSermon}
                    isPlaying={isPlaying}
                    togglePlayPause={togglePlayPause}
                />
            </motion.div>
        </AnimatePresence>
    );
}
