'use client';
import {
    setCurrentProgress,
    setNewCurrentProgress,
} from '@/redux/features/playerSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface ProgressCSSProps extends React.CSSProperties {
    '--progress-width': number;
    '--buffered-width': number;
}

export default function AudioProgressBar() {
    const { duration, currentProgress, buffered } = useSelector(
        state => state.player
    );
    const dispatch = useDispatch();
    const progressBarWidth = isNaN(currentProgress / duration)
        ? 0
        : currentProgress / duration;
    const bufferedWidth = isNaN(buffered / duration) ? 0 : buffered / duration;

    const progressStyles: ProgressCSSProps = {
        '--progress-width': progressBarWidth,
        '--buffered-width': bufferedWidth,
    };

    const handleProgressChange = e => {
        const newTime = e.currentTarget.valueAsNumber;
        dispatch(setNewCurrentProgress(newTime));
    };

    return (
        <div className='absolute h-1 -top-[4px] left-0 right-0 group'>
            <input
                type='range'
                name='progress'
                className={`progress-bar absolute inset-0 w-full m-0 h-full bg-transparent appearance-none cursor-pointer dark:bg-gray-700 group-hover:h-2 transition-all accent-sky-600 hover:accent-sky-600 before:absolute before:inset-0 before:h-full before:w-full before:bg-sky-600 before:origin-left after:absolute after:h-full after:w-full after:bg-sky-600/50`}
                style={progressStyles}
                min={0}
                max={duration}
                value={currentProgress}
                onChange={handleProgressChange}
            />
        </div>
    );
}
