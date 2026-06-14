import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook, ArrowUpRight, Sparkles, X, CheckCircle, Leaf } from 'lucide-react';
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
    { icon: <Mail size={18} />, label: "Electronic Mail", val: "hello@sattudrink.com", href: "mailto:hello@sattudrink.com" },
    { icon: <Phone size={18} />, label: "Direct Telephony", val: "+91 98765 43210", href: "tel:+919876543210" },
    { icon: <MapPin size={18} />, label: "Apothecary Base", val: "Patna, Bihar, India", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-[#FAF4E3] pt-32 lg:pt-48 pb-32 text-[#203B23] relative selection:bg-[#203B23] selection:text-white overflow-hidden">
      {/* Heritage Detail Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6-grain.png')] mix-blend-multiply"></div>

      {/* Premium Elegant Submission Notification System */}
      <AnimatePresence>
        {formSubmitted && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-12 left-1/2 z-50 bg-[#203B23] border border-[#FAF4E3]/10 text-[#FAF4E3] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 backdrop-blur-md max-w-md w-[90%]"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FAF4E3]/10 flex items-center justify-center text-[#976E2A]">
                <CheckCircle size={18} />
            </div>
            <p className="text-[11px] font-poppins font-medium tracking-wide flex-1 leading-relaxed">Inquiry successfully logged into our digital registry. Our specialists will respond shortly.</p>
            <button onClick={() => setFormSubmitted(false)} className="opacity-40 hover:opacity-100 transition-opacity p-2">
              <X size={16} />
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
              <div className="flex items-center gap-2.5 text-[#976E2A]">
                <div className="flex items-center gap-1">
                    <Leaf size={14} className="fill-current rotate-45" />
                    <div className="w-8 h-[1px] bg-[#976E2A]/30" />
                </div>
                <span className="text-[10px] font-poppins font-bold uppercase tracking-[0.35em]">Communications Portal</span>
              </div>
              <h1 className="text-[11vw] sm:text-[7vw] lg:text-[4.5vw] font-poppins font-bold text-[#203B23] leading-[0.95] tracking-tight uppercase">
                Initiate a <br />
                <span className="font-serif italic text-[#976E2A] lowercase font-normal">Dialogue</span>
              </h1>
              <p className="text-sm md:text-base text-[#605948] font-poppins font-medium leading-relaxed max-w-md">
                Have rigorous inquiries regarding our whole-grain formulations, regional sourcing, or tailored nutritional integration? Reach our council directly.
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
                  className="flex items-center gap-6 p-6 bg-[#FFFDF6] border-[1.5px] border-[#E3DBC5] rounded-[24px] hover:border-[#976E2A]/50 hover:shadow-2xl transition-all duration-500 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#FAF4E3] border border-[#E3DBC5] text-[#203B23] group-hover:bg-[#203B23] group-hover:text-white flex items-center justify-center transition-all duration-500 shrink-0 shadow-sm">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-poppins font-bold uppercase tracking-[0.2em] text-[#976E2A] mb-1">{item.label}</p>
                    <p className="text-lg font-poppins font-bold text-[#203B23] tracking-tight truncate">{item.val}</p>
                  </div>
                  <ArrowUpRight size={16} className={`text-[#976E2A] transition-all duration-500 ${activeChannel === i ? 'rotate-45 scale-125' : ''}`} />
                </a>
              ))}
            </div>

            {/* Premium Social Matrix Ties */}
            <div className="pt-10 border-t border-dashed border-[#E3DBC5] space-y-6">
              <p className="text-[10px] font-poppins font-bold uppercase tracking-[0.25em] text-[#976E2A]">Syndicated Networks</p>
              <div className="flex gap-4">
                {[
                  { Icon: Instagram, link: "#" },
                  { Icon: Twitter, link: "#" },
                  { Icon: Facebook, link: "#" }
                ].map((social, i) => (
                  <a 
                    href={social.link} 
                    key={i} 
                    className="w-12 h-12 rounded-2xl border-[1.5px] border-[#E3DBC5] bg-[#FFFDF6] flex items-center justify-center text-[#605948] hover:text-white hover:bg-[#203B23] hover:border-[#203B23] hover:shadow-xl transition-all duration-300"
                  >
                    <social.Icon size={18} />
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
            <div className="bg-[#FFFDF6] border-[1.5px] border-[#E3DBC5] rounded-[40px] p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden group">
              {/* Asymmetric Reference Index Tag */}
              <div className="absolute top-0 right-0 p-8 text-[9px] font-mono font-medium text-[#203B23]/10 tracking-widest uppercase pointer-events-none group-hover:text-[#976E2A]/20 transition-colors duration-700">
                FORM_REF//MDS-24
              </div>

              <form className="space-y-10" onSubmit={handleFormSubmit}>
                <div className="grid sm:grid-cols-2 gap-8">
                  {/* Name Input Ingestion Node */}
                  <div className="space-y-2.5">
                    <label className="text-[10px] font-poppins font-bold uppercase tracking-widest text-[#976E2A] ml-1">Your Identity</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-[#FAF4E3]/30 border border-[#E3DBC5] rounded-2xl px-6 py-4.5 text-[13px] font-poppins font-medium text-[#203B23] outline-none focus:border-[#976E2A]/40 focus:bg-white transition-all shadow-inner placeholder:text-[#605948]/30" 
                      placeholder="e.g., Aman Singh" 
                    />
                  </div>
                  {/* Email Input Ingestion Node */}
                  <div className="space-y-2.5">
                    <label className="text-[10px] font-poppins font-bold uppercase tracking-widest text-[#976E2A] ml-1">Electronic Mailway</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-[#FAF4E3]/30 border border-[#E3DBC5] rounded-2xl px-6 py-4.5 text-[13px] font-poppins font-medium text-[#203B23] outline-none focus:border-[#976E2A]/40 focus:bg-white transition-all shadow-inner placeholder:text-[#605948]/30" 
                      placeholder="name@domain.com" 
                    />
                  </div>
                </div>

                {/* Subject Dropdown Core */}
                <div className="space-y-2.5">
                  <label className="text-[10px] font-poppins font-bold uppercase tracking-widest text-[#976E2A] ml-1">Inquiry Parameter</label>
                  <div className="relative">
                    <select className="w-full bg-[#FAF4E3]/30 border border-[#E3DBC5] rounded-2xl px-6 py-4.5 text-[13px] font-poppins font-medium text-[#203B23] outline-none focus:border-[#976E2A]/40 focus:bg-white transition-all shadow-inner appearance-none cursor-pointer">
                      <option>Product Composition Inquiry</option>
                      <option>Logistics & Order Status</option>
                      <option>Enterprise B2B / Bulk Procurement</option>
                      <option>Physiological Feedback</option>
                    </select>
                    {/* Minimalist Selection Arrow Accent */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#976E2A] text-[12px]">▼</div>
                  </div>
                </div>

                {/* Textarea Narrative Box */}
                <div className="space-y-2.5">
                  <label className="text-[10px] font-poppins font-bold uppercase tracking-widest text-[#976E2A] ml-1">Narrative Formulation</label>
                  <textarea 
                    rows="5" 
                    required
                    className="w-full bg-[#FAF4E3]/30 border border-[#E3DBC5] rounded-2xl px-6 py-5 text-[13px] font-poppins font-medium text-[#203B23] outline-none focus:border-[#976E2A]/40 focus:bg-white transition-all resize-none shadow-inner placeholder:text-[#605948]/30" 
                    placeholder="Elaborate on your requirements or feedback here..."
                  ></textarea>
                </div>

                {/* Modernized Submission Node Button */}
                <button 
                  type="submit"
                  className="w-full h-16 rounded-2xl bg-[#203B23] text-[#FAF4E3] font-poppins font-bold text-[11px] uppercase tracking-[0.3em] shadow-2xl shadow-[#203B23]/20 hover:bg-[#C45525] transition-all duration-500 transform active:scale-[0.98] flex items-center justify-center gap-4 group"
                >
                  <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                  <span>Transmit Protocol</span>
                  <div className="w-6 h-[1px] bg-[#FAF4E3]/30 group-hover:w-10 transition-all duration-500" />
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;t;