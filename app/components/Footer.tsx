'use client';

import React from 'react';

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

function TwitterIcon({ className }: IconProps) {
  return (
    <svg 
      className={className}
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
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

function CopyrightIcon({ className }: IconProps) {
  return (
    <svg 
      className={className}
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15.5c-2.49 0-4.5-2.01-4.5-4.5S7.51 8.5 10 8.5c1.18 0 2.25.46 3.06 1.19l-1.06 1.06c-.51-.51-1.21-.75-2-.75-1.38 0-2.5 1.12-2.5 2.5S8.62 14.5 10 14.5c.79 0 1.49-.24 2-.75l1.06 1.06c-.81.73-1.88 1.19-3.06 1.19z"/>
    </svg>
  );
}

function CodetoonLogo({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <span className="font-bold text-[24px] text-[#0d71ba]">
          CodeToon
        </span>
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
    <footer className="bg-[#f5fbfe] opacity-80 pt-[48px] pb-[16px] border-t border-[#9ea1a2]">
      <div className="max-w-[1280px] mx-auto px-[48px]">
        {/* Main Footer Content */}
        <div className="flex gap-[80px] items-start pb-[48px] border-b border-[#9ea1a2] mb-[14px]">
          {/* Services Section */}
          <div className="w-[109px] flex flex-col gap-[12px]">
            <h3 className="font-bold text-[24px] leading-[38.4px] text-[#07436f] mb-[12px]">
              Services
            </h3>
            <div className="flex flex-col gap-[12px]">
              {servicesLinks.map((link) => (
                <a 
                  key={link}
                  href="#"
                  className="font-medium text-[20px] leading-[22px] text-black hover:text-[#07436f] transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* About Us Section */}
          <div className="w-[135px] flex flex-col gap-[12px]">
            <h3 className="font-bold text-[24px] leading-[38.4px] text-[#07436f] mb-[12px]">
              About us
            </h3>
            <a 
              href="#"
              className="font-medium text-[20px] leading-[22px] text-black hover:text-[#07436f] transition-colors"
            >
              Our Story
            </a>
          </div>

          {/* Our Work Section */}
          <div className="w-[135px] flex flex-col gap-[12px]">
            <h3 className="font-bold text-[24px] leading-[38.4px] text-[#07436f] mb-[12px]">
              Our Work
            </h3>
            <div className="flex flex-col gap-[12px]">
              {workLinks.map((link, index) => (
                <a 
                  key={index}
                  href="#"
                  className="font-medium text-[20px] leading-[22px] text-black hover:text-[#07436f] transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="w-[407px] flex flex-col gap-[48px]">
            <div className="flex flex-col gap-[12px]">
              <h3 className="font-bold text-[24px] leading-[38.4px] text-[#07436f] mb-[12px]">
                Contact us
              </h3>
              <div className="flex flex-col gap-[9px]">
                {/* Address */}
                <div className="flex gap-[10px] items-center">
                  <LocationIcon className="w-[24px] h-[24px] text-[#535556] flex-shrink-0" />
                  <p className="font-medium text-[16px] leading-[17.6px] text-[#535556]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                {/* Phone */}
                <div className="flex gap-[10px] items-center">
                  <PhoneIcon className="w-[24px] h-[24px] text-[#535556] flex-shrink-0" />
                  <p className="font-medium text-[16px] leading-[17.6px] text-[#535556]">
                    0123456789
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-[12px] items-center">
              <a href="#" className="text-[#535556] hover:text-[#07436f] transition-colors">
                <FacebookIcon className="w-[24px] h-[24px]" />
              </a>
              <a href="#" className="text-[#535556] hover:text-[#07436f] transition-colors">
                <TwitterIcon className="w-[24px] h-[24px]" />
              </a>
              <a href="#" className="text-[#535556] hover:text-[#07436f] transition-colors">
                <LinkedInIcon className="w-[24px] h-[24px]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-[15px] items-center">
          {/* Logo and Tagline */}
          <div className="flex gap-[24px] items-center pb-[16px] border-b border-[#9ea1a2] w-full">
            <CodetoonLogo className="w-[180px] h-[52px]" />
            <div className="font-semibold text-[32px] leading-[35.2px] text-[#000305] capitalize">
              Change The world cause we can
            </div>
          </div>

          {/* Copyright and Links */}
          <div className="flex items-center justify-between w-[1184px] h-[16px]">
            <div className="flex gap-[2px] items-center">
              <CopyrightIcon className="w-[16px] h-[16px] text-[#040101]" />
              <p className="text-[12px] leading-normal text-[#040101]">
                Copyright2025-CodeToon
              </p>
            </div>
            <p className="text-[12px] leading-normal text-[#040101]">
              Privacy Policy
            </p>
            <p className="text-[12px] leading-normal text-[#040101]">
              Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}