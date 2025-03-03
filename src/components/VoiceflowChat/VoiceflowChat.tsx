'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

interface VoiceflowChatProps {
  projectId: string;
  apiKey: string;
  placement?: 'inline' | 'floating';
  initialMessage?: string;
  isSimulation?: boolean;
  showHeaderAndTitle?: boolean;
}

interface Message {
  type: 'user' | 'assistant';
  content: string;
  id: string; // Add unique ID to prevent duplicate rendering
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
  isSimulation = false,
  showHeaderAndTitle = true
}: VoiceflowChatProps) => {
  const [visible, setVisible] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [buttons, setButtons] = useState<Button[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const userId = useRef(`user-${Math.random().toString(36).substring(7)}`);
  const [currentStep, setCurrentStep] = useState(0);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const conversationStarted = useRef(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    city: '',
    people: '',
    interests: '',
    travelDate: ''
  });

  // Dynamic container classes based on placement
  const containerClasses = placement === 'inline'
    ? 'w-full h-full bg-white rounded-xl shadow-lg flex flex-col'
    : 'fixed bottom-5 right-5 w-[350px] h-[500px] z-50 shadow-lg rounded-xl bg-white flex flex-col';

  // Dynamic content container classes based on placement
  const contentContainerClasses = 'flex flex-col h-full';

  // Dynamic height for message container based on placement and header visibility
  const getMessageContainerHeight = () => {
    return 'flex-1 overflow-y-auto min-h-0';
  };

  // Add useEffect to scroll to bottom when messages change
  useEffect(() => {
    const messagesContainer = document.querySelector('.overflow-y-auto');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages, buttons]); // Scroll when messages or buttons change

  // Start conversation when component mounts
  useEffect(() => {
    const initConversation = async () => {
      if (conversationStarted.current) return;
      
      conversationStarted.current = true;
      
      if (isSimulation) {
        runSimulation();
      } else {
        await interact({ type: 'launch' });
      }
    };
    
    initConversation();
  }, [isSimulation]);

  const scrollToBottom = () => {
    const messagesContainer = document.querySelector('.overflow-y-auto');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  // Generate a unique ID for messages
  const generateMessageId = () => {
    return Math.random().toString(36).substring(2, 15);
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
            id: generateMessageId()
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
          id: generateMessageId()
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { 
      type: 'user', 
      content: text,
      id: generateMessageId()
    }]);
    setInputValue('');
    setButtons([]);
    setTimeout(scrollToBottom, 100);

    await interact({ type: 'text', payload: text });
  };

  const handleButtonClick = async (button: Button) => {
    setMessages(prev => [...prev, { 
      type: 'user', 
      content: button.name,
      id: generateMessageId()
    }]);
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
      setMessages(prev => [...prev, { 
        type, 
        content,
        id: generateMessageId()
      }]);
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

  return (
    <div
      id="voiceflow-chat-container"
      className={`transition-all duration-500 ease-in-out hanken-grotesk ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${containerClasses}`}
      aria-live="polite"
      role="region"
      aria-label="Chat interface"
    >
      <div className={contentContainerClasses}>
        {/* Chat Header */}
        {showHeaderAndTitle && (
          <div className="border-b border-gray-100 p-6 flex-shrink-0">
            <h2 className="text-2xl font-bold gilda-display text-gray-900">Magic Quote</h2>
            <p className="hanken-grotesk text-gray-500 mt-2"> 
              Share some details about a trip you are interested in creating, and our concierge experts will craft a bespoke trip delivered to your inbox
            </p>
          </div>
        )}
        
        {/* Messages Container */}
        <div className={`flex-1 min-h-0 overflow-y-auto`}>
          <div className="p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} message ${message.type}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 hanken-grotesk font-light ${
                    message.type === 'user'
                      ? 'bg-[hsla(23,91.9%,29.53%,1)] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2 typing hanken-grotesk">
                  typing...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Button choices */}
        {buttons.length > 0 && (
          <div className="px-6 py-3 space-y-2 border-t border-gray-100 flex-shrink-0">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(button)}
                className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-800 font-gilda"
              >
                {button.name}
              </button>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="border-t border-gray-100 p-4 flex-shrink-0">
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
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[hsla(23,91.9%,29.53%,0.3)] hanken-grotesk font-light"
              disabled={isSimulation || isLoading}
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={isSimulation || isLoading || !inputValue.trim()}
              className="px-4 py-2 rounded-lg bg-[hsla(23,91.9%,29.53%,1)] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[hsla(23,91.9%,25%,1)] transition-colors gilda-display"
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

// Create a separate export for the demo version
export const VoiceflowChatDemo = (props: Omit<VoiceflowChatProps, 'isSimulation'>) => {
  return <VoiceflowChat {...props} isSimulation={true} />;
};

// Create a separate export for the production version
export const VoiceflowChatProduction = (props: Omit<VoiceflowChatProps, 'isSimulation'>) => {
  return <VoiceflowChat {...props} isSimulation={false} />;
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