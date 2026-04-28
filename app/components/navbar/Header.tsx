'use client';

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { useModal } from '../../context/ModalContext';
import { 
  LayoutGrid, 
  AlignLeft, 
  Monitor, 
  User, 
  ChevronRight, 
  X,
  Phone
} from 'lucide-react';

interface NavItemProps {
  label: string;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
  icon?: React.ElementType;
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

function DrawerNavItem({ label, href = "#", isActive = false, onClick, icon: Icon }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        w-full flex items-center justify-between px-4 py-3
        transition-all duration-200 cursor-pointer group
        ${isActive ? 'bg-[#0d71ba]/5 text-[#0d71ba]' : 'text-[#4A5568] hover:bg-gray-50'}
      `}
    >
      <div className="flex items-center gap-4">
        <div className={`
          flex items-center justify-center w-10 h-10 rounded-xl
          ${isActive ? 'bg-[#F0F9F9] shadow-sm' : 'bg-[#F7F8F9]'}
        `}>
          {Icon && <Icon size={20} className={isActive ? 'text-[#0d71ba]' : 'text-[#718096]'} />}
        </div>
        <span className={`text-[17px] font-medium ${isActive ? 'text-[#0d71ba]' : 'text-[#1A202C]'}`}>
          {label}
        </span>
      </div>
      <ChevronRight 
        size={18} 
        className={`transition-transform duration-200 ${isActive ? 'text-[#0d71ba]' : 'text-[#CBD5E0] group-hover:translate-x-1'}`} 
      />
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
    { label: 'Home', href: '/', icon: LayoutGrid },
    { label: 'Services', href: '/services', icon: AlignLeft },
    { label: 'Projects', href: '/projects', icon: Monitor },
    { label: 'About Us', href: '/about-us', icon: User }
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
        fixed top-0 left-0 h-full w-[300px] bg-white z-[101] lg:hidden
        flex flex-col shadow-2xl rounded-r-[32px] overflow-hidden
        transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Drawer Header */}
        <div className="flex flex-col px-6 pt-8 pb-6">
          <div className="flex items-start justify-between mb-4">
          <CodetoonLogo />
            <div className="flex items-center gap-3">
            </div>
            <button
              onClick={closeMenu}
              className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-[#718096] text-[15px] leading-relaxed max-w-[200px]">
            Change the world, 'cause we can.
          </p>
        </div>

        <div className="h-px bg-gray-100 mx-6 mb-4" />

        {/* Drawer Nav Links */}
        <nav className="flex flex-col gap-1 px-0">
          {navItems.map((item) => (
            <DrawerNavItem
              key={item.label}
              label={item.label}
              href={item.href}
              icon={item.icon}
              isActive={pathname === item.href}
              onClick={closeMenu}
            />
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="mt-auto p-6">
          <div className="flex flex-col gap-2 bg-[#102A43] rounded-3xl p-6 relative overflow-hidden group">
            {/* Subtle background decoration */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all duration-500" />
            
            <p className="text-[#8492A6] text-xs font-bold tracking-widest uppercase mb-3">
              Get in touch
            </p>
            <a href="tel:+201156167758" onClick={closeMenu} className="text-white text-xl font-bold mb-2">
              01156167758
            </a>
            <a href="https://maps.app.goo.gl/VcaAJGKX93yuiG4j9" target="_blank" rel="noopener noreferrer" className="text-[#00BAFF] text-sm font-medium">
              316 Ninety Road Sector 2 Office No.3 Third Floor ,5th Settlement, | New Cairo, Cairo Egypt
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}