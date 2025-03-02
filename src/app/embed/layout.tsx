import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Luxurist Chat',
  description: 'Luxury travel planning chat interface',
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full">
      {children}
    </div>
  );
} 