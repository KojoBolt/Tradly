import React, { useState } from 'react';
import logo from '../assets/images/Black.png';
import { Link} from "react-scroll";
import { Link as RouterLink } from "react-router-dom";



const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // SVG for the logo
  const logoSvg = (
    <img src={logo} alt="Logo" className="w-[100px] h-[28px]" />
  );

  // SVG for the arrow icon in the button
  const arrowSvg = (
     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // SVG for hamburger icon
  const hamburgerSvg = (
    <button
      className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800"
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Open menu"
    >
      <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="7" x2="20" y2="7" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="17" x2="20" y2="17" />
      </svg>
    </button>
  );

  return (
    <div className="w-full flex justify-center pt-2 mt-6">
      <nav 
        className="w-11/12 max-w-6xl flex items-center justify-between py-3 px-6 
                   bg-[#1a162e]/80 backdrop-blur-md rounded-full border border-white/10"
      >
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center justify-center bg-neutral-800 rounded-lg">
            {logoSvg}
          </a>
        </div>

        {/* Center Section: Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-200 hover:text-white transition-colors duration-300 cursor-pointer">Home</Link>
          <Link to="subscriptions" smooth={true} duration={500} className="text-gray-200 hover:text-white transition-colors duration-300 !cursor-pointer">Subscriptions</Link>
          <RouterLink to="/privacy" className="text-gray-200 hover:text-white transition-colors duration-300 cursor-pointer">Privacy Policy</RouterLink>
        </div>

        {/* Hamburger for mobile */}
        <div className="md:hidden">
          {hamburgerSvg}
        </div>

        {/* Right Section: Login & Get Started */}
        <div className="hidden md:flex items-center gap-6">
         <RouterLink to="/login" className="text-gray-200 hover:text-white font-medium transition-colors duration-300">
           Login
         </RouterLink>
         <RouterLink to="/signup">
          <button 
            className="flex items-center gap-3 bg-violet-600 hover:bg-violet-500 transition-colors 
                       duration-300 text-white font-semibold text-base py-2.5 pl-5 pr-2.5 rounded-full cursor-pointer"
          >
            Get Started
            <span className="flex items-center justify-center w-8 h-8 bg-black rounded-full">
              {arrowSvg}
            </span>
          </button>
          </RouterLink>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#1a162e]/95 backdrop-blur-lg flex flex-col items-center justify-center md:hidden">
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
          <nav className="flex flex-col gap-8 items-center">
            <RouterLink to="/" className="text-white text-xl font-semibold" onClick={() => setMenuOpen(false)}>Home</RouterLink>
            <RouterLink to="/subscriptions" className="text-white text-xl font-semibold" onClick={() => setMenuOpen(false)}>Subscriptions</RouterLink>
            <RouterLink to="/privacy" className="text-white text-xl font-semibold" onClick={() => setMenuOpen(false)}>Privacy Policy</RouterLink>
            <RouterLink to="/login" className="text-white text-lg mt-6" onClick={() => setMenuOpen(false)}>Login</RouterLink>
            <RouterLink to="/signup">
            <button
              className="flex items-center gap-3 bg-violet-600 hover:bg-violet-500 transition-colors
                         duration-300 text-white font-semibold text-base py-2.5 pl-5 pr-2.5 rounded-full mt-4"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
              <span className="flex items-center justify-center w-8 h-8 bg-black rounded-full">
                {arrowSvg}
              </span>
            </button>
            </RouterLink>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;