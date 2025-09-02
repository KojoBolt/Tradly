import React, { useEffect, useRef, useState } from 'react';
import dashboard from '../assets/images/dash.jpg';

function MarkUp() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if section is in viewport
        const isInView = rect.top < windowHeight && rect.bottom > 0;
        setIsVisible(isInView);
        
        // Calculate scroll progress within the section
        if (isInView) {
          const sectionTop = rect.top;
          const sectionHeight = rect.height;
          const viewportProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
          setScrollY(viewportProgress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate transform values based on scroll progress
  const getTransform = () => {
    if (!isVisible) return 'translateY(100px) rotateX(15deg) scale(0.9)';
    
    const progress = scrollY;
    const translateY = 100 - (progress * 120); // Rises from 100px to -20px
    const rotateX = 15 - (progress * 20); // Rotates from 15deg to -5deg
    const scale = 0.9 + (progress * 0.15); // Scales from 0.9 to 1.05
    const opacity = Math.min(1, progress * 2); // Fades in quickly
    
    return `translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scale})`;
  };

  const getOpacity = () => {
    return isVisible ? Math.min(1, scrollY * 2) : 0;
  };

  return (
    <div 
      ref={sectionRef}
      className='flex justify-center items-center mt-[5px] min-h-screen px-4'
      style={{
        perspective: '1000px', // Enables 3D transforms
      }}
    >
      <div
        className='relative max-w-6xl w-full'
        style={{
          transform: getTransform(),
          opacity: getOpacity(),
          transition: 'opacity 0.3s ease-out',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Optional: Add a subtle shadow that grows with scroll */}
        <div
          className='absolute inset-0 bg-black rounded-lg blur-xl'
          style={{
            transform: `translateY(${20 + scrollY * 30}px) scale(${0.8 + scrollY * 0.3})`,
            opacity: scrollY * 0.3,
            zIndex: -1,
          }}
        />
        
        <img 
          src={dashboard} 
          alt="clavia option" 
          className='w-full h-auto rounded-lg shadow-2xl m-auto block'
          style={{
            filter: `brightness(${0.7 + scrollY * 0.4}) contrast(${0.9 + scrollY * 0.2})`,
          }}
        />
        
        {/* Optional: Add a light reflection effect */}
        <div
          className='absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-lg pointer-events-none'
          style={{
            opacity: scrollY * 0.4,
          }}
        />
      </div>
    </div>
  );
}

export default MarkUp;