'use client';
import { FaPauseCircle, FaPlay, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({
    isPlaying,
    activeSermon,
    sermon,
    handlePause,
    handlePlay,
}) => {
    return (
        <>
            <div className='flex items-center gap-2 cursor-pointer'>
                {isPlaying &&
                activeSermon?.attributes?.name === sermon?.attributes?.name ? (
                    <FaPauseCircle
                        className='text-gray-600 text-2xl'
                        onClick={handlePause}
                    />
                ) : (
                    <FaPlayCircle
                        onClick={handlePlay}
                        className='text-gray-600 text-2xl'
                    />
                )}
            </div>
        </>
    );
};

export default PlayPause;
