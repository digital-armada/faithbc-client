'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
const menuLinks = [
    {
        label: 'Home',
        path: '/',
    },
    {
        label: 'Sermons',
        path: '/sermons',
    },
    {
        label: 'Events',
        path: '/events',
    },
    {
        label: 'Statement',
        path: '/statement',
    },
    {
        label: 'Ministries',
        path: '/ministries',
    },
];

export default function Menu() {
    const container = useRef(); // The parent container for GSAP

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const tl = useRef();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useGSAP(
        () => {
            gsap.set('.menu-link-item-holder', { y: 75 });

            tl.current = gsap
                .timeline({ paused: true })
                .to('.menu-overlay', {
                    duration: 1.25,
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    ease: 'power4.inOut',
                })
                .to('.menu-link-item-holder', {
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power4.inOut',
                    delay: -0.75,
                });
        },
        { scope: container }
    );

    useEffect(() => {
        if (isMenuOpen) {
            tl.current.play();
        } else {
            tl.current.reverse();
        }
    }, [isMenuOpen]);

    return (
        <div className='pt-2 px-4' ref={container}>
            <div className='menu-bar container top-0 left-0 w-full flex justify-between items-center z-1 border-solid border-b-[1px] border-gray-800 '>
                <div>
                    <Link href='/'>
                        <Image
                            src='/fbc(darker).png'
                            alt='FBC Logo'
                            width={64}
                            height={64}
                        />
                    </Link>
                </div>
                <div
                    className='menu-open text-gray-800 cursor-pointer'
                    onClick={toggleMenu}>
                    <p>Menu</p>
                </div>
            </div>

            <div className='menu-overlay fixed top-0 left-0 w-full h-full bg-[#bcbcbc] z-10 flex-col flex overflow-y-auto px-4'>
                <div className='pt-2 menu-overlay-bar container flex justify-between items-center border-solid border-b-[1px] border-gray-800'>
                    <div>
                        <Link href='/'>
                            <Image
                                src='/fbc(darker).png'
                                alt='FBC Logo'
                                width={64}
                                height={64}
                            />
                        </Link>
                    </div>
                    <div className='menu-close' onClick={toggleMenu}>
                        <p>Close &#x2715;</p>
                    </div>
                </div>

                <section className='menu-copy container'>
                    <div className='menu-links'>
                        {menuLinks.map((link, index) => (
                            <div
                                className='menu-link-item font-display '
                                key={index}>
                                <div
                                    className='menu-link-item-holder'
                                    onClick={toggleMenu}>
                                    <Link
                                        href={link.path}
                                        className='menu-link text-gray-700'>
                                        {link.label}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='menu-info font-display mt-16'>
                        <div className='menu-info-col'>
                            <a
                                href='https://www.youtube.com/@faithbaptistchurchblacktow4428'
                                target='_blank'>
                                Youtube Sermons &#8599;
                            </a>
                        </div>
                        <div className='menu-info-col'>
                            <p>pastor@faithbc.org.au</p>
                            <p>0433 499 333</p>
                            <p>54 Ellam Dr, Seven Hills NSW 2147</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
