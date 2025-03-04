"use client";

import React from "react";
import Image from "next/image";

export const Cta = () => {
  const baseUrl = "https://www.theluxurist.com";
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter') {
      return;
    }
    document.getElementById('engage')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-[600px] w-full mt-16 md:mt-0 px-6">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/cta_image.jpg"
          alt="Luxury Travel Experience"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#140b02a3] bg-opacity-70"></div>
      </div>
      
      {/* Centered Content */}
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div className="text-center py-8 max-w-2xl">
          <h2 className="font-gilda text-4xl md:text-5xl mb-6 text-white">
            Join the new luxury travel ecosystem
          </h2>
          <p className="font-hanken font-extralight mb-8 text-lg text-white">
            Powered by travel specialists bringing the luxury experts for luxury
            travel
          </p>
          <a
            href={`${baseUrl}/engage`}
            onClick={handleClick}
            onKeyDown={handleClick}
            tabIndex={0}
            aria-label="Engage with our luxury travel services"
            className="font-gilda inline-block bg-[hsla(23,91.9%,29.53%,1)] px-10 text-white py-6 uppercase tracking-widest text-sm font-light hover:bg-[hsla(23,91.9%,35%,1)] transition-all duration-300"
          >
            Engage With Us
          </a>
        </div>
      </div>
    </div>
  );
};
