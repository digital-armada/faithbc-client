import { IoIosArrowDown } from 'react-icons/io';
import AudioProgressBar from '../AudioPlayer/AudioProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentProgress } from '@/redux/features/playerSlice';
import { MusicItem } from './MusicItem';
import PlayAndPause from '../AudioPlayer/PlayAndPause';
import VolumeInput from '../AudioPlayer/VolumeInput';
import Image from 'next/image';

export default function MobilePlayer({
    toggleMiniPlayer,
    activeSermon,
    audioRef,
}) {
    const { duration, currentProgress } = useSelector(state => state.player);

    function formatDurationDisplay(duration: number) {
        const min = Math.floor(duration / 60);
        const sec = Math.floor(duration - min * 60);

        const formatted = [min, sec].map(n => (n < 10 ? '0' + n : n)).join(':');

        return formatted;
    }

    const durationDisplay = formatDurationDisplay(duration);
    const elapsedDisplay = formatDurationDisplay(currentProgress);
    return (
        <div className='relative h-screen w-full bg-gray-800 '>
            <div className='p-4 absolute inset-0 flex flex-col  text-white'>
                <div className='flex-none text-center h-10'>
                    <IoIosArrowDown
                        className='cursor-pointer text-white text-2xl'
                        onClick={toggleMiniPlayer}
                    />
                </div>

                {/* CONTROLS */}
                <div className='flex flex-col text-center  '>
                    {activeSermon?.attributes?.imageUrl ? (
                        <Image
                            src={activeSermon?.attributes?.imageUrl}
                            className='w-full rounded-md'
                            layout='responsive'
                            width={1920}
                            height={1080}
                            alt=''
                        />
                    ) : (
                        <Image
                            src={
                                activeSermon?.attributes?.youtube
                                    ? `https://i.ytimg.com/vi/${
                                          activeSermon?.attributes?.youtube.split(
                                              '='
                                          )[1]
                                      }/0.jpg`
                                    : ''
                            }
                            className='w-full rounded-md'
                            layout='responsive'
                            width={1920}
                            height={1080}
                            alt=''
                        />
                    )}

                    <h1 className='text-2xl font-bold mt-4'>
                        {activeSermon?.attributes?.name}
                    </h1>
                    <h2 className='font-light'>
                        {
                            activeSermon?.attributes?.speaker?.data?.attributes
                                ?.speaker
                        }
                    </h2>
                    <div className='flex flex-col gap-4  w-full h-full space-between'>
                        <div className='relative mt-10'>
                            <AudioProgressBar />
                            <div className='flex justify-between items-center mt-2 font-thin text-sm'>
                                <span> {elapsedDisplay}</span>
                                <span> {durationDisplay}</span>
                            </div>
                        </div>
                        <div className='mt-4 flex-col space-y-2 flex gap-4 items-center w-full'>
                            <PlayAndPause />
                            <VolumeInput />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
