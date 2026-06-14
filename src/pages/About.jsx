import React from 'react';
import { Shield, Award, Zap, Sprout, Sparkles, Compass, Fingerprint, ArrowUpRight, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  // Cohesive premium easing variables
  const premiumEase = [0.25, 1, 0.5, 1];

  return (
    <div className="min-h-screen bg-[#FAF4E3] pt-32 lg:pt-48 pb-32 overflow-hidden selection:bg-[#203B23] selection:text-white">
      {/* Heritage Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6-grain.png')] mix-blend-multiply"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* ================= HERO ARCHITECTURE ================= */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-40">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: premiumEase }}
            className="lg:col-span-7 space-y-10"
          >
            <div className="flex items-center gap-2.5 text-[#976E2A]">
              <div className="flex items-center gap-1">
                <Leaf size={14} className="fill-current rotate-45" />
                <div className="w-8 h-[1px] bg-[#976E2A]/30" />
              </div>
              <span className="text-[10px] font-poppins font-bold uppercase tracking-[0.35em]">The Magadh Legacy</span>
            </div>
            
            <h1 className="text-[12vw] sm:text-[8vw] lg:text-[6vw] font-poppins font-bold text-[#203B23] leading-[0.95] tracking-tight uppercase">
              Ancestral <br />
              <span className="font-serif italic text-[#976E2A] lowercase font-normal">Super-Fuel</span> <br />
              Refined.
            </h1>
            
            <div className="h-[2px] w-20 bg-[#976E2A]/40" />
            
            <p className="text-base sm:text-lg text-[#605948] font-poppins font-medium leading-relaxed max-w-xl">
              We operate at the convergence of native agricultural wisdom and contemporary bio-availability analysis. Sattu is the raw, uncompromised performance secret of ancient India, architecturalized for the global vanguard.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: premiumEase }}
            className="lg:col-span-5 relative mt-8 lg:mt-0 w-full"
          >
            {/* Arched Architectural Frame */}
            <div className="aspect-[4/5] rounded-t-[180px] rounded-b-[40px] overflow-hidden bg-[#FFFDF6] border-[1.5px] border-[#E3DBC5] p-2 shadow-xl group">
              <div className="w-full h-full rounded-t-[175px] rounded-b-[32px] overflow-hidden relative">
                <img 
                  src="img/ss.png"
                  alt="Native Crop Sourcing" 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#203B23]/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
            
            {/* Floating Heritage Meta Token */}
            <div className="absolute -bottom-10 -right-6 lg:-left-12 bg-[#FFFDF6] rounded-[32px] p-8 shadow-2xl border border-[#E3DBC5] max-w-[260px] backdrop-blur-md">
              <div className="flex items-center gap-2 text-[#976E2A] mb-3">
                <Shield size={16} />
                <div className="h-[1px] flex-1 bg-[#976E2A]/20" />
              </div>
              <p className="text-4xl font-poppins font-bold text-[#203B23] mb-1 tracking-tight">100%</p>
              <p className="text-[10px] font-poppins font-bold uppercase tracking-[0.2em] text-[#976E2A]">Whole Food Integrity</p>
              <div className="mt-5 h-[1px] w-full border-t border-dashed border-[#E3DBC5]" />
              <p className="text-[11px] text-[#605948] font-poppins font-medium mt-4 leading-relaxed">Zero isolate proteins. Zero synthetic chemistry modifiers.</p>
            </div>
          </motion.div>
        </div>

        {/* ================= VALUE PILLARS MATRIX ================= */}
        <div className="mb-40">
          <div className="mb-16 max-w-xl">
            <div className="flex items-center gap-4 mb-4">
               <span className="text-[10px] font-poppins font-bold uppercase tracking-[0.25em] text-[#976E2A]">Our Mandate</span>
               <div className="h-[1px] w-12 bg-[#976E2A]/30" />
            </div>
            <h2 className="text-[32px] md:text-[44px] font-poppins font-bold tracking-tight text-[#203B23] leading-tight uppercase">Rigorous Production Benchmarks</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sprout size={24} />,
                title: "Direct Terroir Sourcing",
                desc: "We exclusively source premium chana variations cultivated via traditional dry-land farming structures across Bihar, paying direct premium wages to our farm partners."
              },
              {
                icon: <Zap size={24} />,
                title: "Slow Low-GI Influx",
                desc: "The ancient sand-roasting processing method locks in complex structural starches, yielding a natural fuel source that delivers sustained baseline glycogen metrics."
              },
              {
                icon: <Shield size={24} />,
                title: "Pristine Minimalist Label",
                desc: "Stone-milled precision without modification filters. No refined sugars, chemical stabilizers, or emulsifiers. Unrefined whole-food raw ingredients from earth to glass."
              }
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.8, ease: premiumEase }}
                className="p-10 rounded-[32px] bg-[#FFFDF6] border-[1.5px] border-[#E3DBC5] flex flex-col justify-between hover:border-[#976E2A]/40 transition-all duration-500 group relative shadow-sm"
              >
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAF4E3] border border-[#E3DBC5] flex items-center justify-center text-[#203B23] group-hover:bg-[#203B23] group-hover:text-white transition-all duration-500 shadow-sm relative">
                    {value.icon}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#976E2A] rounded-full border-2 border-white scale-0 group-hover:scale-100 transition-transform duration-500" />
                  </div>
                  <h3 className="text-xl font-poppins font-bold text-[#203B23] tracking-tight leading-tight">{value.title}</h3>
                  <p className="text-xs text-[#605948] font-poppins font-medium leading-relaxed">{value.desc}</p>
                </div>
                
                <div className="pt-6 mt-8 border-t border-dashed border-[#E3DBC5] flex items-center justify-between">
                  <span className="text-[10px] font-poppins font-bold uppercase tracking-wider text-[#976E2A]">Verified Standard</span>
                  <ArrowUpRight size={14} className="text-[#976E2A] transform group-hover:rotate-45 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= EDITORIAL MANIFESTO BOX ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: premiumEase }}
          className="bg-[#203B23] rounded-[48px] p-10 md:p-20 text-[#FAF4E3] relative overflow-hidden shadow-2xl"
        >
          {/* Large Watermark */}
          <div className="absolute bottom-[-5%] right-[-5%] text-[20vw] font-poppins font-black text-white/[0.03] uppercase pointer-events-none select-none tracking-tighter">
            BHARAT
          </div>
          
          <div className="relative z-10 max-w-4xl space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#976E2A]" />
              <span className="text-[11px] font-poppins font-bold uppercase tracking-[0.4em] text-[#976E2A]">The Charter of Truth</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold leading-[1.2] tracking-tighter text-white uppercase">
              “True health rejects <span className="font-serif italic text-[#976E2A] lowercase font-normal">synthetic</span> assembly lines. True longevity is achieved by restoring uncompromised <span className="text-[#976E2A]">native agriculture</span> back to life.”
            </h2>
            
            <div className="pt-10 border-t border-[#FAF4E3]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#976E2A]">
                  <Award size={20} />
                </div>
                <div>
                  <p className="font-poppins font-bold text-xs uppercase tracking-widest text-white">Biological Source Certified</p>
                  <p className="text-[10px] font-poppins font-medium text-[#FAF4E3]/40 uppercase tracking-[0.2em] mt-1">100% Traceable Farming Assets</p>
                </div>
              </div>
              
              <div className="flex gap-8">
                <span className="flex items-center gap-2 text-[11px] font-poppins font-bold uppercase tracking-widest text-[#FAF4E3]/30">
                  <Compass size={14} /> Global Distribution
                </span>
                <span className="flex items-center gap-2 text-[11px] font-poppins font-bold uppercase tracking-widest text-[#FAF4E3]/30">
                  <Fingerprint size={14} /> Authentic Sourcing
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;