import React from 'react';
import ReactDOM from 'react-dom';
import { VoiceflowChat } from '../components/VoiceflowChat/VoiceflowChat';
import '../components/VoiceflowChat/VoiceflowChat.css';

interface WebflowChatConfig {
  projectId: string;
  apiKey: string;
  placement?: 'inline' | 'floating';
  containerId?: string;
  isSimulation?: boolean;
}

function initChat(config: WebflowChatConfig) {
  const { projectId, apiKey, placement = 'floating', containerId, isSimulation = false } = config;

  // If containerId is provided, render inline
  if (containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }

    ReactDOM.render(
      <VoiceflowChat
        projectId={projectId}
        apiKey={apiKey}
        placement="inline"
        isSimulation={isSimulation}
        initialMessage="Hi there! I'm your luxury travel concierge. How can I help you plan your perfect getaway?"
      />,
      container
    );
  } else {
    // Create container for floating chat
    const floatingContainer = document.createElement('div');
    floatingContainer.id = 'luxurist-chatbot-container';
    document.body.appendChild(floatingContainer);

    ReactDOM.render(
      <VoiceflowChat
        projectId={projectId}
        apiKey={apiKey}
        placement="floating"
        isSimulation={isSimulation}
        initialMessage="Hi there! I'm your luxury travel concierge. How can I help you plan your perfect getaway?"
      />,
      floatingContainer
    );
  }
}

// Export the initChat function directly
const LuxuristChatbot = { initChat };
export default LuxuristChatbot; 