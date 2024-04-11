import { IoIosArrowDown } from 'react-icons/io';
import AudioProgressBar from '../AudioPlayer/AudioProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentProgress } from '@/redux/features/playerSlice';

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
    return (
        <div className='relative h-screen w-full overflow-hidden '>
            {/* Blurry glassy background */}
            <div className='absolute inset-0 bg-gradient-to-r from-gray-700 to-black'></div>
            {/* HEADER */}
            <div className='p-8 absolute h-screen inset-0 flex flex-col justify-between text-white'>
                <div className='flex-none text-center h-10'>
                    <IoIosArrowDown
                        className='cursor-pointer text-white text-2xl'
                        onClick={toggleMiniPlayer}
                    />
                    {/* <h1 className='text-4xl font-bold'>Hello, World!</h1> */}
                </div>
                {/* IMAGE */}
                <div className='px-8 text-center mt-10'>
                    <img
                        src={activeSermon?.attributes?.imageUrl}
                        className='w-full rounded-md'
                    />
                </div>
                {/* CONTROLS */}
                <div className='flex-auto px-8 mt-10 text-center space-y-8'>
                    <h1 className='text-4xl font-bold'>
                        {activeSermon?.attributes?.name}
                    </h1>
                    <h2 className='font-light'>
                        {
                            activeSermon?.attributes?.speaker?.data?.attributes
                                ?.speaker
                        }
                    </h2>
                    <AudioProgressBar
                        audioRef={audioRef}
                        duration={duration}
                        currentTime={currentProgress}
                        // onProgressChange={newTime => {
                        //     console.log(newTime);
                        //     dispatch(setCurrentProgress(newTime));
                        // }}
                    />
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
