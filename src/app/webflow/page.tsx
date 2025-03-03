'use client'

import React from 'react';
import ReactDOM from 'react-dom';
import { VoiceflowChat } from '../../components/VoiceflowChat/VoiceflowChat';
import { TypeFormChat } from '../../components/TypeFormChat/TypeFormChat';
import '../../components/VoiceflowChat/VoiceflowChat.css';
import '../../app/globals.css'; // Import global styles for TypeForm

interface WebflowChatConfig {
  projectId?: string;
  apiKey?: string;
  containerId: string;
  isSimulation?: boolean;
  mode: 'chat' | 'typeform';
  formspark?: {
    formId: string;
  };
  googleSheets?: {
    sheetUrl: string;
  };
  initialMessage?: string;
}

function initChat(config: WebflowChatConfig) {
  console.log('Initializing chat with config:', config);
  
  const { 
    projectId, 
    apiKey, 
    containerId,
    isSimulation = false,
    mode,
    formspark,
    googleSheets,
    initialMessage = "Hi there! I'm your luxury travel concierge. How can I help you plan your perfect getaway?"
  } = config;

  console.log('Mode:', mode);

  // Get container first
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }

  console.log('Container found:', containerId);

  // Validate configuration based on mode
  if (mode === 'chat') {
    if (!projectId || !apiKey) {
      console.error('Project ID and API Key are required for chat mode');
      return;
    }
    console.log('Rendering Voiceflow chat...');
    ReactDOM.render(
      <VoiceflowChat
        projectId={projectId}
        apiKey={apiKey}
        placement="inline"
        isSimulation={isSimulation}
        initialMessage={initialMessage}
      />,
      container
    );
  } else if (mode === 'typeform') {
    if (!formspark?.formId) {
      console.error('Formspark form ID is required for typeform mode');
      return;
    }
    console.log('Rendering TypeForm chat...');
    try {
      ReactDOM.render(
        <TypeFormChat
          placement="inline"
          formsparkId="Ku1lXEbvx"
          googleSheetsUrl="https://script.google.com/macros/s/AKfycby9fY9jU76Rb0xVSLNqIiEZgO2-FE7sh4lK1eBFd5-wE6EWXEnMOHr2FM9L9aZ-kCxl5A/exec"
        />,
        container
      );
      console.log('TypeForm rendered successfully');
    } catch (error) {
      console.error('Error rendering TypeForm:', error);
    }
  } else {
    console.error('Invalid mode specified:', mode);
  }
}

// Create the chatbot object
const LuxuristChatbot = {
  initChat: initChat
};

// Export for both module and window usage
export default LuxuristChatbot;

// Explicitly set on window for TypeScript
declare global {
  interface Window {
    LuxuristChatbot: {
      initChat: typeof initChat;
    };
  }
}

// Expose to window object
if (typeof window !== 'undefined') {
  window.LuxuristChatbot = LuxuristChatbot;
} 