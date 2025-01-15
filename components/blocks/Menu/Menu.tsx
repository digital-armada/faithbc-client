"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { menuLinks } from "@/lib/constants/mobile-menu";

export default function Menu() {
  const container = useRef<HTMLDivElement>(null); // The parent container for GSAP

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tl = useRef<gsap.core.Timeline | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useGSAP(
    () => {
      gsap.set(".menu-link-item-holder", { y: 75 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1.25,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
          delay: -0.75,
        });
    },
    { scope: container },
  );

  useEffect(() => {
    if (isMenuOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isMenuOpen]);

  return (
    <div className="px-4 pt-2" ref={container}>
      <div className="menu-bar z-1 container left-0 top-0 flex w-full items-center justify-between border-b border-solid border-gray-800/20">
        <div>
          <Link href="/">
            <Image
              src="/fbc(darker).png"
              alt="FBC Logo"
              width={64}
              height={64}
            />
          </Link>
        </div>

        <button
          className="menu-open cursor-pointer text-gray-800"
          onClick={toggleMenu}
        >
          Menu
        </button>
      </div>

      <div className="menu-overlay fixed left-0 top-0 z-10 flex h-full w-full flex-col overflow-y-auto bg-[#bcbcbc] px-4">
        <div className="menu-overlay-bar container flex items-center justify-between border-b-[1px] border-solid border-gray-800 pt-2">
          <div>
            <Link href="/">
              <Image
                src="/fbc(darker).png"
                alt="FBC Logo"
                width={64}
                height={64}
              />
            </Link>
          </div>
          <button className="menu-close" onClick={toggleMenu}>
            <p>Close &#x2715;</p>
          </button>
        </div>

        <section className="menu-copy container">
          <div className="menu-links">
            {menuLinks.map((link, index) => (
              <div className="menu-link-item font-display" key={index}>
                <div className="menu-link-item-holder" onClick={toggleMenu}>
                  <Link href={link.path} className="menu-link text-gray-700">
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="menu-info mt-16 font-display">
            <div className="menu-info-col">
              <a
                href="https://www.youtube.com/@faithbaptistchurchblacktow4428"
                target="_blank"
              >
                Youtube Sermons &#8599;
              </a>
            </div>
            <div className="menu-info-col">
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
