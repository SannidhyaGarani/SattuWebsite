import React from 'react';
import { Shield, Award, Zap, Sprout, Sparkles, Compass, Fingerprint, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  // Cohesive premium easing variables
  const premiumEase = [0.25, 1, 0.5, 1];

  return (
    <div className="min-h-screen bg-[#F9F8F6] pt-32 lg:pt-48 pb-32 overflow-hidden selection:bg-[#1C3B24] selection:text-white">
      {/* Light Luxury Geometric Dot Mesh Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:32px_32px]"></div>

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
            <div className="flex items-center gap-2.5 text-[#D9A036]">
              <Sparkles size={12} strokeWidth={1.5} />
              <span className="text-[10px] font-bold uppercase tracking-[0.35em]">The Magadh Legacy</span>
            </div>
            
            <h1 className="text-[12vw] sm:text-[8vw] lg:text-[6.5vw] font-serif font-light text-[#1C2B21] leading-[0.95] tracking-tighter">
              Ancestral Fuel. <br />
              <span className="font-serif italic text-[#1C3B24] font-normal">Biological</span> <br />
              Refinement.
            </h1>
            
            <div className="h-[1px] w-20 bg-[#D9A036]" />
            
            <p className="text-base sm:text-lg text-[#5C665E] font-light leading-relaxed max-w-xl">
              We operate at the convergence of native agricultural wisdom and contemporary bio-availability analysis. Sattu is not a modern formulation; it is the raw, uncompromised performance secret of ancient India, architecturalized for the global vanguard.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: premiumEase }}
            className="lg:col-span-5 relative mt-8 lg:mt-0 w-full"
          >
            {/* Main Editorial Canvas Image */}
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#EFECE6] border border-[#EAE6DF] shadow-md group">
              <img 
                src="img/ss.png"
                alt="Native Crop Sourcing" 
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C2B21]/20 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Floating Heritage Meta Token */}
            <div className="absolute -bottom-10 -left-6 sm:left-12 bg-white rounded-lg p-8 shadow-[0_30px_70px_rgba(28,43,33,0.08)] border border-[#EAE6DF] max-w-[240px] hidden sm:block backdrop-blur-md">
              <p className="text-4xl font-serif font-light text-[#1C3B24] mb-1 tracking-tight">100%</p>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A69F91]">Whole Food Integrity</p>
              <div className="mt-5 h-[1px] w-full bg-[#EAE6DF]" />
              <p className="text-[10px] text-[#707A72] font-light mt-3 leading-relaxed">Zero isolate proteins. Zero synthetic chemistry modifiers.</p>
            </div>
          </motion.div>
        </div>

        {/* ================= VALUE PILLARS MATRIX ================= */}
        <div className="mb-40">
          <div className="mb-16 max-w-md">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9A8F80] mb-3">Our Mandate</p>
            <h2 className="text-2xl font-serif font-light tracking-tight text-[#1C2B21]">Rigorous Production Benchmarks</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sprout size={24} strokeWidth={1.2} />,
                title: "Direct Terroir Sourcing",
                desc: "We exclusively source premium black chana variations cultivated via traditional dry-land farming structures across Bihar, paying direct premium wages to our heritage farm partners."
              },
              {
                icon: <Zap size={24} strokeWidth={1.2} />,
                title: "Slow Low-GI Influx",
                desc: "The ancient sand-roasting processing method locks in complex structural starches, yielding a natural fuel source that delivers sustained baseline glycogen metrics without blood sugar spikes."
              },
              {
                icon: <Shield size={24} strokeWidth={1.2} />,
                title: "Pristine Minimalist Label",
                desc: "Stone-milled precision without modification filters. No refined sugars, chemical stabilizers, or emulsifiers. Unrefined whole-food raw ingredients from native earth to glass."
              }
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.8, ease: premiumEase }}
                className="p-10 rounded-xl bg-white border border-[#EAE6DF] flex flex-col justify-between hover:shadow-[0_24px_60px_rgba(28,43,33,0.04)] transition-all duration-500 group relative overflow-hidden"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-lg bg-[#F9F8F6] border border-[#EAE6DF] flex items-center justify-center text-[#1C3B24] group-hover:bg-[#1C3B24] group-hover:text-white transition-all duration-500">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#1C2B21] tracking-tight">{value.title}</h3>
                  <p className="text-xs text-[#5C665E] font-light leading-relaxed">{value.desc}</p>
                </div>
                
                {/* Decorative Micro Vector Accent */}
                <div className="pt-6 mt-8 border-t border-[#F9F8F6] flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#D9A036]">Verified Standard</span>
                  <ArrowUpRight size={12} className="text-[#9A8F80]" />
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
          className="bg-[#1C3B24] rounded-2xl p-10 md:p-20 text-[#EFECE6] relative overflow-hidden shadow-xl"
        >
          {/* Asymmetric Artistic Overlay Gradients */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D9A036]/10 rounded-full blur-[160px] opacity-30 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:24px_24px]"></div>
          
          <div className="relative z-10 max-w-4xl space-y-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-[#D9A036]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#D9A036]">The Charter of Truth</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-light leading-[1.25] tracking-tight text-white">
              “True health rejects modern synthetic assembly lines. True longevity is achieved by restoring deep, uncompromised, <span className="font-serif italic text-[#D9A036]">native agriculture metrics</span> back to daily life.”
            </h2>
            
            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D9A036]">
                  <Award size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-sans font-bold text-xs uppercase tracking-widest text-white">Biological Source Certified</p>
                  <p className="text-[9px] text-[#A69F91] uppercase tracking-widest mt-0.5">100% Traceable Farming Assets</p>
                </div>
              </div>
              
              {/* Secondary Context Micro Credentials */}
              <div className="flex gap-8 text-[10px] uppercase tracking-widest font-medium text-[#A69F91]">
                <span className="flex items-center gap-1.5"><Compass size={11} /> Identity Protected</span>
                <span className="flex items-center gap-1.5"><Fingerprint size={11} /> Stone Milled Real</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;