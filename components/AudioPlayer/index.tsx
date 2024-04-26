'use client';
import React, { useState, useEffect } from 'react';
import paths from '@/lib/paths';

import { useSelector, useDispatch } from 'react-redux';
import {
    nextSermon,
    prevSermon,
    playPause,
    setActiveSermon,
    setCurrentProgress,
    setBuffered,
    setDuration,
} from '@/redux/features/playerSlice';
import {
    MdPlayArrow,
    MdPause,
    MdSkipNext,
    MdSkipPrevious,
    MdVolumeUp,
    MdVolumeOff,
} from 'react-icons/md';
import { CgSpinner } from 'react-icons/cg';
import IconButton from '@/components/AudioPlayer/IconButton';
import AudioProgressBar from '@/components/AudioPlayer/AudioProgressBar';
import VolumeInput from '@/components/AudioPlayer/VolumeInput';
import { set } from 'date-fns';
import Audio from './Audio';
import PlayAndPause from './PlayAndPause';
import Image from 'next/image';

function formatDurationDisplay(duration: number) {
    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration - min * 60);

    const formatted = [min, sec].map(n => (n < 10 ? '0' + n : n)).join(':');

    return formatted;
}

export default function AudioPlayer() {
    const {
        duration,
        currentProgress,
        buffered,
        isReady,
        volume,
        activeSermon,
    } = useSelector(state => state.player);

    const dispatch = useDispatch();

    const durationDisplay = formatDurationDisplay(duration);
    const elapsedDisplay = formatDurationDisplay(currentProgress);

    return (
        <div className='bg-gray-800 text-gray-400 p-3 relative'>
            <Audio
                activeSermon={activeSermon}
                src={`${paths.serverUrl()}${
                    activeSermon?.attributes?.audio?.data?.attributes?.url
                }`}
            />
            <AudioProgressBar />

            <div className='grid grid-cols-3 mt-2'>
                <div className='flex'>
                    {activeSermon?.attributes?.imageUrl ? (
                        <Image
                            src={activeSermon?.attributes?.imageUrl}
                            className='size-14 object-cover rounded-md'
                            width={56}
                            height={56}
                            alt=''
                        />
                    ) : (
                        <Image
                            src={
                                activeSermon?.attributes?.youtube
                                    ? `https://i.ytimg.com/vi/${
                                          activeSermon?.attributes?.youtube.split(
                                              '='
                                          )[1]
                                      }/0.jpg`
                                    : ''
                            }
                            className='size-14 object-cover rounded-md'
                            width={56}
                            height={56}
                            alt=''
                        />
                    )}

                    <div className='mb-1 items-center ml-4 min-w-[183px]'>
                        {activeSermon?.attributes?.name && (
                            <p className='text-slate-300 font-bold truncate'>
                                {activeSermon?.attributes?.name}
                            </p>
                        )}
                        {activeSermon?.attributes?.speaker?.data?.attributes
                            ?.speaker && (
                            <p className='text-xs'>
                                {
                                    activeSermon?.attributes?.speaker?.data
                                        ?.attributes?.speaker
                                }
                            </p>
                        )}
                    </div>
                </div>
                <div className='text-xs flex gap-4 items-center justify-center'>
                    {elapsedDisplay} <PlayAndPause />
                    {durationDisplay}
                </div>
                <div className='flex items-center gap-4 justify-self-center'>
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
