'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { COUNTRIES } from '@/helpers';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceflowChatProps {
  projectId: string;
  apiKey: string;
  placement?: 'inline' | 'floating';
  initialMessage?: string;
  isSimulation?: boolean;
  showHeaderAndTitle?: boolean;
}

interface Country {
  code: string;
  name: string;
}

interface Message {
  type: 'user' | 'assistant';
  content: string;
  id: string; // Add unique ID to prevent duplicate rendering
  hasDropdown?: boolean; // Add this to track if message should show dropdown
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

// Form validation interface
interface ValidationState {
  email: {
    isValid: boolean;
    message: string;
  };
}

// Add page state enum
enum FormPage {
  CHAT = 'chat',
  FORM = 'form',
  THANK_YOU = 'thank_you'
}

// Form data interface
interface UserFormData {
  email: string;
  country: string;
  consent: boolean;
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
  const [selectedCountry, setSelectedCountry] = useState<string>('');
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

  // Add state for chat ended flag and form data
  const [chatEnded, setChatEnded] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    country: '',
    consent: true
  });
  const [validation, setValidation] = useState<ValidationState>({
    email: {
      isValid: true,
      message: ''
    }
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<FormPage>(FormPage.CHAT);

  // Add animation tracking state for new messages
  const [newMessageIds, setNewMessageIds] = useState<string[]>([]);

  // Animation variants
  const staggerContainer = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.07
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const staggerItem = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } }
  };

  // Add handler for country selection
  const handleCountrySelect = async (countryName: string) => {
    setSelectedCountry(countryName);
    if (countryName) {
      // Send structured data to Voiceflow
      await interact({ 
        type: 'text', 
        payload: JSON.stringify({
          type: 'country_location_ta',
          country: countryName,
        })
      });
    }
  };

  // Dynamic container classes based on placement
  const containerClasses = placement === 'inline'
    ? 'w-full h-full bg-white shadow-lg flex flex-col border border-gray-200'
    : 'fixed bottom-5 right-5 w-[350px] h-[500px] z-50 shadow-lg bg-white flex flex-col';

  // Dynamic content container classes based on placement
  const contentContainerClasses = 'flex flex-col h-full';

  // Dynamic height for message container based on placement and header visibility
  const getMessageContainerHeight = () => {
    return 'flex-1 overflow-y-auto';
  };

  // Add useEffect to scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
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
    if (chatEndRef.current) {
      const messagesContainer = chatEndRef.current.closest('.overflow-y-auto');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
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
      let newIds: string[] = [];
      let hasEndedChat = false;

      for (const trace of traces) {
        console.log('trace', trace);
        if (trace.type === 'text') {
          const content = trace.payload.message;
          // Remove the dropdown trigger as we'll collect this in the form
          const cleanedContent = content.replace('[DROPDOWN]', '');
          const messageId = generateMessageId();
          newIds.push(messageId);
          newMessages.push({
            type: 'assistant',
            content: cleanedContent,
            id: messageId,
            // Remove dropdown flag as we'll collect this in the form
            hasDropdown: false
          });
        } else if (trace.type === 'choice') {
          newButtons = trace.payload.buttons;
        } else if (trace.type === 'end') {
          console.log('Conversation ended');
          hasEndedChat = true;
        }
      }

      if (newMessages.length > 0) {
        setMessages(prev => [...prev, ...newMessages]);
        setNewMessageIds(newIds);
        setTimeout(() => {
          setNewMessageIds([]);
          scrollToBottom();
        }, 200); // Clear animation state after animation completes
      }
      
      if (newButtons.length > 0) {
        setButtons(newButtons);
      }

      // Set chat ended state if end trace is received
      if (hasEndedChat) {
        setChatEnded(true);
        setCurrentPage(FormPage.FORM);
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

    const messageId = generateMessageId();
    setNewMessageIds([messageId]);
    setMessages(prev => [...prev, { 
      type: 'user', 
      content: text,
      id: messageId
    }]);
    setInputValue('');
    setButtons([]);
    
    setTimeout(() => {
      scrollToBottom();
      setNewMessageIds([]);
    }, 200);

    await interact({ type: 'text', payload: text });
  };

  const handleButtonClick = async (button: Button) => {
    const messageId = generateMessageId();
    setNewMessageIds([messageId]);
    setMessages(prev => [...prev, { 
      type: 'user', 
      content: button.name,
      id: messageId
    }]);
    setButtons([]);
    
    setTimeout(() => {
      scrollToBottom();
      setNewMessageIds([]);
    }, 500);
    
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
      const messageId = generateMessageId();
      setNewMessageIds([messageId]);
      setMessages(prev => [...prev, { 
        type, 
        content,
        id: messageId
      }]);
      
      setTimeout(() => {
        scrollToBottom();
        setNewMessageIds([]);
      }, 500);
    };

    for (let i = 0; i < simulationSteps.length; i++) {
      const step = simulationSteps[i];
      
      // Show typing indicator before assistant's message
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 100)); // Show typing for 1.5s
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

  // Add validation function for email
  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Handle email input change with validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData({ ...formData, email });
    
    // Validate email as user types
    if (email.trim() === '') {
      setValidation({
        email: {
          isValid: false,
          message: 'Email is required'
        }
      });
    } else if (!validateEmail(email)) {
      setValidation({
        email: {
          isValid: false,
          message: 'Please enter a valid email address'
        }
      });
    } else {
      setValidation({
        email: {
          isValid: true,
          message: ''
        }
      });
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validation.email.isValid || !formData.email || !formData.country || !formData.consent) {
      return;
    }
    
    setFormSubmitting(true);
    setSubmitError(null);
    
    // Create the payload to send to Voiceflow
    const payload = {
      type: 'user_info',
      email: formData.email,
      country: formData.country,
      consent: formData.consent,
      timestamp: new Date().toISOString()
    };
    
    // Log the payload being sent to Voiceflow for verification
    console.log("Sending to Voiceflow:", payload);
    
    try {
      // Send the collected data to Voiceflow
      await interact({ 
        type: 'text', 
        payload: JSON.stringify(payload)
      });
      
      // Move to thank you page
      setCurrentPage(FormPage.THANK_YOU);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('There was an error submitting your details. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Common button classes
  const buttonClasses = "w-full py-3 px-4 text-center transition-colors ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-gilda";
  const enabledButtonClasses = "bg-[hsla(23,91.9%,29.53%,1)] text-white hover:bg-[hsla(23,91.9%,25%,1)] shadow-md";

  // Create a form component based on TypeFormChat styling
  const renderFormPage = () => {
    return (
      <motion.div
        key="form-page"
        className="flex flex-col h-full bg-white"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="border-b border-gray-100 p-6 flex-shrink-0">
          <motion.h2 
            variants={staggerItem}
            className="text-2xl font-bold gilda-display text-gray-900"
          >
            Thanks for sharing your project with us!
          </motion.h2>
          <motion.p 
            variants={staggerItem}
            className="hanken-grotesk text-gray-500 mt-2"
          > 
            Please provide your details so we can send you a personalized travel itinerary
          </motion.p>
        </div>

        <motion.form
          onSubmit={handleFormSubmit}
          className="flex flex-col space-y-6 p-6 flex-1"
          variants={staggerContainer}
        >
          <motion.div 
            variants={staggerItem}
            className="space-y-8 flex-1"
          >
            <div className="space-y-4">
              <label htmlFor="email" className="block text-sm hanken-grotesk font-extralight text-gray-600 mb-1">
                Email Address
              </label>
              <motion.input
                variants={staggerItem}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleEmailChange}
                placeholder="Your email"
                required
                className={`w-full p-4 border focus:outline-none focus:ring-2 focus:ring-[hsla(23,91.9%,29.53%,1)] focus:ring-offset-0 focus:border-transparent hanken-grotesk bg-white ${
                  !validation.email.isValid ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'
                }`}
              />
              {!validation.email.isValid && formData.email.trim() !== '' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm hanken-grotesk"
                >
                  {validation.email.message}
                </motion.p>
              )}
            </div>

            <div className="space-y-4">
              <label htmlFor="country" className="block text-sm hanken-grotesk font-extralight text-gray-600 mb-1">
                Which country are you located in?
              </label>
              <motion.select
                variants={staggerItem}
                id="country"
                name="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
                className="w-full p-4 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[hsla(23,91.9%,29.53%,1)] focus:ring-offset-0 focus:border-transparent hanken-grotesk bg-white"
              >
                <option value="">Select your country</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </motion.select>
            </div>

            <motion.div
              variants={staggerItem}
              className="flex items-start space-x-2"
            >
              <input
                type="checkbox"
                id="privacy-consent"
                name="consent"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                required
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-[hsla(23,91.9%,29.53%,1)] focus:ring-offset-0 bg-white"
              />
              <label htmlFor="privacy-consent" className="text-xs hanken-grotesk font-extralight text-gray-600">
                I CONSENT TO RECEIVE COMMUNICATIONS AS PER THE{' '}
                <a href="#" target="_blank" rel="noopener noreferrer" className="underline hover:text-[hsla(23,91.9%,29.53%,1)]">
                  PRIVACY POLICY
                </a>
              </label>
            </motion.div>
          </motion.div>

          {submitError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm hanken-grotesk"
            >
              {submitError}
            </motion.p>
          )}

          <motion.button
            variants={staggerItem}
            type="submit"
            disabled={!validation.email.isValid || !formData.email.trim() || !formData.country || !formData.consent || formSubmitting}
            className={`${buttonClasses} ${
              validation.email.isValid && formData.email.trim() && formData.country && formData.consent && !formSubmitting ? enabledButtonClasses : ''
            }`}
          >
            {formSubmitting ? 'SUBMITTING...' : 'SUBMIT & GET YOUR ITINERARY'}
          </motion.button>
        </motion.form>
      </motion.div>
    );
  };

  // Thank you page component
  const renderThankYouPage = () => {
    return (
      <motion.div
        key="thank-you-page"
        className="flex flex-col h-full items-center justify-center p-8 text-center bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-[hsla(23,91.9%,29.53%,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold gilda-display text-gray-900 mb-4">
          Thank You!
        </h2>
        
        <p className="text-gray-600 hanken-grotesk mb-6">
          We've received your details and will be sending a personalized itinerary to <span className="font-medium">{formData.email}</span> shortly.
        </p>
        
        <button 
          onClick={() => {
            setChatEnded(false);
            setCurrentPage(FormPage.CHAT);
            // Clear the chat for a fresh start
            setMessages([]);
            // Launch a new conversation
            interact({ type: 'launch' });
          }}
          className={`${buttonClasses} ${enabledButtonClasses} max-w-xs`}
        >
          START NEW CONVERSATION
        </button>
      </motion.div>
    );
  };

  // Render based on current page
  const renderContent = () => {
    switch (currentPage) {
      case FormPage.FORM:
        return renderFormPage();
      case FormPage.THANK_YOU:
        return renderThankYouPage();
      case FormPage.CHAT:
      default:
        return (
          <>
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
            <div className={`flex-1 overflow-y-auto`}>
              <div className="p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} message ${message.type} ${
                      newMessageIds.includes(message.id) ? 'animate-fade-up' : ''
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 hanken-grotesk font-light ${
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
                    <div className="bg-gray-100 text-gray-800 px-4 py-4 hanken-grotesk flex items-center space-x-1">
                      <span className="h-2 w-2 bg-gray-500 rounded-full animate-loading-dot"></span>
                      <span className="h-2 w-2 bg-gray-500 rounded-full animate-loading-dot" style={{ animationDelay: '200ms' }}></span>
                      <span className="h-2 w-2 bg-gray-500 rounded-full animate-loading-dot" style={{ animationDelay: '400ms' }}></span>
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
                    className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-gray-800 font-gilda"
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
                  className="flex-1 px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[hsla(23,91.9%,29.53%,0.3)] hanken-grotesk font-light"
                  disabled={isSimulation || isLoading}
                  aria-label="Message input"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={isSimulation || isLoading || !inputValue.trim()}
                  className="px-4 py-2 bg-[hsla(23,91.9%,29.53%,1)] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[hsla(23,91.9%,25%,1)] transition-colors gilda-display"
                  aria-label="Send message"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div
      id="voiceflow-chat-container"
      className={`transition-all duration-500 ease-in-out h-full hanken-grotesk ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${containerClasses}`}
      aria-live="polite"
      role="region"
      aria-label="Chat interface"
    >
      <div className={`${contentContainerClasses} h-full flex flex-col`}>
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
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