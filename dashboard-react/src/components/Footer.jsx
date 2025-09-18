import React from 'react';
import { Twitter, Linkedin, Instagram } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Risk Disclosure Section */}
        <div className="mb-12 space-y-6">
          <div className="text-gray-300 leading-relaxed">
            <p className="mb-4">
              <span className="font-semibold text-white">Risk Disclosure:</span> Trading involves significant risk, and there is the potential to lose all your invested capital. Our AI-powered signals and tools are designed solely for informational and educational purposes. They do not constitute financial advice, investment recommendations, or any form of professional guidance. CirviaOptions does not guarantee the accuracy, reliability, or profitability of any signals or tools provided.
            </p>
            <p>
              Before trading, ensure you fully understand the risks involved and consider seeking advice from a licensed financial advisor if needed. By using our platform, you acknowledge and accept full responsibility for your trading decisions and any associated outcomes.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pt-8 border-t border-gray-800">
          
          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            ©CirviaOptions 2025, Powered by CirviaOptions. All rights reserved.
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            
            <a 
              href="#" 
              className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            
            <a 
              href="#" 
              className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </a>
          </div>

          {/* Privacy Policy */}
          <div>
            <a 
              href="/privacy" 
              className="text-white font-medium hover:text-purple-400 transition-colors duration-300 relative group"
            >
              Privacy Policy
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;