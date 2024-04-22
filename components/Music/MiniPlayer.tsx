import React from 'react';
import { MdPlayArrow, MdPause } from 'react-icons/md';
import { CgSpinner } from 'react-icons/cg';
import IconButton from '@/components/AudioPlayer/IconButton';
import AudioProgressBar from '../AudioPlayer/AudioProgressBar';
import Image from 'next/image';

export default function MiniPlayer({
    activeSermon,
    isPlaying,
    togglePlayPause,
}) {
    return (
        <div className='bg-gray-800 text-gray-300 rounded-md max-w-md mx-auto '>
            <div className='flex items-center justify-between px-3 py-2 '>
                {/* <div className='flex items-center gap-4'> */}
                <Image
                    src={activeSermon?.attributes?.imageUrl}
                    className=' size-10 object-cover rounded-md'
                    width={40}
                    height={40}
                    alt=''
                />
                <div className='w-3/4'>
                    <p className='font-body truncate '>
                        {activeSermon?.attributes?.name ?? 'Select a sermon'}
                    </p>
                    <p className='text-[10px] truncate'>
                        {activeSermon?.attributes?.speaker?.data?.attributes
                            ?.speaker ?? ''}
                    </p>
                </div>
                {/* </div> */}
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
