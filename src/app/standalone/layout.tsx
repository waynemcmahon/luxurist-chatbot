import React from 'react';
import type { Metadata } from 'next';

const Header = () => (
  <header className="w-full bg-white py-6 px-4 md:px-8 border-b border-gray-100">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <a href="/" className="flex items-center">
        <img 
          src="https://cdn.prod.website-files.com/670230337fd9e66559f110bd/670230337fd9e66559f11293_Logo%20The%20Luxurist%20-Black.svg" 
          alt="The Luxurist Logo" 
          className="h-12 md:h-16"
        />
      </a>
      <nav className="hidden md:flex space-x-8">
        <a href="/about-us" className="text-gray-700 hover:text-[hsla(23,91.9%,29.53%,1)] transition-colors duration-200 gilda-display">
          About Us
        </a>
        <a href="/contact" className="text-gray-700 hover:text-[hsla(23,91.9%,29.53%,1)] transition-colors duration-200 gilda-display">
          Contact
        </a>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="w-full bg-white py-8 px-4 md:px-8 border-t border-gray-100">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img 
            src="https://cdn.prod.website-files.com/670230337fd9e66559f110bd/670230337fd9e66559f11293_Logo%20The%20Luxurist%20-Black.svg" 
            alt="The Luxurist Logo" 
            className="h-12 mb-4"
          />
          <p className="text-gray-600 hanken-grotesk text-sm">
            Crafting unforgettable luxury travel experiences
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 gilda-display">Quick Links</h3>
          <div className="space-y-2">
            <a href="/about-us" className="block text-gray-600 hover:text-[hsla(23,91.9%,29.53%,1)] transition-colors duration-200 hanken-grotesk">
              About Us
            </a>
            <a href="/contact" className="block text-gray-600 hover:text-[hsla(23,91.9%,29.53%,1)] transition-colors duration-200 hanken-grotesk">
              Contact
            </a>
            <a href="/privacy-policy" className="block text-gray-600 hover:text-[hsla(23,91.9%,29.53%,1)] transition-colors duration-200 hanken-grotesk">
              Privacy Policy
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 gilda-display">Contact Us</h3>
          <div className="space-y-2 hanken-grotesk text-sm text-gray-600">
            <p>Email: info@theluxurist.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-100 text-center">
        <p className="text-gray-500 text-sm hanken-grotesk">
          © {new Date().getFullYear()} The Luxurist. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export const metadata: Metadata = {
  title: 'Luxury Travel Planning | The Luxurist',
  description: 'Plan your luxury travel experience with our expert concierges. Share your vision and receive a personalized itinerary.',
};

export default function StandaloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
} 