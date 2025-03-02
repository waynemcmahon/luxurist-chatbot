import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  transparentHeader?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  transparentHeader = false 
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header transparent={transparentHeader} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}; 