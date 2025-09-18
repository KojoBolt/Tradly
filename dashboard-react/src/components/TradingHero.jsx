import React from 'react';
import { ArrowRight } from 'lucide-react';
import logo from '../assets/images/Black.png'

const TradingHero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        
        {/* Logo/Icon */}
        <div className="mb-6">
          <img src={logo} alt="logo" className="mx-auto w-[291px] h-[98px]" />
        </div>

        {/* Main Headline */}
        <div className="mb-8">
          <h1 className="text-[26px] font-bold text-white leading-tight mb-4 flex items-center justify-center gap-4 flex-wrap w-full">
            <span className="text-[16px]">🚀</span>
            <span>Trade Smarter. Faster. More Profitably.  We've got solutions.</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="mb-12">
          <p className="text-[16px] text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Join thousands of traders using AI-powered
            <br />
            tools for consistent results
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a href="/signup">
            <button className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-8 py-4 rounded-full flex items-center gap-3 font-semibold text-lg text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
              <span className="relative z-10">Get Started</span>

              {/* Arrow Icon with Black Circle Background */}
              <div className="relative z-10 w-10 h-10 bg-black rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
            
            {/* Animated Background Overlay */}
            <div className="absolute cursor-pointer inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          </a>
        </div>

        {/* Background Particles Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </div>
  );
};

export default TradingHero;