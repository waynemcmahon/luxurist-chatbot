import { VoiceflowChat } from '@/components/VoiceflowChat/VoiceflowChat';
import '@/components/VoiceflowChat/VoiceflowChat.css';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDF8F3] font-hanken">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <h1 className="text-6xl font-gilda text-gray-900 leading-tight">
              Let the magic<br />happen...
            </h1>
            <div className="space-y-4">
              <p className="font-extralight text-gray-700">
                Ready to create an unforgettable journey for your guests?
              </p>
              <p className="font-extralight text-gray-600">
                Simply share your travel vision with us. Within minutes, our expert concierges 
                will craft a bespoke itinerary delivered straight to your inbox.
              </p>
            </div>

            {/* Start Button */}
            <button className="w-full md:w-auto px-8 py-4 bg-[hsla(23,91.9%,29.53%,1)] text-white text-lg font-gilda tracking-widest hover:bg-[hsla(23,91.9%,25%,1)] transition-colors">
              LET'S START
            </button>
            
            {/* Privacy Policy Checkbox */}
            <div className="flex items-center space-x-2 pt-4">
              <input
                type="checkbox"
                id="privacy-consent"
                className="w-4 h-4 rounded border-gray-300 text-[hsla(23,91.9%,29.53%,1)] focus:ring-[hsla(23,91.9%,29.53%,1)]"
              />
              <label htmlFor="privacy-consent" className="text-xs text-gray-600">
                I CONSENT TO RECEIVE COMMUNICATIONS AS PER THE{' '}
                <a href="#" className="underline hover:text-[hsla(23,91.9%,29.53%,1)]">
                  PRIVACY POLICY
                </a>
                .
              </label>
            </div>


          </div>

          {/* Right Column - Chat Interface */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <VoiceflowChat
              projectId="67925daa7d35e219e09dfbad"
              apiKey={process.env.NEXT_PUBLIC_VOICEFLOW_API_KEY || ''}
              placement="inline"
              initialMessage="Hi there! I'm your luxury travel concierge. How can I help you plan your perfect getaway?"
            />
          </div>
        </div>
      </div>
    </main>
  );
} 