import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQAccordion = () => {
  const [openItem, setOpenItem] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "What is Cirvia Option?",
      answer:
        "Cirvia Option is a comprehensive trading platform that provides advanced tools, real-time market insights, and AI-powered analytics to help traders make informed decisions. Our platform offers seamless integration with partner brokers and provides lifetime access to premium features.",
    },
    {
      id: 2,
      question: "What are the benefits of using Cirvia Option?",
      answer:
        "Cirvia Option offers numerous benefits including AI-powered market insights, 24/7 expert support, real-time trading signals, flexible access plans, seamless broker integrations, and advanced analytics tools. You'll also get access to our comprehensive dashboard and market updates to stay ahead of trading opportunities.",
    },
    {
      id: 3,
      question: "How do I Sign up for Cirvia Option?",
      answer:
        "Signing up for Cirvia Option is simple and straightforward. Click the 'Get Started' button, create your account with basic information, verify your email, and then deposit $20 or more with our partner broker to unlock lifetime access to all premium features.",
    },
    {
      id: 4,
      question: "How can I get in touch with the Cirvia Option team?",
      answer:
        "You can reach our SquaredOption team through multiple channels: 24/7 live chat support on our platform, email us at support@squaredoption.com, or use our contact form. Our expert support team is always ready to assist you with any questions or technical issues you may encounter.",
    },
    {
      id: 5,
      question: "How much does Cirvia Option cost?",
      answer:
        "Cirvia Options offers lifetime access for just a $20 minimum deposit with our partner broker. There are no monthly subscription fees or hidden costs. Higher deposits unlock additional advanced features and premium tools to enhance your trading experience.",
    },
  ];

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-gray-300 text-sm font-medium mb-6">
            FAQ's
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get quick answers to common questions about our services.
          </p>
        </div>

        {/* Accordion Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-8 py-6 text-left flex items-center justify-between group focus:outline-none"
              >
                <h3 className="text-lg lg:text-xl font-semibold text-white pr-4 group-hover:text-purple-300 transition-colors duration-300">
                  {item.question}
                </h3>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center group-hover:bg-purple-600/40 transition-all duration-300">
                  {openItem === item.id ? (
                    <Minus className="w-4 h-4 text-purple-400" />
                  ) : (
                    <Plus className="w-4 h-4 text-purple-400" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openItem === item.id
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 pb-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>
                  <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;
