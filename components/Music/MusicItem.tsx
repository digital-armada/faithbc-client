'use client';
import { useDispatch } from 'react-redux';
import { playPause, setActiveSermon } from '@/redux/features/playerSlice';
import PlayPause from './PlayPause';

export const MusicItem = ({
    sermon,
    isPlaying,
    activeSermon,
    data,
    isActive,
}) => {
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
