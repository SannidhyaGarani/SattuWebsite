import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook, ArrowUpRight, Sparkles, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeChannel, setActiveChannel] = useState(null);
  
  const premiumEase = [0.25, 1, 0.5, 1];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const communicationChannels = [
    { icon: <Mail size={18} strokeWidth={1.5} />, label: "Electronic Mail", val: "hello@sattudrink.com", href: "mailto:hello@sattudrink.com" },
    { icon: <Phone size={18} strokeWidth={1.5} />, label: "Direct Telephony", val: "+91 98765 43210", href: "tel:+919876543210" },
    { icon: <MapPin size={18} strokeWidth={1.5} />, label: "Apothecary Base", val: "Patna, Bihar, India", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F6] pt-32 lg:pt-48 pb-32 text-[#1C2B21] relative selection:bg-[#1C3B24] selection:text-white">
      {/* Light Luxury Geometric Dot Mesh Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:32px_32px]"></div>

      {/* Premium Elegant Submission Notification System */}
      <AnimatePresence>
        {formSubmitted && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-12 left-1/2 z-50 bg-[#1C3B24] border border-white/10 text-[#EFECE6] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 backdrop-blur-md max-w-md w-[90%]"
          >
            <CheckCircle size={16} className="text-[#D9A036] shrink-0" />
            <p className="text-xs font-light tracking-wide flex-1">Inquiry successfully logged into our digital registry. Our specialists will respond shortly.</p>
            <button onClick={() => setFormSubmitted(false)} className="opacity-40 hover:opacity-100 transition-opacity">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* ================= LEFT COLUMN: ARCHITECTURAL METADATA ================= */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: premiumEase }}
            className="lg:col-span-5 space-y-16"
          >
            {/* Header Content Matrix */}
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-[#D9A036]">
                <Sparkles size={12} strokeWidth={1.5} />
                <span className="text-[10px] font-bold uppercase tracking-[0.35em]">Communications Portal</span>
              </div>
              <h1 className="text-[11vw] sm:text-[7vw] lg:text-[4.5vw] font-serif font-light text-[#1C2B21] leading-[0.95] tracking-tighter">
                Initiate a <br />
                <span className="font-serif italic text-[#1C3B24] font-normal">Dialogue</span>
              </h1>
              <p className="text-sm text-[#5C665E] font-light leading-relaxed max-w-md">
                Have rigorous technical inquiries regarding our dynamic whole-grain formulations, regional sourcing parameters, or tailored nutritional integration protocols? Reach our council directly.
              </p>
            </div>

            {/* Interactive Channels Register */}
            <div className="space-y-4">
              {communicationChannels.map((item, i) => (
                <a 
                  href={item.href}
                  key={i} 
                  onMouseEnter={() => setActiveChannel(i)}
                  onMouseLeave={() => setActiveChannel(null)}
                  className="flex items-center gap-6 p-5 bg-white border border-[#EAE6DF] rounded-xl hover:border-[#9A8F80]/50 hover:shadow-[0_15px_40px_rgba(28,43,33,0.02)] transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#F9F8F6] border border-[#EAE6DF] text-[#1C3B24] group-hover:bg-[#1C3B24] group-hover:text-white flex items-center justify-center transition-all duration-500 shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#9A8F80] mb-0.5">{item.label}</p>
                    <p className="text-base font-serif font-bold text-[#1C2B21] tracking-tight truncate">{item.val}</p>
                  </div>
                  <ArrowUpRight size={14} className={`text-[#9A8F80] transition-transform duration-500 ${activeChannel === i ? 'rotate-45 text-[#D9A036]' : ''}`} />
                </a>
              ))}
            </div>

            {/* Premium Social Matrix Ties */}
            <div className="pt-10 border-t border-[#EAE6DF] space-y-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9A8F80]">Syndicated Networks</p>
              <div className="flex gap-3">
                {[
                  { Icon: Instagram, link: "#" },
                  { Icon: Twitter, link: "#" },
                  { Icon: Facebook, link: "#" }
                ].map((social, i) => (
                  <a 
                    href={social.link} 
                    key={i} 
                    className="w-11 h-11 rounded-lg border border-[#EAE6DF] bg-white flex items-center justify-center text-[#5C665E] hover:text-[#1C3B24] hover:border-[#1C3B24] hover:shadow-sm transition-all duration-300"
                  >
                    <social.Icon size={16} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN: PREMIUM INTAKE DISPATCH ================= */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 1, ease: premiumEase }}
            className="lg:col-span-7"
          >
            <div className="bg-white border border-[#EAE6DF] rounded-2xl p-8 sm:p-12 md:p-16 shadow-[0_30px_70px_rgba(28,43,33,0.02)] relative overflow-hidden">
              {/* Asymmetric Reference Index Tag */}
              <div className="absolute top-0 right-0 p-8 text-[9px] font-mono font-light text-[#9A8F80]/40 tracking-widest uppercase pointer-events-none">
                FORM_REF//MDS-09
              </div>

              <form className="space-y-8" onSubmit={handleFormSubmit}>
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name Input Ingestion Node */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[#9A8F80] ml-1">Your Identity</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-[#F9F8F6]/50 border border-[#EAE6DF] rounded-xl px-5 py-4 text-xs font-light text-[#1C2B21] outline-none focus:border-[#1C3B24]/40 focus:bg-white transition-all shadow-inner placeholder:text-[#9A8F80]/40" 
                      placeholder="e.g., Aman Singh" 
                    />
                  </div>
                  {/* Email Input Ingestion Node */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[#9A8F80] ml-1">Electronic Mailway</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-[#F9F8F6]/50 border border-[#EAE6DF] rounded-xl px-5 py-4 text-xs font-light text-[#1C2B21] outline-none focus:border-[#1C3B24]/40 focus:bg-white transition-all shadow-inner placeholder:text-[#9A8F80]/40" 
                      placeholder="name@domain.com" 
                    />
                  </div>
                </div>

                {/* Subject Dropdown Core */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-[#9A8F80] ml-1">Inquiry Parameter</label>
                  <div className="relative">
                    <select className="w-full bg-[#F9F8F6]/50 border border-[#EAE6DF] rounded-xl px-5 py-4 text-xs font-light text-[#1C2B21] outline-none focus:border-[#1C3B24]/40 focus:bg-white transition-all shadow-inner appearance-none cursor-pointer">
                      <option>Product Composition Inquiry</option>
                      <option>Logistics & Order Status</option>
                      <option>Enterprise B2B / Bulk Procurement</option>
                      <option>Physiological Feedback</option>
                    </select>
                    {/* Minimalist Selection Arrow Accent */}
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#9A8F80] text-[10px]">▼</div>
                  </div>
                </div>

                {/* Textarea Narrative Box */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-[#9A8F80] ml-1">Narrative Formulation</label>
                  <textarea 
                    rows="5" 
                    required
                    className="w-full bg-[#F9F8F6]/50 border border-[#EAE6DF] rounded-xl px-5 py-4 text-xs font-light text-[#1C2B21] outline-none focus:border-[#1C3B24]/40 focus:bg-white transition-all resize-none shadow-inner placeholder:text-[#9A8F80]/40" 
                    placeholder="Elaborate on your biological requirements or context details here..."
                  ></textarea>
                </div>

                {/* Modernized Submission Node Button */}
                <button 
                  type="submit"
                  className="w-full h-14 rounded-xl bg-[#1C3B24] text-[#EFECE6] font-bold text-[10px] uppercase tracking-[0.25em] shadow-xl shadow-[#1C3B24]/10 hover:bg-[#1C2B21] transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3 group"
                >
                  <Send size={13} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  <span>Transmit Protocol</span>
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;