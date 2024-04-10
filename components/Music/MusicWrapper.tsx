// 'use client';
// import MusicPlayer from '../MusicPlayer';

// import { useSelector } from 'react-redux';
// import { motion, AnimatePresence } from 'framer-motion';
// import { use, useEffect, useState } from 'react';
import MobileMusic from '../organisms/MobileMusic';
// import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';

export default function MusicWrapper() {
    // const { activeSermon } = useSelector(state => state.player);
    // console.log(activeSermon);
    const [minimized, setMinimized] = useState(false);

    useEffect(() => {
        const minimized = window.innerWidth <= 639;
        setMinimized(minimized);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            // Check window width and update the minimized state accordingly
            if (window.innerWidth <= 639 && !minimized) {
                setMinimized(true);
            } else if (window.innerWidth > 639 && minimized) {
                setMinimized(false);
            }
        };

        // Attach event listener for window resize
        window.addEventListener('resize', handleResize);

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [minimized]);

    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [viewportHeight, setViewportHeight] = useState(0);

    const handleButtonClick = () => {
        setIsExpanded(!isExpanded);
    };
    const handleClick = () => setIsVisible(prev => !prev);

    useEffect(() => {
        function handleResize() {
            setViewportHeight(window.innerHeight);
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [viewportHeight]);

    return (
        <>
            <AnimatePresence>
                {activeSermon?.attributes?.name && (
                    <>
                        <motion.button
                            className={`fixed bg-white text-black rounded-full bottom-2 left-2  z-50`}
                            initial={{ y: 100 }}
                            animate={{
                                y: 0,
                                // y: isVisible ? 0 : 200,
                                // opacity: isVisible ? 1 : 0,
                            }}
                            whileHover={{ scale: 0.95 }}
                            whileTap={{ scale: 0.95 }}
                            // transition={{ delay: 0.3 }}
                            onClick={() => setIsVisible(!isVisible)}>
                            {isVisible ? (
                                <FaArrowAltCircleDown className='w-10 h-10' />
                            ) : (
                                <FaArrowAltCircleUp className='w-10 h-10' />
                            )}
                        </motion.button>

                        <motion.div
                            // initial={{ y: 0 }}
                            animate={{
                                y: isVisible
                                    ? 0
                                    : minimized
                                    ? viewportHeight
                                    : 300,
                                // display: isVisible ? 'block' : 'none',
                                // : minimized ? 2000 : 300,
                                // opacity: isVisible ? 1 : 0,
                            }}
                            exit={{ y: 200 }}
                            // transition={{ duration: minimized ? 0.3 : 0.6 }}
                            transition={{ duration: 0.5 }}
                            className={`fixed h-full sm:h-28 bottom-0 left-0 right-0 bg-[#212121] z-40`}>
                            <MusicPlayer />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
