"use client";

import React, { useEffect } from "react";
import { TypeFormChat } from "@/components/TypeFormChat/TypeFormChat";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import Image from "next/image";
import { VoiceflowChatProduction } from "@/components/VoiceflowChat/VoiceflowChat";
import { Cta } from "@/components/Cta";
import MagicContainer from "@/components/Layout/MagicContainer";
export default function HomePage() {
  // Function to handle iframe load event
  const handleIframeLoaded = () => {
    console.log("Iframe loaded successfully");
    // Add any additional logic needed when the iframe loads
  };

  return (
    <MagicContainer>
    {/* <VoiceflowChatProduction
      placement="inline"
      projectId="67925daa7d35e219e09dfbad"
      apiKey="VF.DM.6792ad82550a82bb336c1592.2YxqANarYt5oAXaJ"
      showHeaderAndTitle={false}
      /> */}
      <div className="w-full h-full">
      <div className="h-[350px] 2xl:h-[450px] flex">
              <div className="flex-1 flex flex-col">
                <iframe 
                  id="onboarding-iframe"
                  onLoad={handleIframeLoaded}
                  src="https://www.theluxurist.app/onboarding/" 
                  className="w-full h-full border-none overflow-auto"
                  title="Onboarding Form"
                  aria-label="Onboarding Form for The Luxurist"
                />
                
{/* 
      <VoiceflowEmbed
      projectId="67925daa7d35e219e09dfbad"
      apiKey="VF.DM.6792ad82550a82bb336c1592.2YxqANarYt5oAXaJ"
      /> */}
  
              </div>
            </div>
      </div>

  </MagicContainer>
  );
}
