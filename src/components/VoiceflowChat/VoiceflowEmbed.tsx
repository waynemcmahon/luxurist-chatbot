'use client';

import { useEffect, useRef } from 'react';

interface VoiceflowEmbedProps {
  projectId: string;
  apiKey?: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const VoiceflowEmbed = ({
  projectId,
  apiKey,
  width = '100%',
  height = '600px',
  style,
  className,
}: VoiceflowEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  const chatInitialized = useRef(false);
  // Generate a unique ID for each instance
  const chatFrameId = useRef(`voiceflow-chat-frame-${Math.random().toString(36).substring(2, 9)}`);

  useEffect(() => {
    // Clean up function to remove any previous instances
    const cleanup = () => {
      // Remove any existing script elements to prevent duplicates
      const existingScript = document.getElementById('voiceflow-chat-script');
      if (existingScript) {
        existingScript.remove();
      }
      
      // Reset initialization state
      chatInitialized.current = false;
    };
    
    // Clean up before initializing
    cleanup();

    // Create script element
    const script = document.createElement('script');
    script.id = 'voiceflow-chat-script';
    script.type = 'text/javascript';
    script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
    script.async = true;

    script.onload = () => {
      scriptLoaded.current = true;
      
      if (!chatInitialized.current && containerRef.current && window.voiceflow?.chat) {
        chatInitialized.current = true;
        console.log(projectId)
        // Initialize chat
        try {
          window.voiceflow.chat.load({
            verify: { projectID: projectId },
            url: 'https://general-runtime.voiceflow.com',
            versionID: 'production',
            render: {
              mode: 'embedded',
              target: containerRef.current
            },
            // Start the chat automatically
            autostart: true
          });
          
          // Ensure the chat is embedded properly
          if (containerRef.current) {
            containerRef.current.setAttribute('data-vf-mode', 'embedded');
          }
        } catch (error: unknown) {
          console.error('Failed to initialize Voiceflow chat:', error);
          chatInitialized.current = false;
        }
      }
    };

    document.body.appendChild(script);

    // Clean up when component unmounts
    return () => {
      cleanup();
      
      // Remove the script element
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [projectId]); // Only re-run if projectId changes

  // Add custom styling
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.id = 'voiceflow-custom-style';
    styleEl.textContent = `
      :root {
        --vf-primary-color: hsla(23, 91.9%, 29.53%, 1); 
        --vf-primary-hover-color: hsla(23, 91.9%, 25%, 1);
        --vf-assistant-bg-color: #f3f4f6;
        --vf-user-bg-color: hsla(23, 91.9%, 29.53%, 1);
        --vf-bubble-border-radius: 2px;
      }
      
      /* Hide the Voiceflow watermark */
      .vfrc-footer--watermark {
        display: none !important;
      }
      
      /* Optional: Adjust the footer styling if needed */
      .vfrc-footer {
        padding: 8px !important; 
      }
    `;
    
    if (!document.getElementById('voiceflow-custom-style')) {
      document.head.appendChild(styleEl);
    }
    
    return () => {
      if (styleEl.parentNode) {
        styleEl.parentNode.removeChild(styleEl);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      id={chatFrameId.current}
      className={className}
      style={{
        width,
        height,
        ...style
      }}
    />
  );
};

// Simplified exports - only embedded version
export const VoiceflowEmbedded = (props: Omit<VoiceflowEmbedProps, 'mode'>) => {
  return <VoiceflowEmbed {...props} />;
}; 