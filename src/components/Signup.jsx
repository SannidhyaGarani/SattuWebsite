import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./useAuth";
import { Mail, Lock, User, ArrowRight, Leaf, AlertCircle, ShieldCheck, Eye, EyeOff } from "lucide-react";
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
    <div className="min-h-screen bg-[#FDFBF7] mt-35 text-[#1C2B21] flex relative overflow-hidden selection:bg-[#1C3B24] selection:text-white">
      
      {/* LEFT COLUMN: BRAND NARRATIVE CANVAS (HIDDEN ON MOBILE) */}
      <div className="hidden lg:flex w-[45%] bg-[#1C3B24] relative flex-col justify-between p-16 overflow-hidden">
        {/* Subtle geometric dot matrix overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Abstract luxury background glow */}
        <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-[#D9A036]/10 rounded-full blur-[140px]" />
        
        <Link to="/" className="relative z-10 flex items-center gap-2 text-[#EFECE6] text-[11px] font-bold uppercase tracking-[0.3em] opacity-80 hover:opacity-100 transition-opacity">
          <Leaf size={16} className="text-[#D9A036]" />
          <span>Sattu Maison d'Origine</span>
        </Link>

        <div className="relative z-10 space-y-6 max-w-sm">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D9A036]">Maison Allocation Registry</span>
          <h1 className="text-4xl xl:text-5xl font-serif font-light text-[#EFECE6] leading-[1.15] tracking-tight">
            Secure your allocation of rare stone-ground blends.
          </h1>
          <p className="text-xs text-[#EFECE6]/60 font-light leading-relaxed tracking-wide">
            Registered members receive direct sensory prioritization, customizable dietary shipment intervals, and access to heritage grains.
          </p>
        </div>

        <div className="relative z-10 border-t border-white/10 pt-6 text-[9px] font-mono tracking-widest text-[#EFECE6]/40 uppercase">
          © 2026 Maison Sattu. All Rights Reserved.
        </div>
      </div>

      {/* RIGHT COLUMN: INTERACTIVE REGISTRY FILL WORKSPACE */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 py-20 relative bg-[#F9F8F6]">
        {/* Geometric canvas matrix structure */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:32px_32px]" />
        
        <div className="w-full max-w-[420px] relative z-10">
          
          {/* Section Header Text Stack */}
          <div className="mb-10">
            <div className="lg:hidden inline-flex items-center justify-center w-12 h-12 bg-[#1C3B24] text-white rounded-xl mb-6 shadow-xl shadow-[#1C3B24]/10">
              <Leaf size={20} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#1C2B21] tracking-tight mb-3">
              Initialize Profile
            </h2>
            <p className="text-xs text-[#707A72] font-light tracking-wide">
              Enter your authentication parameters to authorize your unique registry space.
            </p>
          </div>

          {/* Premium Error Diagnostics Prompt */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mb-8 p-4 bg-red-50/60 border border-red-100 rounded-xl flex items-start gap-3 text-red-700 text-xs font-medium leading-relaxed"
              >
                <AlertCircle size={15} className="shrink-0 text-red-500 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Node Ecosystem */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Display Name Input Block */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-widest text-[#9A8F80] ml-0.5">
                Full Legal Identity
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9A8F80]/60 group-focus-within:text-[#1C3B24] transition-colors duration-300">
                  <User size={16} strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g., Alexander Mercer"
                  className="w-full pl-13 pr-5 py-4 rounded-xl bg-white border border-[#EAE6DF] focus:border-[#1C3B24] outline-none transition-all duration-300 font-serif text-[14px] text-[#1C2B21] placeholder:text-[#9A8F80]/40 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
                  required
                />
              </div>
            </div>

            {/* Email Input Block */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-widest text-[#9A8F80] ml-0.5">
                Communication Endpoint
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9A8F80]/60 group-focus-within:text-[#1C3B24] transition-colors duration-300">
                  <Mail size={16} strokeWidth={1.5} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-13 pr-5 py-4 rounded-xl bg-white border border-[#EAE6DF] focus:border-[#1C3B24] outline-none transition-all duration-300 font-serif text-[14px] text-[#1C2B21] placeholder:text-[#9A8F80]/40 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
                  required
                />
              </div>
            </div>

            {/* Password Input Block */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-widest text-[#9A8F80] ml-0.5">
                Secure Signature Key
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9A8F80]/60 group-focus-within:text-[#1C3B24] transition-colors duration-300">
                  <Lock size={16} strokeWidth={1.5} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create custom cipher sequence"
                  className="w-full pl-13 pr-12 py-4 rounded-xl bg-white border border-[#EAE6DF] focus:border-[#1C3B24] outline-none transition-all duration-300 font-serif text-[14px] text-[#1C2B21] placeholder:text-[#9A8F80]/40 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
                  required
                />
                {/* Visibility Micro-Node Accent */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A8F80]/60 hover:text-[#1C2B21] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            {/* Legal / Policy Disclosure Panel */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#EAE6DF] shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
              <ShieldCheck size={14} className="text-[#1C3B24] shrink-0 mt-0.5" />
              <p className="text-[10px] text-[#707A72] font-light leading-relaxed">
                By processing initialization, you fully authorize our <span className="text-[#1C2B21] font-medium underline underline-offset-2 cursor-pointer hover:text-[#D9A036]">Terms of Covenant</span> and dynamic <span className="text-[#1C2B21] font-medium underline underline-offset-2 cursor-pointer hover:text-[#D9A036]">Privacy Protocol</span>.
              </p>
            </div>

            {/* Submit Committal Interaction Node */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full h-[54px] rounded-xl bg-[#1C3B24] text-[#EFECE6] font-bold text-[10px] uppercase tracking-[0.25em] shadow-xl shadow-[#1C3B24]/10 hover:bg-[#1C2B21] transition-all duration-300 flex items-center justify-center gap-3 transform active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? (
                <div className="relative w-5 h-5">
                  <div className="absolute inset-0 border-2 border-white/20 rounded-full" />
                  <div className="absolute inset-0 border-2 border-t-white rounded-full animate-spin" />
                </div>
              ) : (
                <>
                  <span>Authorize Profile Creation</span>
                  <ArrowRight size={13} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          {/* Fallback Entry Pointer */}
          <div className="mt-10 text-center">
            <p className="text-xs text-[#707A72] font-light tracking-wide">
              Already hold house registration?{" "}
              <Link to="/login" className="text-[#1C3B24] font-bold hover:text-[#D9A036] ml-1 transition-colors duration-300">
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