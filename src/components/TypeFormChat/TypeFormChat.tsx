import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface TypeFormChatProps {
  placement?: 'inline' | 'floating';
  formsparkId: string;
  googleSheetsUrl?: string;
}

interface FormData {
  vision: string;
  email: string;
  consent: boolean;
  country: string;
  timestamp?: string;
}

interface ValidationState {
  email: {
    isValid: boolean;
    message: string;
  };
}

// Countries list with special handling for Canada
const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
  "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada (English)", "Canada (French)", 
  "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", 
  "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador",
  "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
  "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North",
  "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
  "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
  "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka",
  "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga",
  "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 0},
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 0 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    transition: {
      duration: 0.3
    }
  }
};

const progressVariants = {
  initial: { width: 0 },
  animate: (progress: number) => ({
    width: `${progress}%`,
    transition: { duration: 0.5, ease: "easeInOut" }
  })
};

const ProgressBar: React.FC<{ step: number; totalSteps: number }> = ({ step, totalSteps }) => {
  const progress = (step / (totalSteps - 1)) * 100;

  return (
    <div className="absolute top-0 left-0 right-0">
      <motion.div
        className="h-1 bg-[hsla(23,91.9%,29.53%,1)]"
        variants={progressVariants}
        initial="initial"
        animate="animate"
        custom={progress}
      />
    </div>
  );
};

// Update all button classes to include a better disabled state
const buttonClasses = "w-full px-8 py-4 text-white text-lg font-gilda font-normal tracking-widest transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-300 disabled:hover:scale-100 disabled:cursor-not-allowed";
const enabledButtonClasses = "bg-[hsla(23,91.9%,29.53%,1)] hover:bg-[hsla(23,91.9%,25%,1)]";

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const CheckmarkAnimation = () => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        delay: 0.2
      }
    }
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="w-20 h-20 mx-auto mb-6"
    >
      <motion.svg
        viewBox="0 0 50 50"
        className="w-full h-full"
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx="25"
          cy="25"
          r="23"
          stroke="hsla(23,91.9%,29.53%,1)"
          strokeWidth="2"
          fill="none"
          variants={circleVariants}
        />
        <motion.path
          d="M15 25 L22 32 L35 19"
          fill="transparent"
          stroke="hsla(23,91.9%,29.53%,1)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
        />
      </motion.svg>
    </motion.div>
  );
};

declare global {
  interface Window {
    botpoison: any;
  }
}

