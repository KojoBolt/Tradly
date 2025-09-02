import React from 'react';
import { BarChart3, Shield, MousePointer } from 'lucide-react';
import dashboard from '../assets/images/dash.jpg';

const PremiumAccessSection = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Real-Time Market Analysis",
      description: "Stay ahead with instant, data-backed insights"
    },
    {
      icon: Shield,
      title: "Advanced Risk Management",
      description: "Customize settings to suit your trading goals."
    },
    {
      icon: MousePointer,
      title: "Automated Signal Execution",
      description: "Eliminate Guesswork with Precision automation"
    }
  ];

  return (
    <div className="min-h-screen text-white mt-12">
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Dashboard Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={dashboard}
                alt="Trading Dashboard Interface"
                className="w-full h-auto rounded-2xl shadow-2xl border border-purple-500/30 "
              />
            </div>
          
          </div>

          {/* Right Side - Premium Features */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Full Premium Access
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Pay a flat $99/month and gain unrestricted access to our AI-powered signals, 
                exclusive tools, and advanced analytics—no deposit required.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumAccessSection;