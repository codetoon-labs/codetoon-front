'use client';

import React from 'react';
import Image from 'next/image';

interface Customer {
    id: string;
    name: string;
    image: {
        full_url: string;
    };
}

export default function LogoScroller({ customers = [] }: { customers?: Customer[] }) {
    // If no customers, show empty state
    if (customers.length === 0) {
        return (
            <div className="relative w-full overflow-hidden bg-[#EFF5FB] h-[180px] flex items-center justify-center z-10">
                <div className="text-gray-400">No customers to display</div>
            </div>
        );
    }

    return (
        <div className="relative w-full overflow-hidden bg-[#EFF5FB] h-[180px] flex items-center z-10">
            <div className="logo-scroll-container ">
                <div className="logo-scroll-track py-10">
                    {/* First set of logos */}
                    {customers.map((customer) => (
                        <div
                            key={`logo-1-${customer.id}`}
                            className="logo-item flex items-center justify-center px-8"
                        >
                            <Image
                                src={customer.image.full_url}
                                alt={customer.name}
                                width={120}
                                height={40}
                                className="opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300"
                            />
                        </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {customers.map((customer) => (
                        <div
                            key={`logo-2-${customer.id}`}
                            className="logo-item flex items-center justify-center px-8"
                        >
                            <Image
                                src={customer.image.full_url}
                                alt={customer.name}
                                width={120}
                                height={40}
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
          animation: scroll 45s linear infinite;
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
