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
    <div className="min-h-screen bg-transparent text-[#6b4f3a] flex relative overflow-hidden selection:bg-[#976E2A] selection:text-[#FFFDF6] pt-16 md:pt-0">

      {/* Background Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6-grain.png')] mix-blend-multiply" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-16 min-h-screen relative z-10 py-20 lg:py-0">

        {/* LEFT COLUMN: BRAND NARRATIVE */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: premiumEase }}
          className="lg:w-1/2 space-y-12"
        >
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 text-[11px] font-poppins font-bold uppercase tracking-[0.4em] text-[#6b4f3a] hover:text-[#976E2A] transition-colors group">
              <div className="w-8 h-8 rounded-full bg-[#6b4f3a]/5 flex items-center justify-center border border-[#6b4f3a]/10">
                <Leaf size={14} className="text-[#976E2A]" />
              </div>
              <span>Indian Food Way</span>
            </Link>

            <h1 className="text-4xl md:text-5xl xl:text-5xl font-poppins font-bold text-[#6b4f3a] leading-[1.05] tracking-tight capitalize">
              Cultivating <br />
              wellness through <br />
              <span className="text-[#976E2A]">heritage.</span>
            </h1>

            <div className="w-20 h-px bg-[#976E2A]/30" />

            <p className="text-base md:text-lg text-[#6b4f3a]/70 font-poppins leading-relaxed max-w-md">
              Access your curated dietary parameters, personalized collection archives, and premium subscription reserves.
            </p>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: AUTHENTICATION CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: premiumEase, delay: 0.2 }}
          className="lg:w-[450px] w-full"
        >
          <div className="bg-[#FFFDF6]/90 backdrop-blur-xl border border-[#E3DBC5] rounded-[48px] my-30 p-8 md:p-12 shadow-[0_40px_100px_rgba(32,59,35,0.08)] relative overflow-hidden group">

            {/* Card Header Emblem */}
            <div className="flex flex-col items-center mb-10 text-center">
              <div className="w-16 h-16 rounded-full bg-[#FAF4E3] border border-[#E3DBC5] flex items-center justify-center mb-4 shadow-inner">
                <Leaf size={24} className="text-[#6b4f3a] fill-current rotate-45 opacity-80" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-1 bg-[#976E2A] rotate-45" />
                <span className="text-[10px] font-poppins font-bold uppercase tracking-[0.4em] text-[#976E2A]">
                  Welcome Back
                </span>
                <div className="w-1 h-1 bg-[#976E2A] rotate-45" />
              </div>
              <h2 className="text-3xl font-poppins font-bold text-[#6b4f3a] tracking-tight mb-2">
                Authentication
              </h2>
              <p className="text-[11px] text-[#6b4f3a]/50 font-poppins font-medium leading-relaxed max-w-[240px]">
                Please authenticate to access your exclusive boutique vault.
              </p>
            </div>

            {/* Error Message Diagnostics */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8 overflow-hidden"
                >
                  <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-700 text-[11px] font-bold leading-relaxed">
                    <AlertCircle size={14} className="shrink-0 text-red-500 mt-0.5" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Identifier Block */}
              <div className="space-y-2">
                <label className="text-[9px] font-poppins font-bold uppercase tracking-[0.3em] text-[#6b4f3a]/40 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#6b4f3a]/20">
                    <Mail size={16} strokeWidth={1.5} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. curator@heritage.com"
                    className="w-full pl-16 pr-6 py-4.5 rounded-2xl bg-[#FFFDF6] border border-[#E3DBC5] focus:border-[#976E2A]/50 outline-none transition-all duration-500 font-poppins font-bold text-[13px] text-[#6b4f3a] placeholder:text-[#6b4f3a]/20 shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* Private Key Block */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[9px] font-poppins font-bold uppercase tracking-[0.3em] text-[#6b4f3a]/40">
                    Password
                  </label>
                  <button type="button" className="text-[9px] font-poppins font-bold uppercase tracking-[0.2em] text-[#976E2A] hover:text-[#6b4f3a] transition-colors">
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#6b4f3a]/20">
                    <Lock size={16} strokeWidth={1.5} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-16 pr-14 py-4.5 rounded-2xl bg-[#FFFDF6] border border-[#E3DBC5] focus:border-[#976E2A]/50 outline-none transition-all duration-500 font-poppins font-bold text-[13px] text-[#6b4f3a] placeholder:text-[#6b4f3a]/20 shadow-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#6b4f3a]/20 hover:text-[#6b4f3a] transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
                  </button>
                </div>
              </div>

              {/* Main Committal Control */}
              <button
                type="submit"
                disabled={loading}
                className="group w-full h-[60px] rounded-2xl bg-white text-black border border-black font-poppins font-bold text-[11px] uppercase tracking-[0.3em] shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:bg-black hover:text-white transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center gap-4 disabled:opacity-50 mt-4 overflow-hidden relative"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <Leaf
                      size={14}
                      className="text-[#976E2A] fill-current rotate-45 group-hover:scale-110 group-hover:text-[#FAF4E3] transition-all duration-500"
                    />
                    <span className="tracking-[0.3em]">Authenticate Access</span>
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform duration-500"
                    />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 text-center space-y-4">
              <p className="text-[11px] text-[#6b4f3a]/40 font-poppins font-medium">
                New to our House Registry?{" "}
                <Link to="/signup" className="text-[#976E2A] font-bold hover:text-[#6b4f3a] ml-2 transition-colors border-b border-dashed border-[#976E2A]/30 pb-0.5">
                  Request Credentials
                </Link>
              </p>

              <div className="flex items-center justify-center gap-2 pt-2 opacity-20">
                <div className="w-1 h-1 bg-[#6b4f3a] rotate-45" />
                <div className="w-1 h-1 bg-[#6b4f3a] rotate-45 scale-125" />
                <div className="w-1 h-1 bg-[#6b4f3a] rotate-45" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Branding Detail */}
      <div className="absolute bottom-10 left-0 w-full px-6 md:px-12 pointer-events-none flex justify-between items-center z-10 opacity-40">
        <div className="text-[9px] font-poppins font-bold uppercase tracking-[0.3em]">
          © 2026 INDIAN FOOD WAY
        </div>
        <div className="w-12 h-px bg-[#6b4f3a]/20" />
      </div>
    </div>
  );
};

export default Login;
