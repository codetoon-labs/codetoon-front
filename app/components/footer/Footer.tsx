'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";

interface IconProps {
  className?: string;
}

function LocationIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function PhoneIcon({ className }: IconProps) {
  return (
    <svg 
      className={className}
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}



function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function TwitterIcon({ className }: IconProps) {
  return (
    <Image
      className={className}
      src="/x twitter.svg"
      alt="Twitter icon"
      width={24}
      height={24}
      priority
    />
  );
}

function CopyrightIcon({ className }: IconProps) {
  return (
      <svg
          className={className}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_349_5623)">
              <path d="M14.6668 8.00065C14.6668 11.6825 11.6821 14.6673 8.00016 14.6673C4.31826 14.6673 1.3335 11.6825 1.3335 8.00065C1.3335 4.31875 4.31826 1.33398 8.00016 1.33398C11.6821 1.33398 14.6668 4.31875 14.6668 8.00065Z" stroke="#0D71BA" strokeWidth="1.5"/>
              <path d="M10 9.33398C10 10.0704 9.40305 10.6673 8.66667 10.6673H8C7.37874 10.6673 7.06812 10.6673 6.82309 10.5658C6.49638 10.4305 6.23682 10.1709 6.10149 9.84423C6 9.5992 6 9.28857 6 8.66732V7.33398C6 6.71273 6 6.4021 6.10149 6.15707C6.23682 5.83037 6.49638 5.5708 6.82309 5.43548C7.06812 5.33398 7.37874 5.33398 8 5.33398H8.66667C9.40305 5.33398 10 5.93094 10 6.66732" stroke="#0D71BA" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
          <defs>
              <clipPath id="clip0_349_5623">
                  <rect width="16" height="16" fill="white"/>
              </clipPath>
          </defs>
      </svg>

  );
}

function CodetoonLogo({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 flex items-center">
          <Link href="/" className="font-bold text-[24px] text-[#0d71ba]">
              <Image
                  className=""
                  src="/logo.svg"
                  alt="Codetoon logo"
                  width={250}
                  height={50}
                  priority
              />
          </Link>
      </div>
    </div>
  );
}

export default function Footer() {
  const servicesLinks = [
    'Technology',
    'Marketing',
    'Design'
  ];

  const workLinks = [
    'Lorem',
    'Lorem',
    'Lorem',
    'Lorem'
  ];





  return (
    <footer className="bg-[#F3F8FC] pt-[48px] pb-[16px] border-t border-gray-300/50 shadow-lg">
      <div className="flex flex-col">
        {/* Main Footer Content */}
        <div id="main-footer-content" className="flex items-start justify-around pb-[48px] px-12  mb-[16px]">
            {/* Logo and Tagline */}
          <div className="gap-[24px] justify-center items-center px-8 me-40">
            <CodetoonLogo className="w-[270px] h-[80px]" />
          </div>
          {/* Services Section */}
          <div className="w-[109px] flex flex-col basis-64  gap-[12px]">
            <h3 className="font-bold text-[24px] leading-[38.4px] text-[#0d71ba] mb-[12px]">
              Services
            </h3>
            <div className="flex flex-col gap-[12px]">
              {servicesLinks.map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="font-medium text-[20px] w-fit leading-[22px] text-gray-700"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* About Us Section */}
          <div className="w-[135px] flex flex-col basis-64 gap-[12px]">
            <h3 className="font-bold text-[24px] leading-[38.4px] text-[#0d71ba] mb-[12px]">
              About us
            </h3>
            <Link
              href="#"
              className="font-medium text-[20px] w-fit leading-[22px] text-gray-700"
            >
              Our Story
            </Link>
          </div>

          {/* Our Work Section */}
          <div className="w-[135px] flex flex-col basis-64 gap-[12px]">
            <h3 className="font-bold text-[24px] leading-[38.4px] text-[#0d71ba] mb-[12px]">
              Our Work
            </h3>
            <div className="flex flex-col gap-[12px]">
              {workLinks.map((link, index) => (
                <Link
                  key={index}
                  href="/"
                  className="font-medium text-[20px] w-fit leading-[22px] text-gray-700"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="w-[407px] flex flex-col basis-lg gap-[48px]">
            <div className="flex flex-col gap-[12px]">
              <h3 className="font-bold text-[24px] leading-[38.4px] text-[#0d71ba] mb-[12px]">
                Contact us
              </h3>
              <div className="flex flex-col gap-[9px]">
                {/* Address */}
                <div className="flex gap-[10px] items-center">
                  <LocationIcon className="w-[24px] h-[24px] text-[#0d71ba]"/>
                  <Link href="#" className="font-medium text-[16px] leading-[17.6px] text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Link>
                </div>
                {/* Phone */}
                <div className="flex gap-[10px] items-center">
                  <PhoneIcon className="w-[24px] h-[24px] text-[#0d71ba]" />
                  <Link href="#" className="font-medium text-[16px] leading-[17.6px] text-gray-700">
                    0123456789
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
       <div className="flex justify-center">
           <div className="flex flex-col gap-[36px] justify-around items-center mb-9 border-t mt-6 pt-26 border-gray-300/50 w-[1700px]">
               {/* Social Media */}
               <div className="flex gap-[16px]">
                   <a  aria-label="facebook"
                       href="https://www.facebook.com/codetoon.net" target="_blank" rel="noopener noreferrer" className="text-[#0d71ba]">
                       <FacebookIcon className="w-[35px] h-[35px]" />
                   </a>
                   <a  aria-label="twitter"
                       href="https://x.com/codetooneg" target="_blank" rel="noopener noreferrer" className="text-[#0d71ba]">
                       <TwitterIcon className="w-[35px] h-[35px]" />
                   </a>
                   <a  aria-label="linkedin"
                       href="https://www.linkedin.com/company/codetoon" target="_blank" rel="noopener noreferrer" className="text-[#0d71ba]">
                       <LinkedInIcon className="w-[35px] h-[35px]" />
                   </a>
               </div>

               {/* Copyright and Links */}
               <div className="flex items-center justify-center w-[1184px] h-[16px]">
                   <div className="flex gap-[4px] items-center">
                       <CopyrightIcon className="w-[25px] h-[25px]" />
                       <p className="text-[16px] leading-normal text-gray-700">
                           Copyright {new Date().getFullYear()} - Codetoon
                       </p>
                   </div>
               </div>
           </div>
       </div>
      </div>
    </footer>
  );
}