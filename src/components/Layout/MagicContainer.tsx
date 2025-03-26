"use client";

import { Cta } from "@/components/Cta";
import { TypeFormChat } from "@/components/TypeFormChat/TypeFormChat";
import Image from "next/image";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { motion } from "framer-motion";
import { Quote } from "@/components/Quote";
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


export default function MagicContainer({children, showHeaderFooter = true, showCta = true, showImage = true}: {children: React.ReactNode, showHeaderFooter?: boolean, showCta?: boolean, showImage?: boolean}) {
  return (
    <div className="bg-[#FDF8F3]">
        {showHeaderFooter && <Header />}
    <div className="mx-auto flex flex-col">
      
      {/* Main section with TypeFormChat component */}
      <section className="flex-1 flex flex-col lg:flex-row-reverse ">
        {/* Left column - Image */}
        {showImage && (
        <motion.div 
          className={`w-full lg:w-2/5 relative h-[30vh] hidden lg:block ${showHeaderFooter ? 'lg:h-[calc(100vh-100px)]' : 'lg:h-[100vh]'}`}
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
            <div className="px-6 md:py-6 py-4">
              <h3 className="font-gilda text-3xl text-white">
                Let the <span className="md:text-[#906d4e]">Magic</span> begin...
              </h3>
            </div>
          </motion.div>
        </motion.div>
        )}
        
        {/* Right column - TypeFormChat Component */}
        <div className={`w-full flex flex-col justify-center my-8  p-8 md:p-12 lg:p-16 ${showImage ? 'lg:w-3/5' : 'lg:w-full'}`}>
          <div className="max-w-4xl mx-auto w-full">
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
              className="mt-4 md:mt-6 space-y-6 font-light"
              initial="hidden"
              animate="visible"
              custom={0.8}
              variants={fadeIn}
            >
              {/* <p className="text-lg md:text-xl text-gray-900">
                Get your Magic Quote in just <span className="font-semibold">2 easy steps</span>:
              </p> */}
              <div className="space-y-4">
                <motion.p 
                  className="text-lg md:text-xl max-w-2xl text-gray-900"
                  initial="hidden"
                  animate="visible"
                  custom={1.0}
                  variants={fadeIn}
                >
                  Simply share your client's project here below and our concierge team will send you back a full quoted itinerary in a few minutes in your inbox    
                </motion.p>
              </div>
            </motion.div>
            
            {/* TypeFormChat component displayed directly */}
            <motion.div 
              className="mt-4 md:mt-8 flex"
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
        {/* <Quote /> */}
      {showCta && <Cta />}
      </motion.div>
    </div>
      {showHeaderFooter && <Footer />}
    </div>

  );
}