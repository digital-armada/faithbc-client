'use client';
import { useSelector } from 'react-redux';
import { formatDistance, parseISO } from 'date-fns';
import { FaPlay } from 'react-icons/fa6';
import { MusicItem } from '@/components/Music/MusicItem';
import Image from 'next/image';

export default function HomeSermonCard({ sermon }) {
    const { activeSermon, isPlaying, isActive } = useSelector(
        state => state.player
    );

    return (
        <div className=' col-span-1 py-2 '>
            {sermon?.attributes?.imageUrl ? (
                <Image
                    src={sermon?.attributes?.imageUrl}
                    width={400}
                    height={130}
                    className='w-full md:h-[130.5px] object-cover rounded-sm'
                    alt=''
                />
            ) : (
                <Image
                    src={`https://i.ytimg.com/vi/${sermon?.attributes?.youtube?.slice(
                        32
                    )}/0.jpg`}
                    width={112}
                    height={63}
                    className='w-28 rounded-sm'
                    alt=''
                />
            )}
            {/* <hr className='border-gray-600' /> */}

            <div className='mt-2'>
                <p className='truncate'>{sermon?.attributes?.name}</p>
                <div className='flex items-center gap-2'>
                    <MusicItem
                        key={sermon.id}
                        sermon={sermon}
                        isPlaying={isPlaying}
                        activeSermon={activeSermon}
                        data={sermon}
                        isActive={isActive}
                    />
                    <div className='flex text-[10px] items-center gap-4'>
                        <p className='italic'>
                            {formatDistance(
                                new Date(sermon?.attributes?.date),
                                new Date(),
                                { addSuffix: true }
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
