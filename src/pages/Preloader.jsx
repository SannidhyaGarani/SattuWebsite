import React, { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';

const PremiumPreloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLifting, setIsLifting] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Show logo shortly after mounting
    const logoTimer = setTimeout(() => setShowLogo(true), 300);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Smooth, non-linear progression
        const increment = Math.random() * (prev > 80 ? 2 : 15);
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => {
      clearInterval(timer);
      clearTimeout(logoTimer);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsLifting(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 1200);
      }, 800);
    }
  }, [progress, onComplete]);

  return (
    <div className={`fixed inset-0 z-[10000] flex items-center justify-center bg-[#F3ECE1] overflow-hidden transition-transform duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${
      isLifting ? '-translate-y-full' : 'translate-y-0'
    }`}>
      
      {/* Background Layer: Slow Moving Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] animate-slow-pan" />
      </div>

      <div className="relative flex flex-col items-center">
        
        {/* The "Aura" - A soft glow behind the logo */}
        <div className={`absolute w-64 h-64 bg-[#4A5D4E]/10 rounded-full blur-[100px] transition-all duration-1000 ${
          showLogo ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`} />

        {/* Brand Identity Section */}
        <div className="relative overflow-hidden mb-12 py-2 px-4">
          <div className={`transition-all duration-1000 ease-out flex flex-col items-center ${
            showLogo ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="w-20 h-20 bg-[#4A5D4E] rounded-full flex items-center justify-center text-[#FDFBF7] mb-6 shadow-2xl shadow-[#4A5D4E]/20">
              <Leaf size={40} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#4A5D4E]/40 mb-4">
              Est. 2024
            </span>
            <h1 className="text-4xl md:text-6xl font-serif italic text-[#2D231D] tracking-tight">
              Sattu <span className="not-italic font-black text-[#4A5D4E] uppercase tracking-tighter">Drink</span>
            </h1>
          </div>
        </div>

        {/* Minimalist Progress Container */}
        <div className="relative w-48 h-[2px] bg-[#4A5D4E]/5 overflow-hidden rounded-full">
          <div 
            className="absolute top-0 left-0 h-full bg-[#4A5D4E] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Numerical Counter - Floating & Subtle */}
        <div className="mt-6 overflow-hidden h-6">
          <p className={`text-[10px] font-black uppercase tracking-[0.4em] text-[#2D231D]/60 transition-transform duration-500 ${
            progress === 100 ? '-translate-y-full' : 'translate-y-0'
          }`}>
            Nourishing Your Body... {Math.floor(progress)}%
          </p>
          <p className={`text-[10px] font-black uppercase tracking-[0.4em] text-[#4A5D4E] transition-transform duration-500 ${
            progress === 100 ? '-translate-y-full' : 'translate-y-0'
          }`}>
            Ready for Vitality
          </p>
        </div>

      </div>

      {/* Aesthetic Border - Frame Effect */}
      <div className={`absolute inset-10 border border-[#4A5D4E]/10 pointer-events-none transition-opacity duration-700 ${
        showLogo ? 'opacity-100' : 'opacity-0'
      }`} />

      <style jsx>{`
        @keyframes slow-pan {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-2%, -2%); }
          100% { transform: translate(0, 0); }
        }
        .animate-slow-pan {
          animation: slow-pan 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PremiumPreloader;