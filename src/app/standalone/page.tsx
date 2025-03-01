"use client"

import React from 'react';
import { Layout } from '@/components/Layout/Layout';
import { TypeFormChat } from '@/components/TypeFormChat/TypeFormChat';
import Image from 'next/image';

export default function StandalonePage() {
  return (
    <Layout>
      <div className="bg-[#FDF8F3] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl gilda-display text-gray-800 mb-4">
                Your Luxury Travel Journey Begins Here
              </h1>
              <p className="text-lg md:text-xl text-gray-600 hanken-grotesk max-w-2xl mx-auto">
                Share your travel vision with us, and our expert concierges will craft a bespoke itinerary tailored just for you.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <TypeFormChat 
                placement="inline"
                formsparkId={process.env.NEXT_PUBLIC_FORMSPARK_ID || ''}
                googleSheetsUrl={process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL}
              />
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-[hsla(23,91.9%,95%,1)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-[hsla(23,91.9%,29.53%,1)]">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-gilda text-gray-800 mb-2">Personalized Itineraries</h3>
                <p className="text-gray-600 font-extralight">
                  Custom-crafted travel plans that perfectly match your preferences and dreams.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-[hsla(23,91.9%,95%,1)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-[hsla(23,91.9%,29.53%,1)]">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-gilda text-gray-800 mb-2">Expert Concierges</h3>
                <p className="text-gray-600 font-extralight">
                  Our experienced team brings insider knowledge and exclusive access to your journey.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-[hsla(23,91.9%,95%,1)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-[hsla(23,91.9%,29.53%,1)]">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-gilda text-gray-800 mb-2">Quick Response</h3>
                <p className="text-gray-600 font-extralight">
                  Receive your custom itinerary within minutes, complete with pricing and booking options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 