export const TypeFormChat: React.FC<TypeFormChatProps> = ({
  placement = 'inline',
  formsparkId,
  googleSheetsUrl
}) => {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    vision: '',
    email: '',
    consent: true,
    country: ''
  });
  const [validation, setValidation] = useState<ValidationState>({
    email: {
      isValid: true,
      message: ''
    }
  });

  const containerClasses = placement === 'inline'
    ? 'w-full bg-white'
    : 'fixed bottom-5 right-5 w-[350px] h-[500px] z-50 shadow-lg rounded-xl bg-white';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Get form data first
      const formDataObj = {
        vision: formData.vision,
        email: formData.email,
        consent: formData.consent,
        country: formData.country,
        timestamp: new Date().toISOString()
      };

      // Submit to FormSpark
      await axios.post(`https://submit-form.com/${formsparkId}`, formDataObj);
      
      // If Google Sheets URL is provided, submit there as well
      if (googleSheetsUrl) {
        try {
          // Use GET method with params for Google Scripts
          await axios.get(googleSheetsUrl, {
            params: formDataObj,
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Google Sheets submission successful');
        } catch (error) {
          console.error('Failed to submit to Google Sheets, but FormSpark submission was successful:', error);
        }
      }

      // Move to thank you step
      setStep(2);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            key="welcome"
            className="flex flex-col justify-center space-y-8 h-full"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div 
              variants={staggerItem}
              className="flex-grow"
            >
              <textarea
                name="vision"
                value={formData.vision}
                required
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                placeholder="Couple + 2 kids planning a trip from NYC to Italy second week of March, foody and family activities…"
                className="w-full h-full p-4 min-h-40 text-lg shadow resize-none hanken-grotesk placeholder:text-gray-400 placeholder:font-extralight focus:outline-none focus:ring-2 focus:ring-[hsla(23,91.9%,29.53%,1)] focus:ring-offset-0 focus:border-transparent"
              />
            </motion.div>
            <motion.button
              variants={staggerItem}
              type="button"
              onClick={() => setStep(1)}
              disabled={!formData.vision.trim()}
              className={`${buttonClasses} ${formData.vision.trim() ? enabledButtonClasses : ''}`}
            >
              CONTINUE
            </motion.button>
          </motion.form>
        );

      case 1:
        return (
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            key="contact"
            className="flex flex-col space-y-6 h-full"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.h2 
              variants={staggerItem}
              className="text-xl gilda-display text-gray-800"
            >
              Thank you for sharing your vision with us. 
            </motion.h2>
            <motion.p 
              variants={staggerItem}
              className="text-gray-700 font-extralight hanken-grotesk text-left"
            >
              Please share your email address and within minutes, our expert concierges will craft a bespoke itinerary delivered straight to your inbox.
            </motion.p>
            <motion.div 
              variants={staggerItem}
              className="space-y-8 flex-1"
            >
              <div className="space-y-4">
                <motion.input
                  variants={staggerItem}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  placeholder="Your email"
                  required
                  className={`w-full p-4 border focus:outline-none focus:ring-2 focus:ring-[hsla(23,91.9%,29.53%,1)] focus:ring-offset-0 focus:border-transparent hanken-grotesk ${
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
                  className="w-4 h-4 border-gray-300 text-primary focus:ring-2 focus:ring-[hsla(23,91.9%,29.53%,1)] focus:ring-offset-0 bg-white"
                />
                <label htmlFor="privacy-consent" className="text-xs hanken-grotesk font-extralight text-gray-600">
                  I CONSENT TO RECEIVE COMMUNICATIONS AS PER THE{' '}
                  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
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
              disabled={!validation.email.isValid || !formData.email.trim() || !formData.country || !formData.consent || isSubmitting}
              className={`${buttonClasses} ${
                validation.email.isValid && formData.email.trim() && formData.country && formData.consent && !isSubmitting ? enabledButtonClasses : ''
              }`}
            >
              {isSubmitting ? 'SUBMITTING...' : 'SURPRISE ME!'}
            </motion.button>
          </motion.form>
        );

      case 2:
        return (
          <motion.div
            key="thank-you"
            className="flex flex-col justify-center items-center space-y-6 h-full text-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.img 
              variants={staggerItem}
              src="https://cdn.prod.website-files.com/670230337fd9e66559f110bd/670230337fd9e66559f11293_Logo%20The%20Luxurist%20-Black.svg" 
              alt="Logo" 
              className="w-40 h-20"
            />
            <CheckmarkAnimation />
            <motion.h2 
              variants={staggerItem}
              className="text-2xl gilda-display text-gray-700"
            >
              Your personalized itinerary <br />is coming to life!
            </motion.h2>
            <motion.p 
              variants={staggerItem}
              className="text-gray-600 hanken-grotesk max-w-sm"
            >
              Our human-expert concierge is crafting every detail right now. 
              Check your inbox in a few minutes to discover your
              complete, custom-priced journey.
            </motion.p>
            <motion.p 
              variants={staggerItem}
              className="text-gray-600 hanken-grotesk max-w-sm"
            >
              While your itinerary takes shape,
              take a moment to discover more about
              us.
            </motion.p>
            <motion.a
              variants={staggerItem}
              href="/about-us"
              className={`${buttonClasses} ${enabledButtonClasses} max-w-[300px] sm:max-w-full`}
            >
              DISCOVER MORE ABOUT US
            </motion.a>
          </motion.div>
        );
    }
  };

  return (
    <div className={`${containerClasses} overflow-hidden relative pt-4`}>
      <ProgressBar step={step} totalSteps={3} />
      <div className="pt-2 h-full">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  );
};