import React from 'react';
import type { Metadata } from 'next';

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
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
} 