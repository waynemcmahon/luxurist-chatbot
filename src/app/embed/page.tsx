"use client"

import React from 'react';
import { TypeFormChat } from '@/components/TypeFormChat/TypeFormChat';

export default function EmbedPage() {
  return (
    <div className="w-full h-full">
      <TypeFormChat 
        placement="inline"
        formsparkId={process.env.NEXT_PUBLIC_FORMSPARK_ID || ''}
        googleSheetsUrl={process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL}
      />
    </div>
  );
} 