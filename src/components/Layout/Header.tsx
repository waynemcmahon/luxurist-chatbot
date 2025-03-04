'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const baseUrl = "https://www.theluxurist.com";

  return (
    <header className={`w-full py-6 ${transparent ? 'absolute top-0 left-0 z-10' : 'bg-white shadow-sm'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center relative">
        {/* Left section - Desktop Navigation */}
        <div className="flex-1">
          <nav className="hidden md:flex space-x-8">
            <Link href={`${baseUrl}/travel-advisors`} className="font-gilda text-gray-800 hover:text-[hsla(23,91.9%,29.53%,1)] uppercase tracking-[2.2px] text-[11px] transition-colors">
              Travel Advisors
            </Link>
            <Link href={`${baseUrl}/hotels`} className="font-gilda text-gray-800 hover:text-[hsla(23,91.9%,29.53%,1)] uppercase tracking-[2.2px] text-[11px] transition-colors">
              Hotels
            </Link>
            <Link href={`${baseUrl}/about-us`} className="font-gilda text-gray-800 hover:text-[hsla(23,91.9%,29.53%,1)] uppercase tracking-[2.2px] text-[11px] transition-colors">
              About Us
            </Link>
          </nav>
        </div>

        {/* Center - Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href={`${baseUrl}/`} className="flex items-center z-20">
            <img 
              src="https://cdn.prod.website-files.com/670230337fd9e66559f110bd/670230337fd9e66559f11293_Logo%20The%20Luxurist%20-Black.svg" 
              alt="The Luxurist Logo" 
              className="h-12 w-auto"
            />
          </Link>
        </div>
        
        {/* Right section - Button and mobile menu toggle */}
        <div className="flex-1 flex justify-end items-center space-x-4">
          <button className="hidden md:block font-gilda bg-black text-white px-[30px] py-4 hover:bg-[hsla(23,91.9%,29.53%,1)] hover:scale-105 uppercase tracking-[2.2px] text-[11px] transition-all duration-300">
            Engage With Us
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="block md:hidden z-20" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <></>
            ) : (
              // Menu icon (hamburger)
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu - Full Screen Overlay */}
        <div 
          className={`fixed inset-0 bg-[#2A2A2A] z-50 transition-all duration-500 ease-in-out md:hidden ${
            mobileMenuOpen 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
        >
          <div className="container mx-auto px-4 py-6 h-full flex flex-col">
            {/* Logo and Close Button Row */}
            <div className="flex justify-between items-center mb-16">
              <Link href="/" className="inline-block">
                <img 
                  src="https://cdn.prod.website-files.com/670230337fd9e66559f110bd/670230337fd9e66559f11325_Logo%20The%20Luxurist%20-White.svg" 
                  alt="The Luxurist Logo" 
                  className="h-16 w-auto"
                />
              </Link>
              
              <button 
                onClick={toggleMobileMenu}
                aria-label="Close menu"
                className="text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex flex-col items-center space-y-8 mt-8">
              <Link 
                href="/" 
                className="font-gilda text-white hover:text-[hsla(23,91.9%,70%,1)] uppercase tracking-widest text-2xl transition-colors"
                onClick={toggleMobileMenu}
              >
                HOME
              </Link>
              <Link 
                href={`${baseUrl}/travel-advisors`} 
                className="font-gilda text-white hover:text-[hsla(23,91.9%,70%,1)] uppercase tracking-widest text-2xl transition-colors"
                onClick={toggleMobileMenu}
              >
                TRAVEL AGENTS
              </Link>
              <Link 
                href={`${baseUrl}/hotels`} 
                className="font-gilda text-white hover:text-[hsla(23,91.9%,70%,1)] uppercase tracking-widest text-2xl transition-colors"
                onClick={toggleMobileMenu}
              >
                HOTELS
              </Link>
              <Link 
                href={`${baseUrl}/about-us`} 
                className="font-gilda text-white hover:text-[hsla(23,91.9%,70%,1)] uppercase tracking-widest text-2xl transition-colors"
                onClick={toggleMobileMenu}
              >
                ABOUT US
              </Link>
            </nav>

            {/* Engage With Us Button */}
            <div className="mt-auto mb-8 text-center">
              <a 
                href={`${baseUrl}/engage`} 
                className="inline-block px-10 py-4 border border-white text-white font-gilda uppercase tracking-widest text-lg hover:bg-white hover:text-[#2A2A2A] transition-colors"
                onClick={toggleMobileMenu}
              >
                ENGAGE WITH US
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}; 