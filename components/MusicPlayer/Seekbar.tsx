import React, { useState, useCallback, useEffect } from 'react';

const Seekbar = ({ value, min, max, onSeekChange }) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const [isSeekingActive, setIsSeekingActive] = useState(false);

    const handleSeekStart = () => {
        setIsSeekingActive(true);
    };

    const handleSeekEnd = () => {
        setIsSeekingActive(false);
        debouncedOnSeekChange();
    };

    const handleSeekChange = useCallback(e => {
        const newValue = parseFloat(e.target.value);
        setDebouncedValue(newValue);
    }, []);

    // Debounce function
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const debouncedOnSeekChange = useCallback(
        debounce(() => {
            onSeekChange(debouncedValue);
        }, 500),
        [onSeekChange, debouncedValue]
    );

    useEffect(() => {
        if (!isSeekingActive) {
            setDebouncedValue(value);
        }
    }, [value, isSeekingActive]);

    return (
        <input
            type='range'
            step='any'
            value={debouncedValue}
            min={min}
            max={max}
            onChange={handleSeekChange}
            onMouseDown={handleSeekStart}
            onMouseUp={handleSeekEnd}
            onTouchStart={handleSeekStart}
            onTouchEnd={handleSeekEnd}
            className='max-w-7xl mx-auto w-full'
        />
    );
};

export default Seekbar;
