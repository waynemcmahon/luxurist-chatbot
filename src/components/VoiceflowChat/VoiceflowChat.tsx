'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

interface VoiceflowChatProps {
  projectId: string;
  apiKey: string;
  placement?: 'inline' | 'floating';
  initialMessage?: string;
}

interface Message {
  type: 'user' | 'assistant';
  content: string;
}

interface Button {
  name: string;
  request: {
    type: string;
    payload: string;
  };
}

export const VoiceflowChat = ({
  projectId,
  apiKey,
  placement = 'floating',
  initialMessage = 'Hey! Ready to plan your trip?'
}: VoiceflowChatProps) => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [buttons, setButtons] = useState<Button[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const userId = useRef(`user-${Math.random().toString(36).substring(7)}`);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const interact = async (request: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://general-runtime.voiceflow.com/state/user/${userId.current}/interact`,
        {
          method: 'POST',
          headers: {
            'Authorization': apiKey,
            'versionID': 'production',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            request,
            config: {
              tts: false,
              stripSSML: true,
              stopAll: true,
              excludeTypes: ['debug', 'flow', 'block', 'log']
            }
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Voiceflow API returned ${response.status}`);
      }

      const traces = await response.json();
      
      if (!Array.isArray(traces)) {
        throw new Error('Invalid response format from Voiceflow API');
      }

      let newMessages: Message[] = [];
      let newButtons: Button[] = [];

      for (const trace of traces) {
        if (trace.type === 'text') {
          newMessages.push({
            type: 'assistant',
            content: trace.payload.message,
          });
        } else if (trace.type === 'choice') {
          newButtons = trace.payload.buttons;
        } else if (trace.type === 'end') {
          console.log('Conversation ended');
        }
      }

      if (newMessages.length > 0) {
        setMessages(prev => [...prev, ...newMessages]);
        setTimeout(scrollToBottom, 100);
      }
      
      if (newButtons.length > 0) {
        setButtons(newButtons);
      }
    } catch (error) {
      console.error('Error interacting with Voiceflow:', error);
      setMessages(prev => [
        ...prev,
        {
          type: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { type: 'user', content: text }]);
    setInputValue('');
    setButtons([]);
    setTimeout(scrollToBottom, 100);

    await interact({ type: 'text', payload: text });
  };

  const handleButtonClick = async (button: Button) => {
    setMessages(prev => [...prev, { type: 'user', content: button.name }]);
    setButtons([]);
    setTimeout(scrollToBottom, 100);
    await interact(button.request);
  };

  useEffect(() => {
    // Start conversation
    const startChat = async () => {
      setVisible(true);
      await interact({ type: 'launch' });
    };
    startChat();
  }, []);

  const containerClasses = placement === 'inline'
    ? 'w-full h-full min-h-[600px] bg-white rounded-xl shadow-md'
    : 'fixed bottom-5 right-5 w-[350px] h-[500px] z-50 shadow-lg rounded-xl bg-white';

  return (
    <div
      id="voiceflow-chat-container"
      className={`transition-opacity duration-500 ease-in-out font-hanken ${visible ? 'opacity-100' : 'opacity-0'} ${containerClasses}`}
      aria-live="polite"
      role="region"
      aria-label="Chat interface"
    >
      {/* Chat Header */}
      <div className="border-b border-gray-100 p-4">
        <h2 className="text-lg font-gilda text-gray-900">Luxury Travel Concierge</h2>
        <p className="text-sm text-gray-500">Your personal travel planning assistant</p>
      </div>

      {/* Chat messages */}
      <div className="flex flex-col h-[calc(100%-8rem)]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} message ${message.type}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.type === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-text'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary text-text rounded-lg px-4 py-2 typing">
                typing...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Button choices */}
        {buttons.length > 0 && (
          <div className="p-4 space-y-2">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(button)}
                className="w-full text-left px-4 py-2 rounded-lg choice-button font-gilda"
              >
                {button.name}
              </button>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="border-t p-4 input-area mt-auto">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }
              }}
              placeholder="Share your travel vision..."
              className="flex-1 px-4 py-2 rounded-lg focus:outline-none"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              className="px-4 py-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed font-gilda"
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add TypeScript declarations for Voiceflow
declare global {
  interface Window {
    voiceflow?: {
      chat: {
        load: (config: {
          verify: { projectID: string };
          url: string;
          versionID: string;
        }) => void;
        sendText: (message: string) => void;
      };
    };
  }
} 