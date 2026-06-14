import React, { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';

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

  // Calculate SVG circle properties for the circular loader
  const radius = 54;
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
        
        {/* CENTERPIECE: Luxury Radial SVG Micro-Loader */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-8">
          
          {/* Decorative Dashed Background Aura Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#11261C]/10 scale-110" />

          <svg className="w-full h-full transform -rotate-90">
            {/* Soft background path line */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              className="stroke-[#11261C]/5"
              strokeWidth="1.5"
              fill="transparent"
            />
            {/* Highly calibrated active golden path line */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              className="stroke-[#D4A359] transition-all duration-300 ease-out"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Inner Velvet Monogram Floating Badge */}
          <div className="absolute w-20 h-20 bg-[#11261C] rounded-full flex items-center justify-center text-[#FDFBF7] shadow-[0_12px_30px_rgba(17,38,28,0.25)] border border-[#D4A359]/20">
            <Leaf size={32} className="text-[#D4A359] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
          </div>
        </div>

        {/* REFINED BRAND IDENTITY ARCHITECTURE */}
        <div className="text-center space-y-3 mb-10">
          <p className="text-[10px] font-sans font-bold tracking-[0.5em] text-[#D4A359] uppercase">
            Est. 2024 • Pure Nutrition
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-[#11261C] tracking-tight leading-none">
            Sattu <span className="font-serif italic text-[#D4A359]">Drink</span>
          </h1>
        </div>

        {/* MASSIVE MAGAZINE-STYLE NUMERICAL DISPLAY */}
        <div className="relative flex flex-col items-center">
          {/* Subtle Accent Line divider */}
          <div className="w-6 h-[1px] bg-[#11261C]/20 mb-3" />
          
          <div className="flex items-baseline font-serif font-light text-[#11261C]">
            <span className="text-5xl md:text-6xl tracking-tighter">
              {String(Math.floor(progress)).padStart(3, '0')}
            </span>
            <span className="text-xs font-sans font-bold text-[#D4A359] tracking-wider ml-1">%</span>
          </div>

          {/* Contextual Status Tracker Strings */}
          <div className="mt-4 h-4 overflow-hidden relative w-48 text-center">
            <span className={`absolute inset-x-0 mx-auto text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-[#11261C]/50 transition-all duration-500 transform ${
              progress === 100 ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
            }`}>
              Nourishing your body
            </span>
            <span className={`absolute inset-x-0 mx-auto text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-[#D4A359] transition-all duration-500 transform ${
              progress === 100 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}>
              Ready for Vitality
            </span>
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