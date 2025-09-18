import React from 'react';
import { ArrowRight } from 'lucide-react';

const GetStartedSection = () => {
  const steps = [
    {
      id: "01",
      title: "Sign up for Free",
      description: "Use our partner broker's $20 minimum deposit to start unlocking premium features, or subscribe for $99/month",
      buttonText: "Get Started"
    },
    {
      id: "02", 
      title: "Receive AI-Powered Signals",
      description: "Get instant, real-time alerts through SMS, email, Telegram, WhatsApp, and dashboard notifications.",
      buttonText: "Get Started"
    },
    {
      id: "03",
      title: "Trade with Confidence", 
      description: "Leverage expert-verified AI signals and Squared TV live insights to make the best trading decisions.",
      buttonText: "Get Started"
    }
  ];

  return (
    <div className="min-h-screentext-white py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
            <div
      className="
        relative flex justify-center items-center
        before:content-['']
        before:absolute
        before:w-48
        before:h-20
        before:bg-purple-600
        before:rounded-full
        before:blur-3xl
        before:opacity-40
        before:-z-10
      "
    >
      <button className="bg-[#2b2049] text-[#d8c8ff] border border-[#4a3479] py-2 px-6 rounded-full">
        Benefits
      </button>
    </div>
          <h2 className="text-4xl md:text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent pt-3">
            Get Started in 3 Simple Steps
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Card */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-300 hover:border-purple-500/30">
                {/* Step Number Icon */}
                <div className="mb-8">
                  <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Button */}
                <div className="mt-auto">
                  <a href="/signup">
                    <button className="bg-[black] hover:bg-black/70 text-white cursor-pointer font-semibold py-3 px-6 rounded-full flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 group-hover:scale-105">
                      <span>{step.buttonText}</span>
                      <ArrowRight className="w-6 h-6 bg-white text-black rounded-2xl" />
                    </button>
                  </a>
                </div>
              </div>

              {/* Step connecting line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default GetStartedSection;