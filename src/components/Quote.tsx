"use client";

import React from "react";
import Image from "next/image";
import Logo from "../svgs/logo.svg";

type QuoteProps = {
  className?: string;
};

export const Quote: React.FC<QuoteProps> = ({ className = "" }) => {
  return (
    <div className={`w-full py-40 md:py-60 flex flex-col gap-4 items-center justify-center ${className} bg-white`}>
      {/* Logo instead of "OUR MISSION" */}
      <div className="mb-8 w-60">
        <Image src="/images/logo_black.svg" alt="Logo" width={250} height={250} className="w-full h-auto" />
      </div>
      
      <div className="text-center max-w-5xl mx-auto px-4">
        <h2 className="font-gilda text-xl md:text-2xl lg:text-3xl lg:leading-relaxed">
          Seamlessly Connecting{" "}
          <span className="text-[hsla(23,91.9%,29.53%,1)]">Travel Experts</span>{" "}
          and{" "}
          <span className="text-[hsla(23,91.9%,29.53%,1)]">Elite Properties</span>{" "}
          Through Technology and Personalized Service
        </h2>
      </div>
    </div>
  );
};

export default Quote;
