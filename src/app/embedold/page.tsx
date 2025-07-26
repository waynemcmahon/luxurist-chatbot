'use client'

//import { TypeFormChat } from "@/components/TypeFormChat/TypeFormChat";

export default function EmbedPage() {
  return (
    <main className="min-h-screen bg-[#FDF8F3]">
      {/* Mobile-only Magic Quote Header */}
      <header className="lg:hidden text-center py-4 bg-white border-b">
        <div className="uppercase tracking-widest text-[hsla(23,91.9%,29.53%,1)] text-sm font-light mb-1">
          We will craft your luxury itineraries
        </div>
        <h1 className="text-2xl font-gilda text-[#0f0f0f]">Magic Quote</h1>
      </header>
      
      {/* Chat Container */}
      <div className="h-[calc(100vh-theme(space.16))] lg:h-screen">
        {/* <TypeFormChat 
          placement="inline"
          formsparkId={process.env.NEXT_PUBLIC_FORMSPARK_ID || ''}
          googleSheetsUrl={process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL}
        /> */}
      </div>
    </main>
  );
} 