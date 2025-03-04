"use client";

import { Cta } from "@/components/Cta";
import { TypeFormChat } from "@/components/TypeFormChat/TypeFormChat";
import Image from "next/image";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { motion } from "framer-motion";

// Animation variants for staggered animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: custom * 0.2,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export default function MagicContainer({children}: {children: React.ReactNode}) {
  return (
    <div>
        <Header />
    <div className="h-[calc(100vh-100px)] flex flex-col">
      
      {/* Main section with TypeFormChat component */}
      <section className="flex-1 flex flex-col lg:flex-row-reverse ">
        {/* Left column - Image */}
        <motion.div 
          className="w-full lg:w-1/3 relative h-[40vh] lg:h-[calc(100vh-100px)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <Image
            src="/images/rabbit_magic_portrait.jpg"
            alt="Luxury Travel Experience"
            className="object-cover"
            fill
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
          <motion.div 
            className="absolute top-6 left-6 z-10"
            initial="hidden"
            animate="visible"
            custom={0.6}
            variants={fadeIn}
          >
            <h2 className="font-gilda text-4xl text-white hidden md:block font-light leading-tight">
              Magic<span className="text-[#906d4e]">Quote</span>
            </h2>
          </motion.div>
          
          {/* Let the magic begin text */}
          <motion.div 
            className="absolute bottom-0 md:right-0 md:mb-8 mb-4 mr-8"
            initial="hidden"
            animate="visible"
            custom={1.4}
            variants={fadeIn}
          >
            <div className="px-8 px-4 md:py-6 py-4">
              <h3 className="font-gilda text-3xl text-white">
                Let the <span className="md:text-[#906d4e]">Magic</span> begin...
              </h3>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Right column - TypeFormChat Component */}
        <div className="w-full lg:w-2/3 flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-white">
          <div className="max-w-xl mx-auto w-full">
            <motion.div 
              className="mb-2 uppercase tracking-widest text-[#913b06] text-sm font-light"
              initial="hidden"
              animate="visible"
              custom={0.4}
              variants={fadeIn}
            >
              We will craft your luxury itineraries, in <span className="font-semibold">Minutes</span>
            </motion.div>
            <motion.h1 
              className="mt-4 text-5xl md:text-6xl font-gilda text-gray-900 leading-tight"
              initial="hidden"
              animate="visible"
              custom={0.6}
              variants={fadeIn}
            >
              Magic Quote
            </motion.h1>
            <motion.div 
              className="mt-6 space-y-6 font-light"
              initial="hidden"
              animate="visible"
              custom={0.8}
              variants={fadeIn}
            >
              <p className="text-lg md:text-xl text-gray-900">
                Get your Magic Quote in just <span className="font-semibold">2 easy steps</span> :
              </p>
              <div className="space-y-4">
                <motion.p 
                  className="text-lg md:text-xl text-gray-900"
                  initial="hidden"
                  animate="visible"
                  custom={1.0}
                  variants={fadeIn}
                >
                  <span className="font-semibold">Step 1 :</span> Simply share your client's travel project in just 10 seconds.
                </motion.p>
                <motion.p 
                  className="text-lg md:text-xl text-gray-900"
                  initial="hidden"
                  animate="visible"
                  custom={1.2}
                  variants={fadeIn}
                >
                  <span className="font-semibold">Step 2 :</span> Our concierge will prepare a customized travel plan according to your specifications, featuring our dynamic pricing system that automatically recalculates costs whenever you adjust any part of the itinerary. We'll deliver this directly to your email inbox.
                </motion.p>
              </div>
            </motion.div>
            
            {/* TypeFormChat component displayed directly */}
            <motion.div 
              className="mt-8 min-h-[400px] flex"
              initial="hidden"
              animate="visible"
              custom={1.6}
              variants={fadeIn}
            >
            {children}
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Cta component */}
      <motion.div 
        className=""
        initial="hidden"
        animate="visible"
        custom={2.0}
        variants={fadeIn}
      >
      <Cta />
      </motion.div>
    </div>
    {/* <Footer /> */}
    </div>

  );
}
