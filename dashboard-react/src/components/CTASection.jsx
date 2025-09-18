import React from "react";
import {Link} from "react-router-dom";

const CTASection = () => {
  return (
    <div className="relative flex items-center justify-center min-h-[60vh] bg-[#0a0a1a] rounded-3xl overflow-hidden px-6 w-[80%] mx-auto my-20 border border-white/10">
      {/* Left Light */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-b from-[#A253CA] via-purple-500/20 to-transparent blur-2xl" />

      {/* Right Light */}
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-b from-[#A253CA] via-purple-500/20 to-transparent blur-2xl" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          Don&apos;t Wait - Join the AI Trading Revolution
        </h2>
        <p className="mt-6 text-lg text-gray-400">
          The market moves fast, and so should you. Unlock the power of AI today and
          take your options trading to the next level.
        </p>

        {/* Button */}
        <div className="mt-8 flex justify-center">
          <a href="/signup">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-lg transition cursor-pointer">
              Try it free
              <span className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
