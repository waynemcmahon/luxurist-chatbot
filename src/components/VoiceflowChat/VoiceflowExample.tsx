'use client';

import { VoiceflowEmbed } from './VoiceflowEmbed';

export const VoiceflowExample = () => {
  return (
    <div className="flex flex-col space-y-8 w-full">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold gilda-display text-gray-900">Voiceflow Chat Integration</h2>
        <p className="hanken-grotesk text-gray-500">
          Share some details about a trip you are interested in creating, and our concierge experts will craft a bespoke trip delivered to your inbox
        </p>
      </div>
      
      <div className="w-full h-[600px] border border-gray-200">
        <VoiceflowEmbed
          projectId="YOUR_PROJECT_ID"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}; 