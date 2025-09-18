import React from 'react';
import { Zap, Mail, MessageSquare, Smartphone, ArrowRight, Check } from 'lucide-react';

export default function Subscriptions() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-black text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Subscriptions</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get access to our premium signals and enjoy the benefits of being a subscriber.
          </p>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Best Pricing Badge */}
          <div className="text-center mb-8">
            <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
              Best Pricing
            </span>
          </div>

          {/* Section Title */}
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Subscription Plans
          </h2>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Standard Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Standard</h3>
                <div className="bg-gray-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="mb-4">
                  <span className="text-gray-500 text-sm">USD</span>
                  <span className="text-5xl font-bold text-gray-900">99</span>
                  <div className="text-gray-500 text-sm mt-1">per month</div>
                </div>
                <p className="text-gray-600 mb-6">
                  Our premium plan for uninterrupted access.
                </p>
              </div>

              <div className="mb-8">
                <p className="text-gray-700 font-medium mb-4">Signal delivery via:</p>
                <div className="flex justify-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-600">Email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-600">Telegram</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Unlimited signals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Telegram Notifications</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                Subscribe Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Golden VIP Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border-2 border-yellow-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Golden VIP</h3>
                <div className="bg-gray-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="mb-4">
                  <span className="text-gray-500 text-sm">USD</span>
                  <span className="text-5xl font-bold text-gray-900">199</span>
                  <div className="text-gray-500 text-sm mt-1">per month</div>
                </div>
                <p className="text-gray-600 mb-6">
                  Our premium plan for VIPs.
                </p>
              </div>

              <div className="mb-8">
                <p className="text-gray-700 font-medium mb-4">Signal delivery via:</p>
                <div className="flex justify-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-600">SMS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-600">Email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-600">Telegram</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">SMS Notifications</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Trading live stream access</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                Subscribe Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}