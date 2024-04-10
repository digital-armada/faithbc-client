import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import {
    BsArrowRepeat,
    BsFillPauseFill,
    BsFillPlayFill,
    BsFillSkipBackwardFill,
    BsFillSkipForwardFill,
    BsShuffle,
} from 'react-icons/bs';
import {
    IoMdPause,
    IoMdPlay,
    IoMdSkipBackward,
    IoMdSkipForward,
} from 'react-icons/io';
import { RiForward5Line, RiReplay5Fill } from 'react-icons/ri';

const Controls = ({
    isPlaying,
    repeat,
    setRepeat,
    shuffle,
    setShuffle,
    currentSongs,
    handlePlayPause,
    handlePrevSong,
    handleNextSong,
    setSeekTime,
    appTime,
}) => (
    // <div className='flex items-center justify-between w-full sm:basis-1/2'>
    <div className='flex items-center justify-center w-full gap-10'>
        <button
            type='button'
            onClick={() => setSeekTime(appTime - 5)}
            className='text-white lg:mr-4'>
            {/* <IoMdSkipBackward /> */}
            <RiReplay5Fill className='size-6' />
        </button>
        {/* <BsArrowRepeat
            size={20}
            color={repeat ? 'red' : 'white'}
            onClick={() => setRepeat(prev => !prev)}
            className='hidden cursor-pointer sm:block'
        /> */}
        {/* {currentSongs?.length && (
            <MdSkipPrevious
                size={30}
                color='#FFF'
                className='cursor-pointer'
                onClick={handlePrevSong}
            />
        )} */}
        {isPlaying ? (
            <IoMdPause
                size={30}
                color='#FFF'
                onClick={handlePlayPause}
                className='cursor-pointer'
            />
        ) : (
            <IoMdPlay
                size={30}
                color='#FFF'
                onClick={handlePlayPause}
                className='cursor-pointer'
            />
        )}
        {/* {currentSongs?.length && (
            <MdSkipNext
                size={30}
                color='#FFF'
                className='cursor-pointer'
                onClick={handleNextSong}
            />
        )} */}
        {/* <BsShuffle
            size={20}
            color={shuffle ? 'red' : 'white'}
            onClick={() => setShuffle(prev => !prev)}
            className='hidden cursor-pointer sm:block'
        /> */}
        <button
            type='button'
            onClick={() => setSeekTime(appTime + 5)}
            className='text-white lg:ml-4'>
            {/* <IoMdSkipForward /> */}
            <RiForward5Line className='size-6' />
        </button>
    </div>
    // </div>
);

export default Controls;
