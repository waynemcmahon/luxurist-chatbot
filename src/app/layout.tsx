import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';

export const metadata: Metadata = {
  title: 'The Luxurist - Luxury Travel Experiences',
  description: 'Create unforgettable luxury travel experiences with The Luxurist. Our expert concierges will craft a bespoke itinerary tailored just for you.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gilda+Display&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500&display=swap" />
      </head>
      <body>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
} 