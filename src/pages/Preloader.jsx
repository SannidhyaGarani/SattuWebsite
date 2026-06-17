import React, { useState, useEffect } from 'react';

const PremiumPreloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLifting, setIsLifting] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Reveal central items with a micro-delay for smooth entry
    const contentTimer = setTimeout(() => setShowContent(true), 150);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Ultra-premium non-linear slow-down as it approaches 100%
        const remaining = 100 - prev;
        const increment = Math.random() * (remaining > 20 ? 12 : 2.5);
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
      clearTimeout(contentTimer);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsLifting(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 1100); // Perfectly synced with CSS transition timing
      }, 600);
    }
  }, [progress, onComplete]);

  // SVG circle properties for the circular loader (viewBox 0-100)
  const radius = 42; // Increased radius for larger circle
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden pointer-events-none">
      
      {/* LUXURY LAYER: Split Opening Curtains (Top & Bottom halves) */}
      <div 
        className="absolute inset-0 flex flex-col w-full h-full"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Top Curtain */}
        <div 
          className="w-full h-1/2 bg-[#FDFBF7] border-b border-[#D4A359]/10 transition-transform duration-[1100ms] ease-[cubic-bezier(0.85,0,0.15,1)] origin-top"
          style={{ transform: isLifting ? 'translateY(-100%)' : 'translateY(0%)' }}
        />
        {/* Bottom Curtain */}
        <div 
          className="w-full h-1/2 bg-[#FDFBF7] border-t border-[#D4A359]/10 transition-transform duration-[1100ms] ease-[cubic-bezier(0.85,0,0.15,1)] origin-bottom"
          style={{ transform: isLifting ? 'translateY(100%)' : 'translateY(0%)' }}
        />
      </div>

      {/* BACKGROUND TEXTURE: Fine Organic Film Grain */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply transition-opacity duration-700"
        style={{ 
          backgroundImage: "url('https://www.transparenttextures.com/patterns/p6-grain.png')",
          opacity: isLifting ? 0 : 0.02 
        }} 
      />

      {/* CENTRAL CORE CONTENT CONTAINER */}
      <div className={`relative flex flex-col items-center z-20 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.97]'
      } ${isLifting ? 'opacity-0 -translate-y-10' : ''}`}>
        
        {/* LARGE CIRCLE CONTAINER WITH LOGO INSIDE */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mb-8 md:mb-10 lg:mb-12">
          
          {/* Decorative Dashed Background Aura Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#11261C]/10 scale-105" />
          
          {/* Main SVG Circular Progress Ring */}
          <svg 
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Soft background path line */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-[#11261C]/5"
              strokeWidth="2.5"
              fill="transparent"
            />
            {/* Highly calibrated active golden path line */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-[#D4A359] transition-all duration-300 ease-out"
              strokeWidth="3.5"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          {/* LOGO POSITIONED ABSOLUTELY INSIDE THE CIRCLE */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="/img/logo.png" 
              alt="Indian Food Way" 
              className="w-auto max-w-[70%] max-h-[70%] object-contain transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
        </div>

        {/* REFINED BRAND IDENTITY & PROGRESS SECTION */}
        <div className="text-center space-y-4 md:space-y-5 flex flex-col items-center">
          {/* Brand Name */}
          <div className="flex flex-col items-center">
            <h1 className="text-3xl md:text-5xl font-poppins font-black text-[#11261C] tracking-tighter leading-none uppercase">
              Indian <span className="text-[#D4A359]">Food Way</span>
            </h1>
            <div className="flex items-center gap-3 mt-3 w-full max-w-[200px]">
              <div className="h-[1px] flex-grow bg-[#D4A359]/30" />
              <p className="text-[10px] font-poppins font-bold tracking-[0.4em] text-[#D4A359] uppercase whitespace-nowrap">
                Pure Nutrition
              </p>
              <div className="h-[1px] flex-grow bg-[#D4A359]/30" />
            </div>
          </div>

          {/* MASSIVE MAGAZINE-STYLE NUMERICAL DISPLAY */}
          <div className="relative flex flex-col items-center">
            {/* Subtle Accent Line divider */}
            <div className="w-6 h-[1px] bg-[#11261C]/20 mb-3" />
            
            <div className="flex items-baseline font-poppins font-light text-[#11261C]">
              <span className="text-5xl md:text-6xl tracking-tighter">
                {String(Math.floor(progress)).padStart(3, '0')}
              </span>
              <span className="text-xs font-poppins font-bold text-[#D4A359] tracking-wider ml-1">%</span>
            </div>

            {/* Contextual Status Tracker Strings */}
            <div className="mt-4 h-4 overflow-hidden relative w-48 text-center">
              <span className={`absolute inset-x-0 mx-auto text-[9px] font-poppins font-bold uppercase tracking-[0.3em] text-[#11261C]/50 transition-all duration-500 transform ${
                progress === 100 ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
              }`}>
                Nourishing your body
              </span>
              <span className={`absolute inset-x-0 mx-auto text-[9px] font-poppins font-bold uppercase tracking-[0.3em] text-[#D4A359] transition-all duration-500 transform ${
                progress === 100 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}>
                Ready for Vitality
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* EXTERIOR ARCHITECTURAL FRAME EFFECT */}
      <div 
        className="absolute inset-6 md:inset-10 border border-[#11261C]/5 pointer-events-none transition-all duration-1000 z-30"
        style={{ 
          opacity: isLifting ? 0 : 1,
          transform: isLifting ? 'scale(1.05)' : 'scale(1)'
        }} 
      />
    </div>
  );
};

export default PremiumPreloader;
