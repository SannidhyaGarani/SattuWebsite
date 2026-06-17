import React, { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { Mail, Lock, ArrowRight, Leaf, AlertCircle, Eye, EyeOff, Sparkles, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const redirectPath = searchParams.get("redirect") || "/";
  const premiumEase = [0.25, 1, 0.5, 1];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(redirectPath);
    } catch (err) {
      setError("The credentials provided do not match our archive records.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  mt-28 bg-[#FAF4E3] text-[#203B23] flex relative overflow-hidden selection:bg-[#976E2A] selection:text-[#FFFDF6]">
      
      {/* Background Textures */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6-grain.png')] mix-blend-multiply" />
      
      {/* LEFT COLUMN: VISUAL ART DIRECTION */}
      <div className="hidden lg:flex w-[45%] bg-[#203B23] relative flex-col justify-between p-16 overflow-hidden">
        {/* Subtle geometric dot matrix layering */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#FAF4E3_1.5px,transparent_1.5px)] [background-size:32px_32px]" />
        
        {/* Abstract luxury ambient texture background blur */}
        <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-[#976E2A]/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#FAF4E3]/10 rounded-full blur-[100px]" />
        
        <Link to="/" className="relative z-10 flex items-center gap-3 text-[#FAF4E3] text-[11px] font-poppins font-bold uppercase tracking-[0.4em] hover:text-[#976E2A] transition-colors group">
          <div className="w-8 h-8 rounded-full bg-[#FAF4E3]/10 flex items-center justify-center border border-[#FAF4E3]/20 group-hover:border-[#976E2A]/40 transition-colors">
            <Leaf size={14} className="text-[#976E2A]" />
          </div>
          <span>Indian Food Way</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: premiumEase }}
          className="relative z-10 space-y-8 max-w-sm"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FAF4E3]/10 border border-[#FAF4E3]/20 text-[9px] font-poppins font-bold uppercase tracking-[0.4em] text-[#976E2A]">
            Verified Member Access
          </span>
          <h1 className="text-5xl xl:text-6xl font-poppins font-bold text-[#FAF4E3] leading-[1.1] tracking-tight">
            Cultivating wellness through heritage.
          </h1>
          <p className="text-sm text-[#FAF4E3]/60 font-poppins leading-relaxed tracking-wide font-medium">
            Access your curated dietary parameters, personalized collection archives, and premium subscription reserves.
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

      {/* RIGHT COLUMN: ACCESS FORM WORKSPACE */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 py-20 relative">
        <div className="w-full max-w-[440px] relative z-10">
          
          {/* Back Action */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] font-poppins font-bold uppercase tracking-[0.25em] text-[#976E2A] mb-12 hover:text-[#203B23] transition-colors group"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Archive</span>
          </button>

          {/* Header Workspace Stack */}
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-[#203B23] tracking-tight mb-4">
              Authentication
            </h2>
            <p className="text-sm text-[#203B23]/60 font-poppins font-medium tracking-wide">
              Please declare your secure cryptographic records below to access the boutique vault.
            </p>
          </div>

          {/* Luxury Error Diagnostics Prompt */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mb-10 p-5 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4 text-red-700 text-xs font-bold leading-relaxed shadow-sm"
              >
                <AlertCircle size={18} className="shrink-0 text-red-500 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Form Field Canvas */}
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Email Field Block */}
            <div className="space-y-3">
              <label className="text-[10px] font-poppins font-bold uppercase tracking-[0.3em] text-[#203B23]/40 ml-1">
                Registry Email Identifier
              </label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#203B23]/20 group-focus-within:text-[#976E2A] transition-colors duration-300">
                  <Mail size={18} strokeWidth={1.5} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. curator@heritage.com"
                  className="w-full pl-16 pr-6 py-5 rounded-2xl bg-[#FFFDF6] border border-[#E3DBC5] focus:border-[#203B23] outline-none transition-all duration-500 font-poppins font-bold text-[14px] text-[#203B23] placeholder:text-[#203B23]/20 shadow-[0_4px_20px_rgba(32,59,35,0.02)]"
                  required
                />
              </div>
            </div>

            {/* Password Field Block */}
            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-poppins font-bold uppercase tracking-[0.3em] text-[#203B23]/40">
                  Private Cryptic Key
                </label>
                <button 
                  type="button" 
                  className="text-[10px] font-poppins font-bold uppercase tracking-[0.3em] text-[#976E2A] hover:text-[#203B23] transition-colors"
                >
                  Key Recovery?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#203B23]/20 group-focus-within:text-[#976E2A] transition-colors duration-300">
                  <Lock size={18} strokeWidth={1.5} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-16 pr-14 py-5 rounded-2xl bg-[#FFFDF6] border border-[#E3DBC5] focus:border-[#203B23] outline-none transition-all duration-500 font-poppins font-bold text-[14px] text-[#203B23] placeholder:text-[#203B23]/20 shadow-[0_4px_20px_rgba(32,59,35,0.02)]"
                  required
                />
                {/* Premium Visibility Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#203B23]/20 hover:text-[#203B23] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            {/* Main Committal Action Interface */}
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
                  <span>Authenticate Archive Access</span>
                  <ArrowRight size={16} strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          {/* Membership Creation Access Anchor */}
          <div className="mt-12 text-center">
            <p className="text-sm text-[#203B23]/40 font-poppins font-medium tracking-wide">
              New to our House Registry?{" "}
              <Link to="/signup" className="text-[#203B23] font-bold hover:text-[#976E2A] ml-2 transition-colors duration-300 pb-0.5 border-b border-dashed border-[#203B23]/20 hover:border-[#976E2A]">
                Request Credentials
              </Link>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
