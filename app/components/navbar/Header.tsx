'use client';

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { useModal } from '../../context/ModalContext';

interface NavItemProps {
  label: string;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
}

function NavItem({ label, href = "#", isActive = false, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center justify-center px-2 py-2
         text-[22px] leading-[28.8px] text-black
        transition-all duration-200 cursor-pointer
        border-b-2 border-transparent
        ${!isActive ? 'font-medium hover:text-[#0B65A7] hover:border-[#0d71ba]' : ''}
        ${isActive ? 'font-bold bg-linear-to-r from-[#FAEDA1] via-[#0d71ba] to-[#0B65A7] bg-clip-text text-transparent border-[#0d71ba]!' : ''}
      `}
    >
      {label}
    </Link>
  );
}

function DrawerNavItem({ label, href = "#", isActive = false, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        w-full flex items-center px-4 py-4
        text-[22px] leading-[28.8px] text-black
        border-b border-gray-100
        transition-all duration-200 cursor-pointer capitalize
       ${!isActive ? 'font-medium hover:text-[#0B65A7] hover:border-[#0d71ba]' : ''}
         ${isActive ? 'font-bold bg-clip-text bg-text-gradient bg-linear-to-r from-[#FAEDA1] via-[#0B65A7] to-[#0B65A7] text-transparent border-[#0d71ba]!' : ''}
      `}
    >
      {label}
    </Link>
  );
}

function CodetoonLogo() {
  return (
    <div className="relative w-[120px] h-[40px] lg:w-[172px] lg:h-[50px] overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <Link href="/" className="font-bold text-[24px] text-[#0d71ba]">
            <Image
                className=""
                src="/logo.svg"
                alt="Codetoon logo"
                width={172}
                height={50}
                priority
            />
        </Link>
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { openContactModal } = useModal();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    // { label: 'Products', href: '/products' },
    { label: 'About Us', href: '/about-us' }
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header>
      {/* Main Nav Pill */}
      <nav className="z-50
        w-[calc(100%-32px)] lg:w-full h-[60px] lg:h-[74px] max-w-[1000px]
        flex items-center justify-between
        px-[16px] lg:px-[20px] py-[12px]
        bg-[rgba(236,242,248,0.2)] backdrop-blur-[20px]
        border border-[#E6E7E8] rounded-full
        box-border
        fixed top-4 lg:top-16 left-1/2 -translate-x-1/2
      ">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="lg:hidden flex items-center justify-center w-[40px] h-[40px] rounded-full text-white transition-colors duration-200 hover:bg-[#0a5a95]"
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M20 6L4 6L4 4L20 4L20 6Z" fill="#0D71BA" />
            <path fillRule="evenodd" clipRule="evenodd" d="M20 13L4 13L4 11L20 11L20 13Z" fill="#0D71BA" />
            <path fillRule="evenodd" clipRule="evenodd" d="M20 20L4 20L4 18L20 18L20 20Z" fill="#0D71BA" />
          </svg>
        </button>
        {/* Logo */}
        <CodetoonLogo />

        {/* Desktop Navigation Items */}
        <div className="hidden capitalize lg:flex items-center gap-[16px]">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              label={item.label}
              href={item.href}
              isActive={pathname === item.href}
            />
          ))}
        </div>

        {/* Desktop Contact Button */}
        <button 
          onClick={openContactModal}
          className="
          flex items-center justify-center gap-[10px] 
          h-[48px] px-[20px] py-[10px]
          bg-[#0d71ba] border border-[#e6f0f8] rounded-[40px]
          font-bold text-[16px] text-[#FCF6D0]
          transition-colors duration-300
          hover:bg-[#0a5a95] cursor-pointer
        ">
          Contact us
        </button>

      </nav>

      {/* Mobile Drawer Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-100 lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Drawer */}
      <div className={`
        fixed top-0 left-0 h-full w-[280px] bg-white z-101 lg:hidden
        flex flex-col shadow-2xl
        transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
          <CodetoonLogo />
          <button
            onClick={closeMenu}
            className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav className="flex flex-col flex-1 pt-2 ">
          {navItems.map((item) => (
            <DrawerNavItem
              key={item.label}
              label={item.label}
              href={item.href}
              isActive={pathname === item.href}
              onClick={closeMenu}
            />
          ))}
        </nav>
      </div>
    </header>
  );
}