import { setVolume } from '@/redux/features/playerSlice';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from './IconButton';
import { MdVolumeOff, MdVolumeUp } from 'react-icons/md';

export default function VolumeInput() {
    const { volume } = useSelector(state => state.player);
    const dispatch = useDispatch();

    const handleMuteUnmute = () => {
        dispatch(setVolume(volume === 0 ? 1 : 0));
    };

    return (
        <div className='flex gap-3 items-center justify-self-end'>
            <IconButton
                intent='secondary'
                size='sm'
                onClick={handleMuteUnmute}
                aria-label={volume === 0 ? 'unmute' : 'mute'}>
                {volume === 0 ? (
                    <MdVolumeOff size={20} />
                ) : (
                    <MdVolumeUp size={20} />
                )}
            </IconButton>
            <input
                aria-label='volume'
                name='volume'
                type='range'
                min={0}
                step={0.05}
                max={1}
                value={volume}
                className='w-[80px] m-0 h-2 rounded-full accent-sky-600 bg-gray-700 appearance-none cursor-pointer'
                onChange={e => {
                    dispatch(setVolume(e.currentTarget.valueAsNumber));
                }}
            />
        </div>
    );
}
