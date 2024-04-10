'use client';
import React, { use, useEffect, useState } from 'react';

import AudioPlayer from '@/components/AudioPlayer/index';
import { MdPlayArrow, MdPause } from 'react-icons/md';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';

import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

// import { songs } from './songs';

export default function AudioWrapper() {
    const { activeSermon, isPlaying, isActive } = useSelector(
        state => state.player
    );

    // const [currentSongIndex, setCurrentSongIndex] = React.useState(-1);

    // const currentSong = songs[currentSongIndex];

    return (
        <div className='flex flex-col h-full bg-slate-800 text-slate-300'>
            <div className='fixed sm:h-auto bottom-0 left-0 right-0 bg-[#212121] z-40'>
                <AudioPlayer
                    key={activeSermon?.id}
                    activeSermon={activeSermon}
                    isPlaying={isPlaying}
                    isActive={isActive}
                    // songCount={songs.length}
                    // songIndex={currentSongIndex}
                    // onNext={() => setCurrentSongIndex(i => i + 1)}
                    // onPrev={() => setCurrentSongIndex(i => i - 1)}
                />
            </div>
        </div>
    );
}
