'use client';
import React, { useState } from 'react';
import { BsFillVolumeMuteFill } from 'react-icons/bs';
import { IoMdVolumeOff } from 'react-icons/io';
import {
    IoVolumeHighSharp,
    IoVolumeLowSharp,
    IoVolumeMedium,
} from 'react-icons/io5';

const ICON_SIZE = 15;
const ICON_COLOR = '#FFF';
const VOLUME_BAR_INPUT_CLASSNAME = 'ml-2';

const VolumeBar = ({ value, min, max, onChange, setVolume }) => {
    const [prevVolume, setPrevVolume] = useState(value);

    const handleVolumeMute = () => {
        if (value === 0) {
            // If currently muted, restore to the previous volume level
            setVolume(prevVolume);
        } else {
            // Save the current volume level and mute
            setPrevVolume(value);
            setVolume(0);
        }
    };

    return (
        <div className='flex items-center justify-center mt-2'>
            {value >= 0.6 && (
                <IoVolumeHighSharp
                    size={ICON_SIZE}
                    color={ICON_COLOR}
                    onClick={handleVolumeMute}
                />
            )}
            {value > 0.3 && value < 0.6 && (
                <IoVolumeMedium
                    size={ICON_SIZE}
                    color={ICON_COLOR}
                    onClick={handleVolumeMute}
                />
            )}
            {value > 0 && value < 0.3 && (
                <IoVolumeLowSharp
                    size={ICON_SIZE}
                    color={ICON_COLOR}
                    onClick={handleVolumeMute}
                />
            )}
            {value === 0 && (
                <BsFillVolumeMuteFill
                    size={ICON_SIZE}
                    color={ICON_COLOR}
                    onClick={handleVolumeMute}
                />
            )}
            <input
                type='range'
                step='any'
                value={value}
                min={min}
                max={max}
                onChange={onChange}
                className={VOLUME_BAR_INPUT_CLASSNAME}
            />
        </div>
    );
};

export default VolumeBar;
