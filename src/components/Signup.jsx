import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./useAuth";
import { Mail, Lock, User, ArrowRight, Leaf, AlertCircle, ShieldCheck, Eye, EyeOff, Sparkles, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const premiumEase = [0.25, 1, 0.5, 1];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(email, password, displayName);
      navigate("/");
    } catch {
      setError("We encountered an error initializing your profile. Please check your data and retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-28 bg-[#FAF4E3] text-[#203B23] flex relative overflow-hidden selection:bg-[#976E2A] selection:text-[#FFFDF6]">
      
      {/* Background Textures */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6-grain.png')] mix-blend-multiply" />
      
      {/* LEFT COLUMN: BRAND NARRATIVE (HIDDEN ON MOBILE) */}
      <div className="hidden lg:flex w-[45%] bg-[#203B23] relative flex-col justify-between p-16 overflow-hidden">
        {/* Subtle geometric dot matrix overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#FAF4E3_1.5px,transparent_1.5px)] [background-size:32px_32px]" />
        
        {/* Abstract luxury background glow */}
        <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-[#976E2A]/20 rounded-full blur-[140px]" />
        
        <Link to="/" className="relative z-10 flex items-center gap-3 text-[#FAF4E3] text-[11px] font-poppins font-bold uppercase tracking-[0.4em] hover:text-[#976E2A] transition-colors group">
          <div className="w-8 h-8 rounded-full bg-[#FAF4E3]/10 flex items-center justify-center border border-[#FAF4E3]/20 group-hover:border-[#976E2A]/40 transition-colors">
            <Leaf size={14} className="text-[#976E2A]" />
          </div>
          <span>Indian Food Way</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 space-y-8 max-w-sm"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FAF4E3]/10 border border-[#FAF4E3]/20 text-[9px] font-poppins font-bold uppercase tracking-[0.4em] text-[#976E2A]">
            Maison Allocation Registry
          </span>
          <h1 className="text-5xl xl:text-6xl font-poppins font-bold text-[#FAF4E3] leading-[1.1] tracking-tight">
            Secure your allocation of heritage blends.
          </h1>
          <p className="text-sm text-[#FAF4E3]/60 font-poppins leading-relaxed tracking-wide font-medium">
            Registered members receive direct sensory prioritization, customizable dietary shipment intervals, and access to the full heritage grain boutique.
          </p>
        </motion.div>

        <div className="relative z-10 border-t border-[#FAF4E3]/10 pt-8 flex items-center justify-between text-[9px] font-poppins font-bold tracking-[0.3em] text-[#FAF4E3]/40 uppercase">
          <span>© 2026 INDIAN FOOD WAY</span>
          <div className="flex gap-4">
             <div className="w-1.5 h-1.5 bg-[#976E2A] rotate-45" />
             <span>Pure Nutrition</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: INTERACTIVE REGISTRY FILL WORKSPACE */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 py-20 relative">
        <div className="w-full max-w-[440px] relative z-10">
          
          {/* Back Action */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] font-poppins font-bold uppercase tracking-[0.25em] text-[#976E2A] mb-12 hover:text-[#203B23] transition-colors group"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Boutique</span>
          </button>

          {/* Section Header Text Stack */}
          <div className="mb-10">
            <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-[#203B23] tracking-tight mb-4">
              Join the Registry
            </h2>
            <p className="text-sm text-[#203B23]/60 font-poppins font-medium tracking-wide">
              Initialize your unique authentication parameters to authorize your unique boutique workspace.
            </p>
          </div>

          {/* Premium Error Diagnostics Prompt */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 p-5 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4 text-red-700 text-xs font-bold leading-relaxed shadow-sm"
              >
                <AlertCircle size={18} className="shrink-0 text-red-500 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Node Ecosystem */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Display Name Input Block */}
            <div className="space-y-2">
              <label className="text-[10px] font-poppins font-bold uppercase tracking-[0.3em] text-[#203B23]/40 ml-1">
                Full Identity Label
              </label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#203B23]/20 group-focus-within:text-[#976E2A] transition-colors duration-300">
                  <User size={18} strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Julian Vane"
                  className="w-full pl-16 pr-6 py-4.5 rounded-2xl bg-[#FFFDF6] border border-[#E3DBC5] focus:border-[#203B23] outline-none transition-all duration-500 font-poppins font-bold text-[14px] text-[#203B23] placeholder:text-[#203B23]/20 shadow-[0_4px_20px_rgba(32,59,35,0.02)]"
                  required
                />
              </div>
            </div>

            {/* Email Input Block */}
            <div className="space-y-2">
              <label className="text-[10px] font-poppins font-bold uppercase tracking-[0.3em] text-[#203B23]/40 ml-1">
                Communication Endpoint
              </label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#203B23]/20 group-focus-within:text-[#976E2A] transition-colors duration-300">
                  <Mail size={18} strokeWidth={1.5} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-16 pr-6 py-4.5 rounded-2xl bg-[#FFFDF6] border border-[#E3DBC5] focus:border-[#203B23] outline-none transition-all duration-500 font-poppins font-bold text-[14px] text-[#203B23] placeholder:text-[#203B23]/20 shadow-[0_4px_20px_rgba(32,59,35,0.02)]"
                  required
                />
              </div>
            </div>

            {/* Password Input Block */}
            <div className="space-y-2">
              <label className="text-[10px] font-poppins font-bold uppercase tracking-[0.3em] text-[#203B23]/40 ml-1">
                Registry Cipher Key
              </label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#203B23]/20 group-focus-within:text-[#976E2A] transition-colors duration-300">
                  <Lock size={18} strokeWidth={1.5} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full pl-16 pr-14 py-4.5 rounded-2xl bg-[#FFFDF6] border border-[#E3DBC5] focus:border-[#203B23] outline-none transition-all duration-500 font-poppins font-bold text-[14px] text-[#203B23] placeholder:text-[#203B23]/20 shadow-[0_4px_20px_rgba(32,59,35,0.02)]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#203B23]/20 hover:text-[#203B23] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            {/* Legal Disclosure Panel */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#FFFDF6] border border-[#E3DBC5]/60 shadow-[0_8px_20px_rgba(32,59,35,0.03)]">
              <ShieldCheck size={18} className="text-[#976E2A] shrink-0 mt-0.5" />
              <p className="text-[10px] text-[#203B23]/60 font-poppins font-bold leading-relaxed tracking-wide">
                By processing initialization, you fully authorize our <span className="text-[#203B23] underline underline-offset-4 cursor-pointer hover:text-[#976E2A] transition-colors">Terms of Covenant</span> and dynamic <span className="text-[#203B23] underline underline-offset-4 cursor-pointer hover:text-[#976E2A] transition-colors">Privacy Protocol</span>.
              </p>
            </div>

            {/* Submit Committal Interaction Node */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full h-[64px] rounded-2xl bg-[#203B23] text-[#FFFDF6] font-poppins font-bold text-[11px] uppercase tracking-[0.3em] shadow-[0_15px_30px_rgba(32,59,35,0.15)] hover:bg-[#976E2A] transition-all duration-500 flex items-center justify-center gap-4 transform active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none mt-4"
            >
              {loading ? (
                <div className="relative w-6 h-6">
                  <div className="absolute inset-0 border-2 border-[#FFFDF6]/20 rounded-full" />
                  <div className="absolute inset-0 border-2 border-t-[#FFFDF6] rounded-full animate-spin" />
                </div>
              ) : (
                <>
                  <Sparkles size={16} className="text-[#976E2A]" />
                  <span>Initialize Profile Registry</span>
                  <ArrowRight size={16} strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          {/* Fallback Entry Pointer */}
          <div className="mt-12 text-center">
            <p className="text-sm text-[#203B23]/40 font-poppins font-medium tracking-wide">
              Already hold house registration?{" "}
              <Link to="/login" className="text-[#203B23] font-bold hover:text-[#976E2A] ml-2 transition-colors duration-300 pb-0.5 border-b border-dashed border-[#203B23]/20 hover:border-[#976E2A]">
                Authenticate Securely
              </Link>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Signup;
