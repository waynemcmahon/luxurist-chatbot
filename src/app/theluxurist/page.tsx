"use client";

import { VoiceflowChatProduction } from "@/components/VoiceflowChat/VoiceflowChat";
import MagicContainer from "@/components/Layout/MagicContainer";
import { VoiceflowEmbed } from "@/components/VoiceflowChat/VoiceflowEmbed";

export default function EmbedPage() {
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
                  {/* <VoiceflowChatProduction
                    placement="inline"
                    projectId="67aa694df1b2f4adafba3e7f"
                    apiKey="VF.DM.67ab976fdff1966a91447558.CImdqyUJEKp6iym7"
                    showHeaderAndTitle={false}
                  /> */}
                   <VoiceflowChatProduction
                    placement="inline"
                    projectId="67925daa7d35e219e09dfbad"
                    apiKey="VF.DM.6792ad82550a82bb336c1592.2YxqANarYt5oAXaJ"
                    showHeaderAndTitle={false}
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
