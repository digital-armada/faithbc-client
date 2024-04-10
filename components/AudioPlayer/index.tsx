'use client';
import React, { useState, useEffect } from 'react';
import paths from '@/lib/paths';

import { useSelector, useDispatch } from 'react-redux';
import {
    nextSermon,
    prevSermon,
    playPause,
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

function formatDurationDisplay(duration: number) {
    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration - min * 60);

    const formatted = [min, sec].map(n => (n < 10 ? '0' + n : n)).join(':');

    return formatted;
}

// interface AudioPlayerProps {
//     currentSong?: { title: string; src: string };
//     songIndex: number;
//     songCount: number;
//     onNext: () => void;
//     onPrev: () => void;
// }

// export default function AudioPlayer({
//     currentSong,
//     songCount,
//     songIndex,
//     onNext,
//     onPrev,
// }: AudioPlayerProps) {
export default function AudioPlayer({ activeSermon, isActive, isPlaying }) {
    const audioRef = React.useRef<HTMLAudioElement | null>(null);
    const [duration, setDuration] = React.useState(0);
    const [volume, setVolume] = React.useState(1);
    const [isReady, setIsReady] = React.useState(false);
    const [currentProgress, setCurrentProgress] = React.useState(0);
    const [buffered, setBuffered] = React.useState(0);

    const dispatch = useDispatch();

    const durationDisplay = formatDurationDisplay(duration);
    const elapsedDisplay = formatDurationDisplay(currentProgress);
    console.log(activeSermon);
    console.log(duration);
    console.log(currentProgress);

    useEffect(() => {
        console.log('hit');
        if (activeSermon) {
            const playAudio = () => {
                audioRef.current?.play();
                dispatch(playPause(true));
            };

            // Check if the audio can be played without violating autoplay policies
            if (audioRef.current?.paused) {
                audioRef.current?.play().catch(error => {
                    // If autoplay is not allowed, attempt to play the audio on user interaction
                    if (error.name === 'NotAllowedError') {
                        audioRef.current?.addEventListener('play', playAudio);
                    }
                });
            } else {
                // If the audio is already playing, dispatch playPause(true)
                dispatch(playPause(true));
            }

            return () => {
                audioRef.current?.removeEventListener('play', playAudio);
            };
        }
    }, [activeSermon, dispatch]);
    //
    //     useEffect(() => {
    //         audioRef.current?.pause();
    //
    //         const timeout = setTimeout(() => {
    //             audioRef.current?.play();
    //         }, 500);
    //
    //         return () => {
    //             clearTimeout(timeout);
    //         };
    //     }, [activeSermon]);

    const handleNext = () => {
        onNext();
    };

    const handlePrev = () => {
        onPrev();
    };

    const togglePlayPause = () => {
        if (!isReady) return;

        if (isPlaying) {
            audioRef.current?.pause();
            dispatch(playPause(false));
        } else {
            audioRef.current?.play();
            dispatch(playPause(true));
        }
    };

    //     const togglePlayPause = () => {
    // if (!isReady) return; // Do nothing if audio is not ready
    //
    //         if (isPlaying) {
    //             audioRef.current?.pause();
    //             setIsPlaying(false);
    //         } else {
    //             audioRef.current?.play();
    //             setIsPlaying(true);
    //         }
    //     };

    const handleBufferProgress: React.ReactEventHandler<
        HTMLAudioElement
    > = e => {
        const audio = e.currentTarget;
        const dur = audio.duration;
        if (dur > 0) {
            for (let i = 0; i < audio.buffered.length; i++) {
                if (
                    audio.buffered.start(audio.buffered.length - 1 - i) <
                    audio.currentTime
                ) {
                    const bufferedLength = audio.buffered.end(
                        audio.buffered.length - 1 - i
                    );
                    setBuffered(bufferedLength);
                    break;
                }
            }
        }
    };

    const handleMuteUnmute = () => {
        if (!audioRef.current) return;

        if (audioRef.current.volume !== 0) {
            audioRef.current.volume = 0;
        } else {
            audioRef.current.volume = 1;
        }
    };

    const handleVolumeChange = (volumeValue: number) => {
        if (!audioRef.current) return;
        audioRef.current.volume = volumeValue;
        setVolume(volumeValue);
    };
    useEffect(() => {
        if (audioRef.current && isReady) {
            audioRef.current.volume = volume; // Adjust volume after user interaction
        }
    }, [isReady, volume]);

    return (
        <div className='bg-slate-900 text-slate-400 p-3 relative'>
            {activeSermon && (
                <audio
                    ref={audioRef}
                    preload='metadata'
                    onDurationChange={e =>
                        setDuration(e.currentTarget.duration)
                    }
                    onPlaying={() => dispatch(playPause(true))}
                    onPause={() => dispatch(playPause(false))}
                    // onEnded={handleNext}
                    onCanPlay={e => {
                        setIsReady(true);
                    }}
                    onTimeUpdate={e => {
                        // console.log(e.currentTarget.volume);

                        setCurrentProgress(e.currentTarget.currentTime);
                        handleBufferProgress(e);
                    }}
                    onProgress={handleBufferProgress}
                    onVolumeChange={e => setVolume(e.currentTarget.volume)}>
                    <source
                        type='audio/mpeg'
                        src={`${paths.serverUrl()}${
                            activeSermon?.attributes?.audio?.data?.attributes
                                ?.url
                        }`}
                    />
                </audio>
            )}
            <AudioProgressBar
                duration={duration}
                currentProgress={currentProgress}
                buffered={buffered}
                onChange={e => {
                    if (!audioRef.current) return;

                    audioRef.current.currentTime =
                        e.currentTarget.valueAsNumber;

                    setCurrentProgress(e.currentTarget.valueAsNumber);
                }}
            />

            <div className='flex flex-col items-center justify-center'>
                <div className='text-center mb-1'>
                    <p className='text-slate-300 font-bold'>
                        {activeSermon?.attributes?.name ?? 'Select a sermon'}
                    </p>
                    <p className='text-xs'>Singer Name</p>
                </div>
            </div>
            <div className='grid grid-cols-3 items-center mt-4'>
                <span className='text-xs'>
                    {elapsedDisplay} / {durationDisplay}
                </span>
                <div className='flex items-center gap-4 justify-self-center'>
                    {/* <IconButton
                        onClick={handlePrev}
                        disabled={songIndex === 0}
                        aria-label='go to previous'
                        intent='secondary'>
                        <MdSkipPrevious size={24} />
                    </IconButton> */}
                    <IconButton
                        disabled={!isReady}
                        onClick={() => togglePlayPause()}
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                        size='lg'>
                        {!isReady && activeSermon?.id ? (
                            <CgSpinner size={24} className='animate-spin' />
                        ) : isPlaying ? (
                            <MdPause size={30} />
                        ) : (
                            <MdPlayArrow size={30} />
                        )}
                    </IconButton>

                    {/* <IconButton
                        onClick={handleNext}
                        disabled={songIndex === songCount - 1}
                        aria-label='go to next'
                        intent='secondary'>
                        <MdSkipNext size={24} />
                    </IconButton> */}
                </div>

                <div className='flex gap-3 items-center justify-self-end'>
                    <IconButton
                        intent='secondary'
                        size='sm'
                        onClick={handleMuteUnmute}
                        aria-label={volume === 0 ? 'unmute' : 'mute'}>
                        {volume === 0 ? (
                            <MdVolumeOff size={20} />
                        ) : (
                            <MdVolumeUp size={20} />
                        )}
                    </IconButton>
                    <VolumeInput
                        volume={volume}
                        onVolumeChange={handleVolumeChange}
                    />
                </div>
            </div>
        </div>
    );
}
