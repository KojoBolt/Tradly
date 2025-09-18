import React from 'react';
import { ArrowUpRight, BarChart3 } from 'lucide-react';

const TradingSections = () => {
  return (
    <div className="text-white">
      {/* Why Traders Choose SquaredOptions Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            Why Traders Choose Cirvia Options
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Why pay exorbitant fees for unreliable trading signals? Cirvia Options delivers precision, speed, 
            and convenience—all at an unbeatable value. Our advanced AI technology ensures you never miss 
            an opportunity, while our Cirvia TV live streaming feature keeps you ahead of market trends in 
            real time.
          </p>
        </div>
      </section>

      {/* Experience Next-Level Signals Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden">
                {/* <img 
                  src="/api/placeholder/600/400" 
                  alt="Trader with floating colorful blocks" 
                  className="w-full h-auto object-cover"
                /> */}
                <video
                    src="https://cdn.pixabay.com/video/2023/10/14/184941-874460311_large.mp4"
                    className="w-[501.3px] h-[560px] object-cover lg:block hidden opacity-40 rounded-2xl"
                    controls
                    autoPlay
                    muted
                    loop
              />
              <style jsx>{`
                video::-webkit-media-controls {
                  display: none !important;
                }
                .group:hover video::-webkit-media-controls {
                  display: flex !important;
                }
              `}
              </style>
                {/* Floating elements overlay effect */}
                {/* <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-10 left-10 w-16 h-16 bg-orange-500 rounded-lg opacity-80 animate-pulse"></div>
                  <div className="absolute top-20 right-16 w-12 h-12 bg-teal-500 rounded-lg opacity-70 animate-bounce"></div>
                  <div className="absolute bottom-16 left-16 w-14 h-14 bg-red-500 rounded-lg opacity-75"></div>
                  <div className="absolute bottom-20 right-10 w-10 h-10 bg-green-500 rounded-lg opacity-80"></div>
                </div> */}
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-4xl font-bold leading-tight">
                  Experience Next-Level Signals
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    Across Multiple Channels
                  </span>
                </h2>
                
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105">
                  Contact us
                  <ArrowUpRight size={20} />
                </button>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Real-Time AI Trade Alerts */}
                <div className="space-y-3 border border-gray-700 p-4 rounded-lg">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                    <BarChart3 size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Real-Time AI Trade Alerts</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    No Delays, no guesswork, just instant high-probability trade signal
                  </p>
                </div>

                {/* Multi-Channel Delivery */}
                <div className="space-y-3 border border-gray-700 p-4 rounded-lg">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                    <BarChart3 size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Multi-Channel Delivery</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Receive alerts via SMS, Email, Telegram, WhatsApp, and your personal dashboard.
                  </p>
                </div>

                {/* Live Market Analysis */}
                <div className="space-y-3 border border-gray-700 p-4 rounded-lg">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                    <BarChart3 size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Live Market Analysis</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Tune into Cirvia  TV on your dashboard for daily live market breakdowns, expert discussions, and trading strategies.
                  </p>
                </div>

                {/* Lightening-Fast Execution */}
                <div className="space-y-3 border border-gray-700 p-4 rounded-lg">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                    <BarChart3 size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Lightening-Fast Execution</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Act on opportunities instantly with real-time precision
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TradingSections;