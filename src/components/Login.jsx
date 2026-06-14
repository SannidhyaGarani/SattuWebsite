import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./useAuth";
import { Mail, Lock, ArrowRight, Leaf, AlertCircle, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const premiumEase = [0.25, 1, 0.5, 1];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("The credentials provided do not match our archive records.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]  mt-35 text-[#1C2B21] flex relative overflow-hidden selection:bg-[#1C3B24] selection:text-white">
      
      {/* LEFT COLUMN: VISUAL ART DIRECTION EMBED (HIDDEN ON MOBILE) */}
      <div className="hidden lg:flex w-[45%] bg-[#1C3B24] relative flex-col justify-between p-16 overflow-hidden">
        {/* Subtle geometric dot matrix layering */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Abstract luxury ambient texture background blur */}
        <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-[#D9A036]/10 rounded-full blur-[140px]" />
        
        <Link to="/" className="relative z-10 flex items-center gap-2 text-[#EFECE6] text-[11px] font-bold uppercase tracking-[0.3em] opacity-80 hover:opacity-100 transition-opacity">
          <Leaf size={16} className="text-[#D9A036]" />
          <span>Sattu Maison d'Origine</span>
        </Link>

        <div className="relative z-10 space-y-6 max-w-sm">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D9A036]">Verified Member Access</span>
          <h1 className="text-4xl xl:text-5xl font-serif font-light text-[#EFECE6] leading-[1.15] tracking-tight">
            Cultivating wellness through traditional raw formulation.
          </h1>
          <p className="text-xs text-[#EFECE6]/60 font-light leading-relaxed tracking-wide">
            Access your curated dietary parameters, personalized collection archives, and premium subscription reserves.
          </p>
        </div>

        <div className="relative z-10 border-t border-white/10 pt-6 text-[9px] font-mono tracking-widest text-[#EFECE6]/40 uppercase">
          © 2026 Maison Sattu. All Rights Reserved.
        </div>
      </div>

      {/* RIGHT COLUMN: ACCESS FORM WORKSPACE */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 py-20 relative bg-[#F9F8F6]">
        {/* Subtle organic mesh background grid lines */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:32px_32px]" />
        
        <div className="w-full max-w-[420px] relative z-10">
          
          {/* Header Workspace Stack */}
          <div className="mb-10 lg:mb-12">
            <div className="lg:hidden inline-flex items-center justify-center w-12 h-12 bg-[#1C3B24] text-white rounded-xl mb-6 shadow-xl shadow-[#1C3B24]/10">
              <Leaf size={20} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#1C2B21] tracking-tight mb-3">
              Account Authentication
            </h2>
            <p className="text-xs text-[#707A72] font-light tracking-wide">
              Please declare your secure cryptographic records below.
            </p>
          </div>

          {/* Luxury Error Diagnostics Prompt */}
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

          {/* Interactive Form Field Canvas */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field Block */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-0.5">
                <label className="text-[9px] font-bold uppercase tracking-widest text-[#9A8F80]">
                  Registry Email Address
                </label>
              </div>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9A8F80]/60 group-focus-within:text-[#1C3B24] transition-colors duration-300">
                  <Mail size={16} strokeWidth={1.5} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-13 pr-5 py-4.5 rounded-xl bg-white border border-[#EAE6DF] focus:border-[#1C3B24] outline-none transition-all duration-300 font-serif text-[14px] text-[#1C2B21] placeholder:text-[#9A8F80]/40 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
                  required
                />
              </div>
            </div>

            {/* Password Field Block */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-0.5">
                <label className="text-[9px] font-bold uppercase tracking-widest text-[#9A8F80]">
                  Private Vault Key
                </label>
                <button 
                  type="button" 
                  className="text-[9px] font-bold uppercase tracking-widest text-[#9A8F80] hover:text-[#1C3B24] transition-colors"
                >
                  Recovery Protocol?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9A8F80]/60 group-focus-within:text-[#1C3B24] transition-colors duration-300">
                  <Lock size={16} strokeWidth={1.5} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-13 pr-12 py-4.5 rounded-xl bg-white border border-[#EAE6DF] focus:border-[#1C3B24] outline-none transition-all duration-300 font-serif text-[14px] text-[#1C2B21] placeholder:text-[#9A8F80]/40 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
                  required
                />
                {/* Premium Visibility Toggle Node */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A8F80]/60 hover:text-[#1C2B21] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            {/* Main Committal Action Interface */}
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
                  <span>Authenticate Registry</span>
                  <ArrowRight size={13} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          {/* Membership Creation Access Anchor */}
          <div className="mt-10 text-center">
            <p className="text-xs text-[#707A72] font-light tracking-wide">
              New to our House Registry?{" "}
              <Link to="/signup" className="text-[#1C3B24] font-bold hover:text-[#D9A036] ml-1 transition-colors duration-300">
                Create Credentials
              </Link>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;