'use client';

import React from 'react';
import Image from 'next/image';

interface Logo {
    src: string;
    alt: string;
    width: number;
    height: number;
}

const logos: Logo[] = [
    { src: '/logo.svg', alt: 'Client Logo 1', width: 120, height: 40 },
    { src: '/logo.svg', alt: 'Client Logo 2', width: 120, height: 40 },
    { src: '/logo.svg', alt: 'Client Logo 3', width: 120, height: 40 },
    { src: '/logo.svg', alt: 'Client Logo 4', width: 120, height: 40 },
    { src: '/logo.svg', alt: 'Client Logo 5', width: 120, height: 40 },
    { src: '/logo.svg', alt: 'Client Logo 6', width: 120, height: 40 },
    { src: '/logo.svg', alt: 'Client Logo 7', width: 120, height: 40 },
    { src: '/logo.svg', alt: 'Client Logo 8', width: 120, height: 40 },
];

export default function LogoScroller() {
    return (
        <div className="relative w-full overflow-hidden bg-[#EFF5FB] h-[180px] flex items-center z-10">
            <div className="logo-scroll-container ">
                <div className="logo-scroll-track py-10">
                    {/* First set of logos */}
                    {logos.map((logo, index) => (
                        <div
                            key={`logo-1-${index}`}
                            className="logo-item flex items-center justify-center px-8"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={logo.width}
                                height={logo.height}
                                className="opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300"
                            />
                        </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {logos.map((logo, index) => (
                        <div
                            key={`logo-2-${index}`}
                            className="logo-item flex items-center justify-center px-8"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={logo.width}
                                height={logo.height}
                                className="opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300"
                            />
                        </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {logos.map((logo, index) => (
                        <div
                            key={`logo-2-${index}`}
                            className="logo-item flex items-center justify-center px-8"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={logo.width}
                                height={logo.height}
                                className="opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .logo-scroll-container {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .logo-scroll-track {
          display: flex;
          width: max-content;
          animation: scroll 15s linear infinite;
        }

        .logo-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
        </div>
    );
}
