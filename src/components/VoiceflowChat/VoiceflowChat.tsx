'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

interface VoiceflowChatProps {
  projectId: string;
  apiKey: string;
  placement?: 'inline' | 'floating';
  initialMessage?: string;
  isSimulation?: boolean;
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

interface SimulationStep {
  question: string;
  response?: string;
  delay: number;
  isEnd?: boolean;
}

export const VoiceflowChat = ({
  projectId,
  apiKey,
  placement = 'floating',
  initialMessage = 'Hey! Ready to plan your trip?',
  isSimulation = false
}: VoiceflowChatProps) => {
  const [visible, setVisible] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [buttons, setButtons] = useState<Button[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const userId = useRef(`user-${Math.random().toString(36).substring(7)}`);
  const [currentStep, setCurrentStep] = useState(0);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    city: '',
    people: '',
    interests: '',
    travelDate: ''
  });

  const containerClasses = placement === 'inline'
    ? 'w-full h-full min-h-[400px]'
    : 'fixed bottom-5 right-5 w-[350px] h-[500px] z-50 shadow-lg rounded-xl bg-white';

  // Add useEffect to scroll to bottom when messages change
  useEffect(() => {
    const messagesContainer = document.querySelector('.overflow-y-auto');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages, buttons]); // Scroll when messages or buttons change

  const scrollToBottom = () => {
    const messagesContainer = document.querySelector('.overflow-y-auto');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
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
        //setTimeout(scrollToBottom, 100);
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

  const simulationSteps: SimulationStep[] = [
    {
      question: "Hi! I'd love to help you with your perfect adventure. What kind of trip would you like to plan?",
      response: "A safari tour in South Africa for me and my wife",
      delay: 1000
    },
    {
      question: "A safari tour in South Africa sounds wonderful! When would you like to travel?",
      response: "June 2024",
      delay: 1500
    },
    {
      question: "Perfect! Could you share your email address so I can send you a detailed safari itinerary?",
      response: "john.smith@email.com",
      delay: 1500
    },
    {
      question: "Great! I'll craft a luxurious South African safari experience for you and your wife in June 2024. You'll receive a detailed itinerary at john.smith@email.com shortly. Let us know if there's anything else we can do for you!",
      isEnd: true,
      delay: 2000
    }
  ];

  const runSimulation = useCallback(async () => {
    if (!isSimulation || simulationComplete) return;

    const addMessage = (content: string, type: 'assistant' | 'user') => {
      setMessages(prev => [...prev, { type, content }]);
    };

    for (let i = 0; i < simulationSteps.length; i++) {
      const step = simulationSteps[i];
      
      // Show typing indicator before assistant's message
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Show typing for 1.5s
      setIsLoading(false);
      
      // Add assistant's question
      addMessage(step.question, 'assistant');
      await new Promise(resolve => setTimeout(resolve, step.delay));

      // If not the last step and has response, add user's response
      if (!step.isEnd && step.response) {
        addMessage(step.response, 'user');
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCurrentStep(i + 1);
      }
    }

    setSimulationComplete(true);
  }, [isSimulation, simulationComplete]);

  const handleStartChat = async () => {
    if (!privacyChecked) return;
    setShowChat(true);
    // Start conversation after animation
    setTimeout(async () => {
      setVisible(true);
      if (isSimulation) {
        runSimulation();
      } else {
        await interact({ type: 'launch' });
      }
    }, 500);
  };

  if (!showChat) {
    return (
      <div className={`${containerClasses} flex flex-col space-y-8 welcome-screen`}>
        <div>
        <span className="text-2xl gilda-display leading-tight font-extralight text-gray-700 block" style={{
          fontFamily: 'Gilda Display',
        }}>
        Ready to create an unforgettable journey for your guests?
        </span>
        <span className="mt-4 gilda-display text-gray-800 block" style={{
          fontFamily: 'Hanken Grotesk',
        }}> Share some details about a trip you are interested in creating, and our concierge experts will craft a bespoke trip delivered to your inbox.
        </span>
        <span className="mt-4 text-gray-800 font-extralight block" style={{
          fontFamily: 'Hanken Grotesk',
        }}>
        Simply click the button below to get started.
        </span >
        </div>
        
        
        <button
          onClick={handleStartChat}
          disabled={!privacyChecked}
          style={{
            fontFamily: 'Gilda Display',
          }}
          className={`
            w-full px-8 py-4 text-white bg-[hsla(23,91.9%,29.53%,1)] hover:bg-[hsla(23,91.9%,25%,1)] text-lg font-gilda font-normal tracking-widest
            transition-all duration-300 ease-in-out transform
            ${privacyChecked 
              ? 'w-full md:w-auto transition-colors'
              : 'cursor-not-allowed'
            }
          `}
        >
          LET'S START
        </button>
        <div className="flex items-start space-x-2 mt-4">
          <input
            type="checkbox"
            id="privacy-consent"
            checked={privacyChecked}
            onChange={(e) => setPrivacyChecked(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="privacy-consent" className="text-xs hanken-grotesk font-extralight text-gray-600">
            I CONSENT TO RECEIVE COMMUNICATIONS AS PER THE{' '}
            <a href="#" className="underline hover:text-primary">
              PRIVACY POLICY
            </a>
          </label>
        </div>
      </div>
    );
  }

  return (
    <div
      id="voiceflow-chat-container"
      className={`bg-white rounded-xl shadow-lg p-8 transition-all duration-500 ease-in-out hanken-grotesk ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${containerClasses}`}
      aria-live="polite"
      role="region"
      aria-label="Chat interface"
    >
      {/* Chat Header */}
      <div>
      <div className="border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold gilda-display text-gray-900">Magic Quote</h2>
      </div>
      <div className="flex flex-col h-[calc(450px-8rem)]">
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} message ${message.type}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 hanken-grotesk ${
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
              <div className="bg-secondary text-text rounded-lg px-4 py-2 typing hanken-grotesk">
                typing...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

      </div>
      </div>

      {/* Chat messages */}
     
        

        {/* Button choices */}
        {buttons.length > 0 && (
          <div className="py-4 space-y-2">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(button)}
                className="w-full text-left px-4 py-2 rounded-lg choice-button gilda-display"
              >
                {button.name}
              </button>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="border-t pt-4 input-area mt-auto">
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
              placeholder={isSimulation ? "This is a demo conversation..." : "Share your travel vision..."}
              className="flex-1 px-4 py-2 rounded-lg focus:outline-none hanken-grotesk"
              disabled={isSimulation || isLoading}
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={isSimulation || isLoading || !inputValue.trim()}
              className="px-4 py-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed gilda-display"
              aria-label="Send message"
            >
              Send
            </button>
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