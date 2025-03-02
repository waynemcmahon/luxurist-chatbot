"use client";

import React from "react";
import { VoiceflowChatDemo } from "@/components/VoiceflowChat/VoiceflowChat";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-gilda text-gray-900 mb-2">Luxurist Chatbot Demo</h1>
          <p className="text-gray-600 font-hanken">This is a demonstration of our Magic Quote chatbot</p>
        </div>
        
        <div className="shadow-xl rounded-xl overflow-hidden">
          <VoiceflowChatDemo
            placement="inline"
            projectId="67925daa7d35e219e09dfbad"
            apiKey="VF.DM.6792ad82550a82bb336c1592.2YxqANarYt5oAXaJ"
            showHeaderAndTitle={true}
          />
        </div>
      </div>
    </div>
  );
} 