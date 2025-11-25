'use client';

import React from 'react';

interface NavItemProps {
  label: string;
  href?: string;
  isActive?: boolean;
}

function NavItem({ label, href = "#", isActive = false }: NavItemProps) {
  return (
    <a 
      href={href}
      className={`
        flex items-center justify-center px-2 py-2 rounded-md
        font-medium text-[20px] leading-[28.8px] text-black
        transition-colors duration-200 cursor-pointer
        hover:bg-gray-100/50
        ${isActive ? 'bg-gray-100/80' : ''}
      `}
    >
      {label}
    </a>
  );
}

function CodetoonLogo() {
  return (
    <div className="relative w-[172px] h-[50px] overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <span className="font-bold text-[24px] text-[#0d71ba]">
          CodeToon
        </span>
      </div>
    </div>
  );
}

export default function Header() {
  const navItems = [
    { label: 'Home', href: '/', isActive: true },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Products', href: '/products' },
  ];

  return (
    <header className="w-full px-[20px] py-[12px]">
      <nav className="
        w-full h-[74px] max-w-[1000px] mx-auto
        flex items-center justify-between
        px-[20px] py-[12px]
        bg-[rgba(236,242,248,0.2)] backdrop-blur-[20px]
        border border-[#e6e7e8] rounded-full
        box-border
      ">
        {/* Logo */}
        <CodetoonLogo />

        {/* Navigation Items */}
        <div className="flex items-center gap-[16px]">
          {navItems.map((item) => (
            <NavItem 
              key={item.label}
              label={item.label}
              href={item.href}
              isActive={item.isActive}
            />
          ))}
        </div>

        {/* Contact Button */}
        <button className="
          flex items-center gap-[10px]
          h-[48px] px-[20px] py-[10px]
          bg-[#0d71ba] border border-[#e6f0f8] rounded-[40px]
          font-bold text-[20px] text-[#f4d315]
          transition-colors duration-200
          hover:bg-[#0a5a95]
        ">
          Contact us
        </button>
      </nav>
    </header>
  );
}