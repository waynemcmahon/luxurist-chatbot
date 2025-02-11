import React from 'react';
import ReactDOM from 'react-dom';
import { VoiceflowChat } from '../components/VoiceflowChat/VoiceflowChat';
import '../components/VoiceflowChat/VoiceflowChat.css';

interface WebflowChatConfig {
  projectId: string;
  apiKey: string;
  placement?: 'inline' | 'floating';
  containerId?: string;
}

const initChat = (config: WebflowChatConfig) => {
  const { projectId, apiKey, placement = 'floating', containerId } = config;

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
        initialMessage="Hi there! I'm your luxury travel concierge. How can I help you plan your perfect getaway?"
      />,
      floatingContainer
    );
  }
};

// Export for use in Webflow
export { initChat }; 