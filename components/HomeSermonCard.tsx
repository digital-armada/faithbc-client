'use client';
import { useSelector } from 'react-redux';
import { formatDistance, parseISO } from 'date-fns';
import { FaPlay } from 'react-icons/fa6';
import { MusicItem } from '@/components/Music/MusicItem';

export default function HomeSermonCard({ sermon }) {
    const { activeSermon, isPlaying, isActive } = useSelector(
        state => state.player
    );
    console.log(isActive);
    return (
        <div className=' rounded-md px-3 py-2 flex justify-between items-center'>
            <div className='flex gap-2'>
                {sermon?.attributes?.imageUrl ? (
                    <img
                        src={sermon?.attributes?.imageUrl}
                        className='w-28 rounded-sm '
                    />
                ) : (
                    <img
                        src={`https://i.ytimg.com/vi/${sermon?.attributes?.youtube?.slice(
                            32
                        )}/0.jpg`}
                        className='w-28 rounded-sm '
                    />
                )}

                <div className='truncate'>
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
                            {/* <p>{sermon?.attributes?.service_type}</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
