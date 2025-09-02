import React, { useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import BrandCarousel from './BrandCarousel'
import MarkUp from './MarkUp'
import TradingSections from './TradingSections'
import TradingLandingPage from './TradingLandingPage'
import PremiumAccessSection from './PremiumAccessSection'
import GetStartedSection from './GetStartedSection'
import PricingPage from './PricingPage'



const Hero = () => {
  const COLORS = ['#422485', '#005830', '#238744', '#DD335C'];

  // SVG for the small red rocket icon
  const rocketSvg = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  // SVG for the globe icon
  const globeSvg = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2C8.68629 2 6 6.47715 6 12C6 17.5228 8.68629 22 12 22C15.3137 22 18 17.5228 18 12C18 6.47715 15.3137 2 12 2Z"
        stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );

  // SVG for the arrow icon in the button
  const arrowSvg = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000018 50%, ${color} )`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0 4px 30px ${color}`;

  useEffect(() => {
    animate(color, COLORS, {
      ease: 'easeInOut',
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror'
    });
  }, []);


  return (
    // Main container with relative positioning to contain pseudo-elements
    <motion.div className="relative w-full flex flex-col items-center justify-center min-h-[700px] text-white pt-24 pb-16 px-4 overflow-hidden
                    " style={{
        backgroundImage,
      }}>


      {/* Sweeping Arc Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[300px] 
                      border-b border-white/10 rounded-[100%] z-0"
      ></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Tagline */}
        <motion.div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6 text-sm font-medium text-gray-200 backdrop-blur-sm"
          style={{ border, boxShadow }}>
          {rocketSvg}
          Trade Smarter. Faster. More Profitably
        </motion.div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
          The Future of <span className="text-purple-400">AI-Powered</span> Options Trading
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl">
          CirviaOptions uses cutting-edge AI to simplify options trading. Receive real-time signals and actionable insights to stay ahead.
        </p>

        {/* Call to Action Button */}
        <motion.button
          className="flex items-center gap-3 bg-black hover:bg-violet-500 transition-colors 
                     duration-300 text-white font-semibold text-base py-3 pl-6 pr-3 rounded-full mb-10"
          style={{ border, boxShadow }}
        >
          Get Started
          <span className="flex items-center justify-center w-9 h-9 bg-black/30 rounded-full">
            {arrowSvg}
          </span>
        </motion.button>

        {/* Footer Text */}
        <p className="flex items-center gap-3 lg:text-md text-gray-300 flex-wrap justify-center">
          {globeSvg}
          We empower over <strong className="text-white font-semibold">10,000+ Traders and Organizations</strong> worldwide with precision-driven AI Signals
        </p>
      </div>
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <BrandCarousel />
      </div>
      <div className=''>
        <MarkUp />
      </div>

      <div
        className="absolute inset-0 z-0"
      >

        <Canvas>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        </Canvas>

      </div>
    </motion.div>
  );
};

export default Hero;