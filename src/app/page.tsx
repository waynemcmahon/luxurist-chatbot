"use client";

import React from "react";
import { TypeFormChat } from "@/components/TypeFormChat/TypeFormChat";
import Image from "next/image";
import { VoiceflowChat } from "@/components/VoiceflowChat/VoiceflowChat";

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Using the background technique from example */}
      <div className="relative bg-[#FDF8F3]">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Left Column - Form Section */}
          <div className="px-6 py-12 lg:col-span-6 lg:px-8 lg:py-24 xl:col-span-5">
            <div className="mx-auto max-w-lg lg:mx-0">
              <div className="mb-2 uppercase tracking-widest text-[hsla(23,91.9%,29.53%,1)] text-sm font-light">
                Create Your Journey
              </div>
              <h1 className="mt-4 text-5xl md:text-6xl font-gilda text-gray-900 leading-tight">
                Magic Quote
              </h1>
              <p className="mt-6 text-xl text-gray-700 font-extralight">
                Ready to create an unforgettable journey for your guests?
              </p>
              
              <div className="mt-8">
                <VoiceflowChat
                  placement="inline"
                  projectId="67925daa7d35e219e09dfbad"
                  apiKey="VF.DM.6792ad82550a82bb336c1592.2YxqANarYt5oAXaJ"
                />
              </div>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="relative lg:col-span-6 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
            <Image
              src="/images/rabbit_hat.jpeg"
              alt="Luxury Travel Experience"
              className="aspect-[3/2] w-full object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-12">
              <div className="text-white">
                <h2 className="font-gilda text-3xl mb-4">Let the magic happen...</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call To Action Section */}
      <div className="relative h-[500px] bg-gray-900">
      <Image src="/images/cta_image.jpg" alt="Luxury Travel Experience" fill style={{ objectFit: "cover" }} />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h2 className="font-gilda text-4xl md:text-5xl mb-6">Join the new luxury travel ecosystem</h2>
            <p className="font-hanken font-extralight mb-8 text-lg">
              Powered by travel specialists bringing the luxury experts for luxury travel
            </p>
            <a href="#engage" className="inline-block bg-[hsla(23,91.9%,29.53%,1)] px-8 py-4 uppercase tracking-widest text-sm font-light hover:bg-[hsla(23,91.9%,35%,1)] transition-all duration-300">
              Engage With Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
