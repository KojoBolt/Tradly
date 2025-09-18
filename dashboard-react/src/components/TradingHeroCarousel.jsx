import React, { useState, useEffect } from 'react';
import { ArrowRight, Check } from 'lucide-react';

const TradingHeroCarousel = () => {
  const [currentOffset, setCurrentOffset] = useState(0);

  // Feature rows data
  const featureRows = [
    [
      { text: 'Dashboard', icon: '📊' },
      { text: 'AI-Powered Insights', icon: '🤖' },
      { text: '24/7 Expert Support', icon: '🎧' }
    ],
    [
      { text: 'Guarantee', icon: '✅' },
      { text: 'Flexible Access Plans', icon: '📋' },
      { text: 'Real-Time Signals', icon: '📡' }
    ],
    [
      { text: 'Market Updates', icon: '📈' },
      { text: 'Seamless Integrations', icon: '🔗' },
      { text: 'Advanced Features', icon: '⚡' }
    ]
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffset(prev => (prev + 1) % 100);
    }, 50); // Smooth animation

    return () => clearInterval(interval);
  }, []);

  const getRowTransform = (rowIndex) => {
    const direction = rowIndex % 2 === 0 ? -1 : 1; // Alternate direction
    const speed = 0.5; // Adjust speed
    return `translateX(${direction * currentOffset * speed}px)`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center border border-[#0F1528] rounded-3xl p-3 shadow-2xl">
        
        {/* Left Content */}
        <div className="text-white space-y-8">
          <div className="space-y-6">
            <h1 className="text-[24px] font-bold leading-tight">
              Try it free for{' '}
              <span className="text-white">
                Lifetime
              </span>
            </h1>
            
            <p className="text-[18px] text-gray-500 leading-relaxed max-w-lg">
              Deposit $20 or more with our partner broker to enjoy lifetime access to 
              premium trading tools. Higher deposits unlock even more advanced features 
              to maximize your success.
            </p>
          </div>
          <a href="/signup">
            <button className="cursor-pointer group relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-8 py-4 rounded-full flex items-center gap-3 font-semibold text-lg text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </a>
        </div>

        {/* Right Carousel Features */}
        <div className="relative overflow-hidden h-86 flex flex-col justify-center">
          <div className="space-y-8">
            {featureRows.map((row, rowIndex) => (
              <div key={rowIndex} className="relative">
                <div 
                  className="flex items-center gap-8 whitespace-nowrap"
                  style={{
                    transform: getRowTransform(rowIndex),
                    transition: 'transform 0.1s linear'
                  }}
                >
                  {/* Repeat items to create seamless loop */}
                  {[...Array(3)].map((_, repeatIndex) => (
                    <React.Fragment key={repeatIndex}>
                      {row.map((feature, featureIndex) => (
                        <div
                          key={`${repeatIndex}-${featureIndex}`}
                          className="flex items-center gap-3 bg-[#03031D] backdrop-blur-sm rounded-full px-6 py-3 border border-[#03031D] hover:bg-[#03031D] shadow-green-600 transition-all duration-300 group cursor-pointer"
                        >
                          <div className="w-6 h-6 flex items-center justify-center bg-green-800 rounded-full text-sm group-hover:scale-110 transition-transform">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-white font-medium text-[14px]">
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          
        </div>
      </div>
      
      
    </div>
  );
};

export default TradingHeroCarousel;