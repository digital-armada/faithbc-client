import paths from '@/lib/paths';
import Image from 'next/image';
import React from 'react';

const Track = ({ isPlaying, isActive, activeSermon }) => {
    return (
        <>
            <div className='py-8 sm:py-0 sm:flex'>
                {activeSermon?.attributes?.imageUrl ? (
                    <img
                        src={activeSermon?.attributes?.imageUrl}
                        alt='cover art'
                        className='object-cover w-24 h-24 mx-auto rounded-md sm:flex-initial sm:w-14 sm:h-14 sm:hidden lg:block'
                        width={500}
                        height={500}
                    />
                ) : (
                    <img
                        className='object-cover w-24 h-24 mx-auto rounded-full sm:flex-initial sm:w-14 sm:h-14 sm:hidden lg:block'
                        src='/profile.png'
                        alt=''
                    />
                )}
                <div className='px-2 text-center truncate sm:flex-1 sm:text-left sm:pl-2'>
                    <p className='font-bold text-white truncate sm:text-md '>
                        {activeSermon?.attributes?.name
                            ? activeSermon?.attributes?.name
                            : 'No active Song'}
                    </p>
                    <p className='text-gray-300 truncate sm:text-xs'>
                        {activeSermon?.attributes?.speaker?.data?.attributes
                            ?.speaker
                            ? activeSermon?.attributes?.speaker?.data
                                  ?.attributes?.speaker
                            : 'No active Song'}
                    </p>
                </div>
            </div>
        </>
    );
};

export default Track;
