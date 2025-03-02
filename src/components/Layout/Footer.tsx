import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f0f0f] text-white py-16">
      <div className="container mx-auto px-8">
        <div className="flex flex-col lg:flex-row mb-16">
          {/* Logo */}
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <Link href="/" className="inline-block">
              <img 
                src="/images/logo_white.svg" 
                alt="The Luxurist Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links - First Column */}
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="font-hanken font-light text-white hover:text-gray-300 transition-colors text-base">
                Homepage
              </Link>
              <Link href="/hotels" className="font-hanken font-light  text-white hover:text-gray-300 transition-colors text-base">
                Hotels
              </Link>
              <Link href="/travel-advisors" className="font-hanken font-light text-white hover:text-gray-300 transition-colors text-base">
                Travel Advisors
              </Link>
              <Link href="/about-us" className="font-hanken font-light text-white hover:text-gray-300 transition-colors text-base">
                About us
              </Link>
              <Link href="/engage-with-us" className="font-hanken font-light text-white hover:text-gray-300 transition-colors text-base">
                Engage with us
              </Link>
            </nav>
          </div>

          {/* Navigation Links - Second Column */}
          <div className="lg:w-1/3">
            <nav className="flex flex-col space-y-4">
              <Link href="/contact-us" className="font-hanken font-light text-white hover:text-gray-300 transition-colors text-base">
                Contact us
              </Link>
              <Link href="/press" className="font-hanken font-light text-white hover:text-gray-300 transition-colors text-base">
                Press
              </Link>
              <Link href="/legal-notes" className="font-hanken font-light text-white hover:text-gray-300 transition-colors text-base">
                Legal notes
              </Link>
              <Link href="/privacy-policy" className="font-hanken font-light text-white hover:text-gray-300 transition-colors text-base">
                Privacy policy
              </Link>
            </nav>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-gray-800 mb-8"></div>

        {/* Copyright */}
        <div className="text-center lg:text-left">
          <p className="font-hanken text-gray-400 text-xs">
            Copyright © The Luxurist
          </p>
        </div>
      </div>
    </footer>
  );
}; 