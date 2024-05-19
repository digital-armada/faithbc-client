'use client';

import { formatDistance } from 'date-fns';
import { FaYoutube } from 'react-icons/fa';
import { IoMdBook, IoMdDownload, IoMdMicrophone } from 'react-icons/io';
import { MusicItem } from '../Music/MusicItem';
import { useSelector } from 'react-redux';
import { IoTodayOutline } from 'react-icons/io5';
import Image from 'next/image';

export default function SermonItem({ sermon }) {
    const { activeSermon, isPlaying } = useSelector(state => state.player);
    console.log(sermon);
    return (
        // CONTAINER
        <div key={sermon.id} className=' text-gray-700 sm:flex py-8'>
            {/* IMAGE */}

            {sermon?.attributes?.imageUrl ? (
                <Image
                    src={sermon?.attributes?.imageUrl}
                    className='w-full pb-4 sm:pb-0 sm:w-48 object-contain'
                    width={1000}
                    height={1000}
                    alt=''
                />
            ) : (
                <Image
                    src={
                        sermon?.attributes?.youtube
                            ? `https://i.ytimg.com/vi/${
                                  sermon?.attributes?.youtube.split('=')[1]
                              }/0.jpg`
                            : ''
                    }
                    className='w-full pb-4 sm:pb-0 sm:w-48 object-contain'
                    width={1000}
                    height={1000}
                    alt=''
                />
            )}

            {/* CONTENT */}
            <div className='w-full px-0 sm:px-4 flex flex-col justify-between'>
                {/* TOP PART */}
                <div>
                    <div className='flex items-center justify-between gap-2'>
                        <div className='font-body text-2xl font-semibold'>
                            {sermon?.attributes?.name}
                        </div>
                        <MusicItem
                            key={sermon.id}
                            sermon={sermon}
                            isPlaying={isPlaying}
                            activeSermon={activeSermon}
                            data={sermon}
                        />
                    </div>
                    <div className='flex flex-col sm:flex-row gap-2 text-[11px] flex-wrap'>
                        {sermon?.attributes?.speaker?.data?.attributes
                            ?.speaker && (
                            <div className='flex items-center gap-1'>
                                <IoMdMicrophone />

                                {
                                    sermon?.attributes?.speaker?.data
                                        ?.attributes?.speaker
                                }
                            </div>
                        )}
                        {sermon?.attributes?.service_type && (
                            <>
                                <span className='hidden sm:inline-block'>
                                    &bull;
                                </span>
                                <div className='flex items-center gap-1'>
                                    <IoTodayOutline />
                                    {sermon?.attributes?.service_type}
                                </div>
                            </>
                        )}
                        {sermon?.attributes?.verse && (
                            <>
                                <span className='hidden sm:inline-block'>
                                    &bull;
                                </span>
                                <div className='flex items-center gap-1'>
                                    <IoMdBook />
                                    {sermon?.attributes?.verse}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                {/* BOTTOM PART */}
                <div>
                    <hr className='border-t-[1px] border-gray-500/20 my-2' />
                    <div className='flex justify-between text-[12px] items-center'>
                        <div className='flex items-center space-x-6'>
                            {sermon?.attributes?.youtube && (
                                <div>
                                    <a
                                        className='flex gap-2 items-center'
                                        target='_blank'
                                        href={sermon?.attributes?.youtube}>
                                        <FaYoutube className='text-red-700' />
                                        <span>Watch</span>
                                        {/* <RiExternalLinkLine /> */}
                                    </a>
                                </div>
                            )}
                            <button
                                onClick={() =>
                                    handleDownload(
                                        process.env.NEXT_PUBLIC_URL +
                                            sermon?.attributes?.audio?.data
                                                ?.attributes?.url
                                    )
                                }
                                className='flex items-center gap-2'>
                                <IoMdDownload /> Download
                            </button>
                        </div>
                        <div>
                            {formatDistance(
                                new Date(sermon?.attributes?.date),
                                new Date(),
                                { addSuffix: true }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
