"use client";

import React from "react";
import { TypeFormChat } from "@/components/TypeFormChat/TypeFormChat";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import Image from "next/image";
import { VoiceflowChatProduction } from "@/components/VoiceflowChat/VoiceflowChat";
import { Cta } from "@/components/Cta";
export default function HomePage() {
  return (
    <>
      <Header />
      {/* Hero Section - Using the background technique from example */}
      <div className="relative bg-[#FDF8F3]">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Left Column - Form Section */}
          <div className="px-6 py-12 lg:col-span-6 lg:px-8 lg:py-24 xl:col-span-8">
            <div className="mx-auto max-w-full lg:mx-0">
              <div className="mb-2 uppercase tracking-widest text-[hsla(23,91.9%,29.53%,1)] text-sm font-light">
                We will craft your luxury itineraries, in <span className="font-semibold">Minutes</span>
              </div>
              <h1 className="mt-4 text-5xl md:text-6xl font-gilda text-gray-900 leading-tight">
                Magic Quote
              </h1>
              <div className="mt-6 space-y-6 font-light">
                <p className="text-xl text-gray-900">
                  Get your Magic Quote in just <span className="font-semibold">2 easy steps</span> :
                </p>
                <div className="space-y-4">
                  <p className="text-xl text-gray-900">
                    <span className="font-semibold">Step 1 :</span> Simply share your client's travel project in just 10 seconds.
                  </p>
                  <p className="text-xl text-gray-900">
                    <span className="font-semibold">Step 2 :</span> Our concierge will prepare a customized travel plan according to your specifications, featuring our dynamic pricing system that automatically recalculates costs whenever you adjust any part of the itinerary. We'll deliver this directly to your email inbox.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 h-[600px] flex">
                <div className="flex-1 flex flex-col">
                  <VoiceflowChatProduction
                    placement="inline"
                    projectId="67925daa7d35e219e09dfbad"
                    apiKey="VF.DM.6792ad82550a82bb336c1592.2YxqANarYt5oAXaJ"
                    showHeaderAndTitle={false}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="relative lg:col-span-6 xl:absolute xl:inset-0 xl:left-2/3 rounded-xl m-12">
            <Image
              src="/images/rabbit_magic_portrait.jpg"
              alt="Luxury Travel Experience"
              className="aspect-[3/2] w-full object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full rounded-xl"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <div className="absolute inset-0 bg-opacity-30 flex items-end p-16">
              <div className="text-white">
                <h2 className="font-gilda text-3xl mb-4">Let the magic happen...</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call To Action Section */}

      <Cta />
      <Footer />
    </>
  );
}
