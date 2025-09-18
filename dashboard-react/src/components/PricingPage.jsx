import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Element } from 'react-scroll';
import { Link } from 'lucide-react';

const PricingPage = () => {
  return (
    <Element name="subscriptions" className="min-h-screen text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gray-300 mb-4">Pricing</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Flexible Plans Tailored for Every Trader
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Choose the plan that suits your trading journey—start free with our partner broker or go premium for direct access!
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Premium Plan */}
          <div className="relative bg-[#023125] rounded-2xl p-8 border border-gray-500 shadow-2xl">
            <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded-full text-sm font-semibold">
              Popular
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-200 mb-2">Premium Plan</h3>
              <p className="text-sm text-gray-300 mb-4">(No Broker Deposit)</p>
              
              <div className="mb-4">
                <span className="text-5xl font-bold">$99</span>
                <span className="text-gray-300 ml-2">per month</span>
              </div>
              
              <p className="text-sm text-gray-200 mb-6">
                Unlimited Access Without Broker Requirements
              </p>
            </div>
            <a href="/signup">
            <button className="w-full bg-black text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 mb-8 transition-colors">
              Subscribe to Premium
              <ArrowRight className="w-4 h-4" />
            </button>
            </a>

            <div>
              <h4 className="font-semibold mb-4">Details</h4>
              <p className="text-sm text-gray-200 mb-6">Everything in our free plan plus...</p>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm">Subscribe for $99/month to access</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm">AI-powered trade signals</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm">Customizable dashboard</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm">Live market streaming and insights</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm">Priority customer support and advanced tools</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Free Plan $20 */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Free Plan (Via Partner Broker)</h3>
              
              <div className="mb-4">
                <span className="text-5xl font-bold">$20</span>
                <span className="text-gray-400 block text-sm mt-2">Minimum Deposit</span>
              </div>
              
              <p className="text-sm text-gray-300 mb-6">
                Get Started for Free with Our Partner Broker
              </p>
            </div>
            <a href="/signup">
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold mb-8 transition-colors">
              Starts Free Now
            </button>
            </a>

            <div>
              <h4 className="font-semibold mb-4">Details</h4>
              <p className="text-sm text-gray-300 mb-6">
                Deposit a Minimum of $20 with our partner broker to unlock lifetime access. Higher Deposits unlock advanced
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm">Basic AI Trade signals and alerts</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-400">Advanced Charts, live streaming, and analysis tools</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-400">Premium signals, SMS alerts and 24/7 supports</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-400">Risk Management tools and full-features access</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-400">Scalable Solutions</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Free Plan $100 */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Free Plan (Via Partner Broker)</h3>
              
              <div className="mb-4">
                <span className="text-5xl font-bold">$100</span>
                <span className="text-gray-400 block text-sm mt-2">Minimum Deposit</span>
              </div>
              
              <p className="text-sm text-gray-300 mb-6">
                Get Started for Free with Our Partner Broker
              </p>
            </div>

            
            <a href="/signup">
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold mb-8 transition-colors">
                Starts Free Now
              </button>
            </a>

            <div>
              <h4 className="font-semibold mb-4">Details</h4>
              <p className="text-sm text-gray-300 mb-6">
                Deposit a Minimum of $20 with our partner broker to unlock lifetime access. Higher Deposits unlock advanced
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm">$20+ Basic AI Trade signals and alerts</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm">Advanced Charts, live streaming, and analysis tools</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm">Premium signals, SMS alerts and 24/7 supports</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm">Risk Management tools and full-features access</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm">Scalable Solutions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default PricingPage;