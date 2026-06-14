import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Sprout, Leaf, Snowflake, Utensils } from 'lucide-react';

const benefits = [
  {
    title: "High in Protein",
    desc: "Builds strength naturally",
    icon: <Dumbbell size={24} strokeWidth={2} />,
  },
  {
    title: "Rich in Fiber",
    desc: "Supports digestion & gut health",
    icon: <Sprout size={24} strokeWidth={2} />,
  },
  {
    title: "100% Natural",
    desc: "No chemicals, no preservatives",
    icon: <Leaf size={24} strokeWidth={2} />,
  },
  {
    title: "Cooling Effect",
    desc: "Perfect for Indian climate",
    icon: <Snowflake size={24} strokeWidth={2} />,
  },
  {
    title: "Keeps You Full",
    desc: "Helps in weight management",
    icon: <Utensils size={24} strokeWidth={2} />,
  },
];

const BenefitsStrip = () => {
  return (
    <section className="py-20 bg-[#FDF6E9] relative overflow-hidden border-y border-[#D9D3C7]">
      {/* Editorial micro-grid texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#1C3B24_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header - Aligned with Bestsellers style */}
        

        {/* Responsive Layout Grid - Medallion Style */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative flex flex-col items-center justify-center text-center transition-all duration-500"
            >
              {/* Premium Circular Medallion */}
              <div className="w-full aspect-square rounded-full bg-white border-[1px] border-[#D9D3C7] shadow-[0_15px_35px_-15px_rgba(28,59,36,0.08)] group-hover:shadow-[0_20px_50px_-20px_rgba(217,160,54,0.3)] group-hover:border-[#D9A036] transition-all duration-700 relative flex flex-col items-center justify-center p-6 sm:p-8 overflow-hidden">
                
                {/* Decorative Gold Ring Inner */}
                <div className="absolute inset-2 rounded-full border border-dashed border-[#D9A036]/20 group-hover:border-[#D9A036]/40 transition-colors duration-700" />
                
                {/* Icon Block - Elevated */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FDF6E9] border border-[#D9A036]/30 flex items-center justify-center text-[#1C3B24] mb-3 sm:mb-4 group-hover:bg-[#1C3B24] group-hover:text-white group-hover:border-[#1C3B24] transition-all duration-500 relative z-10 shadow-sm">
                  {React.cloneElement(benefit.icon, { size: 20, strokeWidth: 1.5 })}
                </div>
                
                {/* Feature Text */}
                <h3 className="text-xs sm:text-sm font-serif font-bold text-[#1C3B24] mb-1 sm:mb-2 relative z-10 tracking-tight">
                  {benefit.title}
                </h3>
                
                <p className="text-[9px] sm:text-[10px] font-sans font-medium text-[#8B7355] leading-tight tracking-wide relative z-10 px-2">
                  {benefit.desc}
                </p>

                {/* Subtle Grain Overlay on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] pointer-events-none transition-opacity duration-700 bg-repeat bg-[url('https://www.transparenttextures.com/patterns/p6-grain.png')]" />
              </div>

              {/* Bottom Gold Accent Shadow */}
              <div className="w-12 h-1 bg-[#D9A036]/20 blur-md rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default BenefitsStrip;