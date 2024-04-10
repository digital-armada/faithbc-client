'use client';
/* eslint-disable jsx-a11y/media-has-caption */
import paths from '@/lib/paths';
import React, { useRef, useEffect, useState } from 'react';

const Player = ({
    activeSermon,
    // isPlaying,
    volume,
    seekTime,
    onEnded,
    onTimeUpdate,
    onLoadedData,
    repeat,
}) => {
    const ref = useRef(null);

    // eslint-disable-next-line no-unused-expressions
    // if (ref.current) {
    //     if (isPlaying) {
    //         ref.current.play();
    //     } else {
    //         ref.current.pause();
    //     }
    // }

    useEffect(() => {
        ref.current.volume = volume;
    }, [volume]);
    // updates audio element only on seekTime change (and not on each rerender):
    useEffect(() => {
        ref.current.currentTime = seekTime;
    }, [seekTime]);

    // console.log(
    //       `${paths.serverUrl()}${
    //           activeSermon?.attributes?.audio?.data?.attributes?.url
    //       }`
    //   );

    return (
        <>
            <audio
                src={`${paths.serverUrl()}${
                    activeSermon?.attributes?.audio?.data?.attributes?.url
                }`}
                ref={ref}
                loop={repeat}
                onEnded={onEnded}
                onTimeUpdate={onTimeUpdate}
                onLoadedData={onLoadedData}
            />
        </>
    );
};

export default Player;
