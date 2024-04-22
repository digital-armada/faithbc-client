import { useDispatch, useSelector } from 'react-redux';
import IconButton from './IconButton';
import { CgSpinner } from 'react-icons/cg';
import { MdPause, MdPlayArrow } from 'react-icons/md';
import { playPause } from '@/redux/features/playerSlice';

export default function PlayAndPause() {
    const { activeSermon, isPlaying, isReady } = useSelector(
        state => state.player
    );
    const dispatch = useDispatch();
    return (
        <IconButton
            disabled={!isReady}
            onClick={() => {
                dispatch(playPause(!isPlaying));
            }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            size='lg'>
            {!isReady && activeSermon?.id ? (
                <CgSpinner size={24} className='animate-spin' />
            ) : isPlaying ? (
                <MdPause size={30} />
            ) : (
                <MdPlayArrow size={30} />
            )}
        </IconButton>
    );
}
