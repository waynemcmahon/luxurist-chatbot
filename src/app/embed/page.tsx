"use client"

import React from 'react';
import { VoiceflowChatProduction } from '@/components/VoiceflowChat/VoiceflowChat';

export default function EmbedPage() {
  return (
    <div className="h-screen w-full bg-transparent">
      <VoiceflowChatProduction
        placement="inline"
        projectId="67925daa7d35e219e09dfbad"
        apiKey="VF.DM.6792ad82550a82bb336c1592.2YxqANarYt5oAXaJ"
        showHeaderAndTitle={false}
      />
    </div>
  );
} 