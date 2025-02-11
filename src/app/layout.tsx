import type { Metadata } from 'next';
import { Gilda_Display, Hanken_Grotesk } from 'next/font/google';
import './globals.css';

const gilda = Gilda_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-gilda',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hanken',
});

export const metadata: Metadata = {
  title: 'Luxury Travel Planning',
  description: 'Plan your luxury travel experience with AI assistance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${gilda.variable} ${hanken.variable}`}>
      <body className={hanken.className}>{children}</body>
    </html>
  );
} 