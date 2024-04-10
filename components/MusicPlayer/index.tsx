'use client';
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//     nextSermon,
//     prevSermon,
//     playPause,
// } from '@/redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';
import paths from '@/lib/paths';
import TrackTime from './TrackTime';

const MusicPlayer = () => {
    // const { activeSermon, currentSermons, currentIndex, isActive, isPlaying } =
    //     useSelector(state => state.player);
    // console.log(activeSermon);
    // const [duration, setDuration] = useState(0);
    const [seekTime, setSeekTime] = useState(0);
    const [appTime, setAppTime] = useState(0);
    // const [volume, setVolume] = useState(1);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);

    const dispatch = useDispatch();

    // console.log(appTime);

    useEffect(() => {
        if (currentSermons.length) dispatch(playPause(true));
    }, [currentIndex]);

    const handlePlayPause = () => {
        if (!isActive) return;

        if (isPlaying) {
            dispatch(playPause(false));
        } else {
            dispatch(playPause(true));
        }
    };

    const handleNextSermon = () => {
        dispatch(playPause(false));

        if (!shuffle) {
            dispatch(nextSermon((currentIndex + 1) % currentSermons.length));
        } else {
            dispatch(
                nextSermon(Math.floor(Math.random() * currentSermons.length))
            );
        }
    };

    const handlePrevSermon = () => {
        if (currentIndex === 0) {
            dispatch(prevSermon(currentSermons.length - 1));
        } else if (shuffle) {
            dispatch(
                prevSermon(Math.floor(Math.random() * currentSermons.length))
            );
        } else {
            dispatch(prevSermon(currentIndex - 1));
        }
    };

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value);
        setVolume(newValue); // Assuming `setVolume` updates the state for `value`
    };

    return (
        <>
            <div className='flex flex-col items-center w-full '>
                <div className='items-center block w-full space-y-8 sm:flex sm:mx-auto sm:flex-row sm:space-y-0 sm:pt-4 sm:max-w-7xl justify-between'>
                    <div className='sm:flex-auto '>
                        <Track
                            isPlaying={isPlaying}
                            isActive={isActive}
                            activeSermon={activeSermon}
                        />
                    </div>
                    <div>
                        <Controls
                            isPlaying={isPlaying}
                            isActive={isActive}
                            repeat={repeat}
                            setRepeat={setRepeat}
                            shuffle={shuffle}
                            setShuffle={setShuffle}
                            currentSermons={currentSermons}
                            handlePlayPause={handlePlayPause}
                            handlePrevSermon={handlePrevSermon}
                            handleNextSermon={handleNextSermon}
                            setSeekTime={setSeekTime}
                            appTime={appTime}
                        />
                        <TrackTime value={appTime} max={duration}>
                            <Seekbar
                                value={appTime}
                                min='0'
                                max={duration}
                                onInput={event =>
                                    setSeekTime(event.target.value)
                                }
                                onSeekChange={newTime => setSeekTime(newTime)}
                            />
                        </TrackTime>
                    </div>
                    <div className='flex flex-col items-center flex-auto sm:w-1/5 '>
                        <div className=''>
                            <VolumeBar
                                value={volume}
                                min='0'
                                max='1'
                                onChange={handleSliderChange}
                                setVolume={setVolume}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
            <Player
                activeSermon={activeSermon}
                volume={volume}
                isPlaying={isPlaying}
                seekTime={seekTime}
                repeat={repeat}
                currentIndex={currentIndex}
                onEnded={handleNextSermon}
                onTimeUpdate={event => setAppTime(event.target.currentTime)}
                onLoadedData={event => setDuration(event.target.duration)}
            />
        </>
    );
};

export default MusicPlayer;
