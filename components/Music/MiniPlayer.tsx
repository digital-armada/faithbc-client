import React from 'react';
import { MdPlayArrow, MdPause } from 'react-icons/md';
import { CgSpinner } from 'react-icons/cg';
import IconButton from '@/components/AudioPlayer/IconButton';

export default function MiniPlayer({
    activeSermon,
    isPlaying,
    togglePlayPause,
}) {
    return (
        <div className='bg-slate-900 text-slate-400 p-2 rounded-md'>
            <div className='flex items-center justify-between'>
                <p className='text-xs truncate'>
                    {activeSermon?.attributes?.name ?? 'Select a sermon'}
                </p>
                <div className='flex gap-2'>
                    <IconButton
                        disabled={!activeSermon}
                        onClick={togglePlayPause}
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                        size='sm'>
                        {!activeSermon ? null : isPlaying ? (
                            <MdPause size={20} />
                        ) : (
                            <MdPlayArrow size={20} />
                        )}
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
