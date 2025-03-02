"use client";

import React from "react";
import { VoiceflowChatDemo } from "@/components/VoiceflowChat/VoiceflowChat";

export default function EmbedDemoPage() {
  return (
    <div className="h-screen w-full bg-transparent">
      <VoiceflowChatDemo
        placement="inline"
        projectId="67925daa7d35e219e09dfbad"
        apiKey="VF.DM.6792ad82550a82bb336c1592.2YxqANarYt5oAXaJ"
        showHeaderAndTitle={false}
      />
    </div>
  );
} 