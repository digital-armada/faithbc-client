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
    const { duration, currentProgress, buffered } = useSelector(
        state => state.player
    );
    const dispatch = useDispatch();
    // console.log(activeSermon);
    function formatDurationDisplay(duration: number) {
        const min = Math.floor(duration / 60);
        const sec = Math.floor(duration - min * 60);

        const formatted = [min, sec].map(n => (n < 10 ? '0' + n : n)).join(':');

        return formatted;
    }

    const durationDisplay = formatDurationDisplay(duration);
    const elapsedDisplay = formatDurationDisplay(currentProgress);
    return (
        <div className='relative h-screen w-full overflow-hidden '>
            {/* Blurry glassy background */}
            <div
                className='absolute inset-0 bg-gray-800
             '></div>
            {/* HEADER */}
            <div className='p-8 absolute h-screen inset-0 flex flex-col  text-white'>
                <div className='flex-none text-center h-10'>
                    <IoIosArrowDown
                        className='cursor-pointer text-white text-2xl'
                        onClick={toggleMiniPlayer}
                    />
                    {/* <h1 className='text-4xl font-bold'>Hello, World!</h1> */}
                </div>

                {/* CONTROLS */}
                <div className='flex flex-col px-8 mt-10 text-center  '>
                    <div>
                        <Image
                            src={activeSermon?.attributes?.imageUrl}
                            className='w-full rounded-md'
                            layout='responsive'
                            width={1920}
                            height={1080}
                            alt=''
                        />

                        <h1 className='text-4xl font-bold mt-10'>
                            {activeSermon?.attributes?.name}
                        </h1>
                        <h2 className='font-light'>
                            {
                                activeSermon?.attributes?.speaker?.data
                                    ?.attributes?.speaker
                            }
                        </h2>
                    </div>
                    <div className='flex flex-col gap-4  w-full h-full space-between'>
                        <div className='relative mt-10'>
                            <AudioProgressBar />
                            <div className='flex justify-between items-center mt-4 font-thin text-sm'>
                                <span> {elapsedDisplay}</span>
                                <span> {durationDisplay}</span>
                            </div>
                        </div>
                        <div className='mt-10 space-y-10 flex flex-col gap-4 items-center w-full'>
                            <PlayAndPause />
                            <VolumeInput />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// import { IoIosArrowDown } from 'react-icons/io';
//
// export default function MobilePlayer({ toggleMiniPlayer, activeSermon }) {
//     console.log(activeSermon);
//     return (
//         <div className='h-screen w-full bg-transparent blur-2xl'>
//             {/* <IoIosArrowDown
//                 className='cursor-pointer text-white'
//                 onClick={toggleMiniPlayer}
//             />
//             <div className=' inset-0 h-3/4 w-full'>
//                 <img
//                     src={activeSermon?.attributes?.imageUrl ?? ''}
//                     alt='Background Image'
//                     className=' w-[300px]  object-cover'
//                 />
//             </div> */}
//         </div>
//     );
// }
//
// {
//     /* Background image */
// }
//
// {
//     /* Black container with gradient */
// }
// <div className='absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent'></div>;
// {
//     /* Content */
// }
// <div className='absolute bottom-0 left-0 w-full h-1/4 flex items-center justify-center text-white'>
//     <div className='text-center'>
//         <h1 className='text-4xl font-bold'>Hello, World!</h1>
//     </div>
// </div>;
