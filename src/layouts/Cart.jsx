import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2, ShieldCheck, Truck, RotateCcw, ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/Sattu/PageHeader";
import { useStore } from "../components/StoreProvider";
import { useAuth } from "../components/useAuth";

const Cart = () => {
  const { cart, removeFromCart, loading } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const premiumEase = [0.25, 1, 0.5, 1];

  const handleCheckout = () => {
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  // --- PREMIUM COMPACT LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF4E3] flex flex-col items-center justify-center gap-5 relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6-grain.png')]" />
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border border-[#E3DBC5] rounded-full" />
          <div className="absolute inset-0 border border-t-[#976E2A] rounded-full animate-spin" />
        </div>
        <p className="text-[9px] font-poppins font-bold uppercase tracking-[0.35em] text-[#976E2A]">Recalling Archive Selection...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative bg-cover bg-center text-[#6b4f3a] selection:bg-[#976E2A] selection:text-[#FFFDF6]"
      style={{ backgroundImage: "url('/img/b3.png')" }}
    >
      {/* Premium Multi-layered Tonal Overlays */}
      <div className="absolute inset-0 bg-[#FAF4E3]/85 pointer-events-none mix-blend-color-burn" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6-grain.png')]" />

      <PageHeader
        title="Your Selection"
        subtitle="Shopping Archive"
        breadcrumbItems={[
          { label: "Home", path: "/" },
          { label: "Collection", path: "/shop" },
          { label: "Cart" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* MAIN CART ARCHIVE AREA */}
          <div className="flex-1 w-full">
            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#FFFDF6] rounded-[32px] border border-[#E3DBC5] p-12 text-center shadow-[0_15px_35px_rgba(32,59,35,0.04)] max-w-2xl mx-auto"
              >
                <div className="w-14 h-14 rounded-full bg-[#FAF4E3] border border-[#E3DBC5] flex items-center justify-center text-[#976E2A] mx-auto mb-5">
                  <ShoppingBag size={20} strokeWidth={1.2} />
                </div>
                <h3 className="text-xl font-poppins font-bold text-[#6b4f3a] mb-2">
                  Archive Unoccupied
                </h3>
                <p className="text-xs text-[#6b4f3a]/70 font-poppins italic max-w-xs mx-auto mb-8 leading-relaxed">
                  Your premium formulation vault is currently empty. Begin adding items from our heritage registry.
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#6b4f3a] text-[#FFFDF6] font-poppins font-bold text-[10px] uppercase tracking-[0.25em] rounded-xl hover:bg-[#976E2A] transition-all duration-300 shadow-md"
                >
                  Return to Boutique
                  <ArrowRight size={12} />
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-[10px] font-poppins font-bold uppercase tracking-[0.3em] text-[#976E2A]">
                    {cart.length} Artisanal Blends Registered
                  </h2>
                </div>

                {/* COMPACT ITEM ROW STACK */}
                <div className="space-y-4">
                  {cart.map((item, idx) => (
                    <motion.div
                      key={`${item.id}-${idx}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06, duration: 0.6, ease: premiumEase }}
                      className="group relative bg-[#FFFDF6] rounded-[24px] p-3 flex flex-col sm:flex-row items-center gap-6 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(32,59,35,0.05)] border border-[#E3DBC5]/70 hover:border-[#976E2A]/30 hover:-translate-y-0.5"
                    >
                      {/* Architectural Decreased-Stroke Frame Asset (p-1.5) & Deep Ambient Shadow */}
                      <div className="w-24 h-28 rounded-[18px] bg-[#FFFDF6] border border-[#E3DBC5]/60 p-1.5 flex-shrink-0 shadow-[0_4px_12px_rgba(32,59,35,0.03)] group-hover:shadow-[0_12px_24px_rgba(151,110,42,0.1)] transition-all duration-500">
                        <div className="w-full h-full overflow-hidden rounded-[14px] bg-[#FAF4E3] flex items-center justify-center p-2 relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                          />
                        </div>
                      </div>

                      {/* Info Typography */}
                      <div className="flex-1 text-center sm:text-left space-y-1 py-1">
                        <span className="text-[9px] font-poppins font-bold uppercase tracking-[0.2em] text-[#976E2A]">
                          {item.flavor || "Classic Formulation"}
                        </span>
                        <h3 className="text-lg font-poppins font-bold text-[#6b4f3a] tracking-tight group-hover:text-[#976E2A] transition-colors duration-300">
                          {item.name}
                        </h3>
                        <p className="text-xl font-poppins font-bold text-[#6b4f3a] pt-1">
                          ₹{Number(item.price).toFixed(0)}
                        </p>
                      </div>

                      {/* Redesigned Compact Removal Action */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="sm:mr-2 p-3.5 rounded-xl bg-[#FAF4E3] text-[#6b4f3a]/40 border border-[#E3DBC5]/40 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all duration-300 group/trash shadow-sm"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} strokeWidth={1.8} className="group-hover/trash:scale-105 transition-transform" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SUMMARY SIDEBAR */}
          {cart.length > 0 && (
            <aside className="w-full lg:w-[380px] shrink-0 sticky top-32">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: premiumEase }}
                className="bg-[#FFFDF6] rounded-[32px] border border-[#E3DBC5] shadow-[0_20px_50px_rgba(32,59,35,0.05)] p-7 relative overflow-hidden"
              >
                {/* Floating Fine-Art Accent */}
                <div className="absolute top-0 right-0 p-5 opacity-20 pointer-events-none">
                  <Sparkles size={16} className="text-[#976E2A]" />
                </div>

                <h2 className="text-lg font-poppins font-bold text-[#6b4f3a] mb-6 border-b border-[#E3DBC5]/60 pb-4">
                  Archive Summary
                </h2>

                {/* Computational Metadata Matrix */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-baseline font-poppins font-bold text-[9px] uppercase tracking-wider text-[#6b4f3a]/60">
                    <span>Provisional Subtotal</span>
                    <span className="text-[#6b4f3a] font-poppins font-bold text-sm">₹{total.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-baseline font-poppins font-bold text-[9px] uppercase tracking-wider text-[#6b4f3a]/60">
                    <span>Artisanal Logistics</span>
                    <span className="text-[#976E2A] font-poppins italic text-xs tracking-normal normal-case">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-baseline font-poppins font-bold text-[9px] uppercase tracking-wider text-[#6b4f3a]/60">
                    <span>Fiscal Asset Allocation (GST)</span>
                    <span className="text-[#6b4f3a] font-poppins font-bold text-sm">₹0.00</span>
                  </div>

                  {/* Total Configuration Divider */}
                  <div className="pt-5 border-t border-dashed border-[#E3DBC5] flex justify-between items-end">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-poppins font-bold text-[#976E2A] uppercase tracking-[0.3em] block">
                        Total Value
                      </span>
                      <span className="text-[9px] text-[#6b4f3a]/40 font-poppins italic block">Incl. gallery wrap packaging</span>
                    </div>
                    <span className="text-3xl font-poppins font-bold text-[#6b4f3a] tracking-tight leading-none">
                      ₹{total.toFixed(0)}
                    </span>
                  </div>
                </div>

                {/* Primary Secure Action Node */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-4.5 bg-[#6b4f3a] text-[#FFFDF6] font-poppins font-bold text-[10px] uppercase tracking-[0.25em] rounded-xl hover:bg-[#976E2A] hover:shadow-[0_12px_24px_rgba(151,110,42,0.2)] transition-all duration-500 shadow-[0_10px_20px_rgba(32,59,35,0.12)] mb-8 flex items-center justify-center gap-3 group/checkout"
                >
                  <span>Begin Secure Checkout</span>
                  <ChevronRight size={14} className="group-hover/checkout:translate-x-0.5 transition-transform" />
                </button>

                {/* Compact Trust Metrics Column */}
                <div className="grid grid-cols-1 gap-3.5 pt-6 border-t border-[#E3DBC5]/60">
                  {[
                    { icon: ShieldCheck, title: "Vault Security", sub: "Pillar Layer Encryption" },
                    { icon: Truck, title: "Priority Delivery", sub: "Climate Controlled Fleet" },
                    { icon: RotateCcw, title: "Registry Guarantee", sub: "30-Day Escrow Window" },
                  ].map((badge, i) => {
                    const Icon = badge.icon;
                    return (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-xl bg-[#FAF4E3] border border-[#E3DBC5]/80 flex items-center justify-center text-[#976E2A] shrink-0 shadow-sm">
                          <Icon size={15} strokeWidth={1.5} />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[9px] font-poppins font-bold text-[#6b4f3a] uppercase tracking-wider">
                            {badge.title}
                          </p>
                          <p className="text-[10px] font-poppins italic text-[#6b4f3a]/50 leading-none">
                            {badge.sub}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
