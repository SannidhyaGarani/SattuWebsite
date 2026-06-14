import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Sprout, Leaf, Snowflake, Utensils } from 'lucide-react';

const benefits = [
  {
    title: "High in Protein",
    desc: "Builds strength naturally from within",
    icon: <Dumbbell size={32} strokeWidth={1.5} />,
  },
  {
    title: "Rich in Fiber",
    desc: "Supports seamless gut health & digestion",
    icon: <Sprout size={32} strokeWidth={1.5} />,
  },
  {
    title: "100% Natural",
    desc: "Zero chemicals, pure raw potency",
    icon: <Leaf size={32} strokeWidth={1.5} />,
  },
  {
    title: "Cooling Effect",
    desc: "Perfect structural hydration for summer",
    icon: <Snowflake size={32} strokeWidth={1.5} />,
  },
  {
    title: "Keeps You Full",
    desc: "Sustained fuel that manages cravings",
    icon: <Utensils size={32} strokeWidth={1.5} />,
  },
];

const BenefitsStrip = () => {
  return (
    <section className="py-16 md:py-20 bg-[#FDFBF7] relative overflow-hidden">
      {/* Editorial Top/Bottom Accent Borders */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#11261C]/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#11261C]/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Compact Layout Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 justify-center items-start">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className="group flex flex-col items-center text-center w-full"
            >
              
              {/* THE HERO CIRCLE: Deep Dark Velvet Green Background */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#11261C] border border-[#D4A359]/30 flex items-center justify-center relative transition-all duration-500 shadow-[0_15px_30px_rgba(17,38,28,0.15)] group-hover:border-[#D4A359] group-hover:shadow-[0_0_40px_rgba(212,163,89,0.35)] group-hover:scale-105 mb-5">
                
                {/* Expanding Outer Accent Ring */}
                <div className="absolute -inset-1.5 rounded-full border border-dashed border-[#D4A359]/10 group-hover:border-[#D4A359]/50 group-hover:scale-105 transition-all duration-500 pointer-events-none" />
                
                {/* Deep Inner Glow Shadow Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/40 via-transparent to-white/5 pointer-events-none" />
                
                {/* Radiant Highlighted Icon */}
                <div className="text-[#D4A359] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] group-hover:scale-110 group-hover:text-[#FFF] group-hover:drop-shadow-[0_0_12px_rgba(212,163,89,0.8)] transition-all duration-400 relative z-10">
                  {benefit.icon}
                </div>
              </div>

              {/* TEXT BLOCK: High Contrast Typography */}
              <div className="px-2">
                {/* Main Highlight Title */}
                <h3 className="text-sm sm:text-base font-serif font-bold text-[#11261C] tracking-tight mb-1.5 group-hover:text-[#D4A359] transition-colors duration-300">
                  {benefit.title}
                </h3>
                
                {/* Secondary Muted Description */}
                <p className="text-[11px] sm:text-xs font-sans font-medium text-[#5A6960] leading-snug max-w-[160px] mx-auto group-hover:text-[#11261C] transition-colors duration-300">
                  {benefit.desc}
                </p>
              </div>

              {/* Micro Floor Pointer Highlight */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4A359] mt-4 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-400 shadow-[0_0_8px_#D4A359]" />

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BenefitsStrip;