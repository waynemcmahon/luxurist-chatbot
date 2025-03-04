"use client";

import React from "react";
import Image from "next/image";

export const Cta = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter') {
      return;
    }
    document.getElementById('engage')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse h-[500px]">
      {/* Left content - Text */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="text-gray-900 max-w-xl">
          <h2 className="font-gilda text-4xl md:text-5xl mb-6">
            Join the new luxury travel ecosystem
          </h2>
          <p className="font-hanken font-extralight mb-8 text-lg">
            Powered by travel specialists bringing the luxury experts for luxury
            travel
          </p>
          <a
            href="#engage"
            onClick={handleClick}
            onKeyDown={handleClick}
            tabIndex={0}
            aria-label="Engage with our luxury travel services"
            className="inline-block bg-[hsla(23,91.9%,29.53%,1)] px-8 text-white py-4 uppercase tracking-widest text-sm font-light hover:bg-[hsla(23,91.9%,35%,1)] transition-all duration-300"
          >
            Engage With Us
          </a>
        </div>
      </div>
      
      {/* Right content - Image */}
      <div className="w-full lg:w-1/2 relative">
        <Image
          src="/images/cta_image.jpg"
          alt="Luxury Travel Experience"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
    </div>
  );
};
