import React, { useState } from "react";
import { X } from "lucide-react";

const ClaimPopup = ({ onClose }) => {
  const [showSponsored, setShowSponsored] = useState(false);

  const handleToggleSponsored = () => {
    setShowSponsored(!showSponsored);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4">
      <div 
        className="bg-white rounded-lg shadow-xl border max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
        style={{ transform: 'none' }}
      >
        {/* Header - sticky so it stays visible while scrolling */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-lg z-10">
          <h2 className="text-xl font-semibold">How To Earn Points</h2>
          <button
            className="text-gray-500 hover:text-black transition-colors p-1"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6">
          <p className="mb-3">
            Deposit funds into a partner broker account via Traydly.
          </p>

          <p className="mb-4">Claim points based on your deposit tier:</p>

          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>$100 - $249: 50 points (No SMS alerts).</li>
            <li>$250 - $499: 200 points (No SMS alerts).</li>
            <li>$500 - $999: Unlimited signals for 1 month + SMS alerts.</li>
            <li>$1,000+: Unlimited signals for 3 months + SMS alerts.</li>
          </ul>

          <p className="mb-6">
            Use points to access signals (1 signal = 1 point).
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button className="bg-[#064E3B] text-white px-4 py-2 rounded-lg hover:bg-[#064E3B] transition-colors">
              Click here to Begin
            </button>

            <button
              onClick={handleToggleSponsored}
              className="border border-[#064E3B] text-[#064E3B] px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
            >
              {showSponsored ? "Hide Sponsored Points" : "Read about Sponsored Points"}
            </button>
          </div>

          {/* Sponsored section - simple show/hide */}
          {showSponsored && (
            <div className="p-4 bg-gray-50 border rounded-md">
              <h3 className="text-lg font-semibold mb-2">About Sponsored Points</h3>
              <p className="mb-3">
                Traydly' sponsored points let you access options signals (Calls/Puts) for free.  
                Earn points by depositing funds into partner broker accounts. Points expire after 30 days.
              </p>

              <h4 className="font-medium mb-2">How It Works:</h4>
              <ol className="list-decimal list-inside mb-4 space-y-1">
                <li>
                  Deposit & Claim Points:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>$100 - $249: 50 points (No SMS alerts).</li>
                    <li>$250 - $499: 200 points (No SMS alerts).</li>
                    <li>$500 - $999: Unlimited signals for 1 month + SMS alerts.</li>
                    <li>$1,000+: Unlimited signals for 3 months + SMS alerts.</li>
                  </ul>
                </li>
                <li>
                  Signal Cost: 1 point per signal (e.g., a $100 deposit gives 50 signals).
                </li>
              </ol>

              <h4 className="font-medium mb-2">Rules to Note:</h4>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Unfollow traders to save points. Following all traders drains points faster.</li>
                <li>No double claims on the same deposit within 30 days.</li>
                <li>Inactive accounts lose points, and subscriptions are suspended.</li>
                <li>All points expire in 30 days.</li>
              </ul>

              <h4 className="font-medium mb-2">Example Options Signal:</h4>
              <div className="mb-3 p-3 bg-white border rounded font-mono text-sm">
                SIGNAL FROM TRENDX<br />
                TRENDX IS BUYING CALL<br />
                STRIKE PRICE: 1.25155<br />
                EXPIRATION: May 29, 2025, 10:00 AM
              </div>

              <h4 className="font-medium mb-2">Unlimited Options Signals:</h4>
              <p className="mb-3">
                Subscribe to our premium plan for uninterrupted access:<br />
                - Monthly: $99 (Unlimited signals + SMS alerts).
              </p>

              <h4 className="font-medium mb-2">Start Now:</h4>
              <ol className="list-decimal list-inside space-y-1 mb-4">
                <li>Click "Sign Up with Broker" to create an account.</li>
                <li>Deposit funds and claim points.</li>
                <li>Use points for free options signals!</li>
              </ol>

              <p className="text-sm text-gray-600">
                Need help? Visit <a href="https://traydly.com" className="text-blue-600 underline hover:text-blue-800">traydly.com</a> or email <a href="mailto:help@traydly.com" className="text-blue-600 underline hover:text-blue-800">help@traydly.com</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimPopup;