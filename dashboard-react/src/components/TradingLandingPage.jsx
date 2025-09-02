import React, { useState } from 'react';
import { Check, BarChart3, Settings, Link2, Shield, Bell, ArrowRight } from 'lucide-react';
import login from '../assets/images/login.png';
// import { Stars } from '@react-three/drei';
// import { Canvas } from '@react-three/fiber';

const TradingLandingPage = () => {
 

  const features = [
    { icon: BarChart3, text: "Real-Time Analytics" },
    { icon: Settings, text: "Customizable Interface" },
    { icon: Link2, text: "Seamless Integrations" },
    { icon: Shield, text: "User-Friendly Navigation" },
    { icon: Shield, text: "Data Security" },
    { icon: Bell, text: "Instant Notifications" }
  ];

  return (
    <div>
      <div className="min-h-screen text-white">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Don't OVerpay for Signals - Get<br />
              Elite-Level Trading Access
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              You don't have to break the bank to access top-tier trading insights. At 
              CirviaOptions, we offer two flexible ways to unlock premium benefits
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Side - Features */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-6">Get Started for Free</h2>
                <p className="text-gray-300 text-lg mb-8">
                  Deposit as little as $20 with our partner broker to unlock premium trading 
                  signals. Higher deposits come with even greater benefits.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 text-gray-200">
                    <div className="flex-shrink-0">
                      <Check className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Get Started Button */}
              <div className="pt-6">
                <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 px-8 rounded-full flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="relative">
              <div>
                  <img src={login} alt="Cirvia Options" />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="absolute inset-0 z-0">
          <Canvas>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          </Canvas>
        </div> */}
      </div>
    </div>
  );
};

export default TradingLandingPage;