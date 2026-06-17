import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../components/Firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../components/useAuth';
import {
  Star,
  Shield,
  Truck,
  Heart,
  ShoppingBag,
  Share2,
  Info,
  Leaf,
  Sparkles,
  ChevronRight,
  Maximize2,
  X,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from "../components/StoreProvider";
import PageHeader from "../components/Sattu/PageHeader";


const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const { addToCart, addToWishlist, removeFromWishlist, wishlist, cart } = useStore();
  const isInCart = cart.some(item => item.id === id);
  const isWishlisted = wishlist.some(item => item.id === id);

  const premiumEase = [0.25, 1, 0.5, 1];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const triggerToast = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  const addToCollection = async (type) => {
    if (!product) return;

    if (type === 'cart') {
      if (isInCart) return;
      for (let i = 0; i < quantity; i++) {
        await addToCart(product);
      }
      triggerToast(`${quantity} ${quantity > 1 ? 'items' : 'item'} added to your collection!`);
    } else {
      if (isWishlisted) {
        await removeFromWishlist(product.id);
        triggerToast("Removed from your wishlist!");
      } else {
        await addToWishlist(product);
        triggerToast("Added to your wishlist!");
      }
    }
  };

  // --- PREMIUM LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF4E3] flex flex-col items-center justify-center gap-6 relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6-grain.png')]" />
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border border-[#E3DBC5] rounded-full" />
          <div className="absolute inset-0 border border-t-[#976E2A] rounded-full animate-spin" />
        </div>
        <p className="text-[10px] font-poppins font-bold uppercase tracking-[0.4em] text-[#976E2A]">Curating Formulation...</p>
      </div>
    );
  }

  // --- PREMIUM ERROR/EMPTY STATE ---
  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF4E3] flex flex-col items-center justify-center text-center p-6 relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6-grain.png')]" />
        <div className="w-16 h-16 rounded-full bg-[#FFFDF6] border border-[#E3DBC5] flex items-center justify-center text-[#976E2A] mb-6 shadow-[0_10px_30px_rgba(32,59,35,0.05)]">
          <Info size={20} strokeWidth={1.2} />
        </div>
        <h3 className="text-2xl font-poppins font-bold text-[#6b4f3a] mb-3">Archive Unresolved</h3>
        <p className="text-xs text-[#6b4f3a]/70 font-poppins max-w-sm mx-auto mb-10 leading-relaxed tracking-wide">
          The unique parameter tracking index could not identify a correlated artisanal blend within our registry.
        </p>
        <Link to="/shop" className="inline-flex items-center gap-3 px-8 py-4 bg-[#6b4f3a] text-[#FFFDF6] font-bold text-[10px] uppercase tracking-[0.25em] rounded-xl hover:bg-[#976E2A] transition-all duration-300 shadow-[0_10px_20px_rgba(32,59,35,0.15)]">
          <span>Return To Registry</span>
          <ChevronRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative pt-12 pb-32 text-[#6b4f3a] selection:bg-[#976E2A] selection:text-[#FFFDF6] bg-cover bg-center"

      style={{ backgroundImage: "url('/img/b3.png')" }}
    >
      {/* Premium Multi-layered Tonal Overlays */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6-grain.png')]" />


      {/* Premium Toast System */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-12 left-1/2 z-50 bg-[#FFFDF6] border border-[#976E2A]/30 text-[#6b4f3a] px-6 py-4 rounded-xl shadow-[0_20px_40px_rgba(151,110,42,0.12)] flex items-center gap-4 max-w-md w-[90%]"
          >
            <div className="w-8 h-8 rounded-full bg-[#FAF4E3] border border-[#E3DBC5] flex items-center justify-center shrink-0">
              <Sparkles size={14} className="text-[#976E2A]" />
            </div>
            <p className="text-[11px] font-poppins font-bold uppercase tracking-wider flex-1 mt-0.5">{feedbackMessage}</p>
            <button onClick={() => setFeedbackMessage(null)} className="text-[#6b4f3a]/40 hover:text-[#976E2A] transition-colors">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        <PageHeader
          breadcrumbItems={[
            { label: "Home", path: "/" },
            { label: "Boutique", path: "/shop" },
            { label: product.name }
          ]}
        />


        {/* ================= MAIN METAFRAME DISPATCH GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">

          {/* LEFT COLUMN: ARCHITECTURAL GALLERY CAPTURE */}
          <div className="lg:col-span-6 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: premiumEase }}
              className="relative w-full aspect-[4/5] bg-[#FFFDF6] border border-[#E3DBC5]/80 rounded-[40px] p-1.5 shadow-[0_20px_40px_rgba(32,59,35,0.06),0_1px_3px_rgba(32,59,35,0.02)] group"
            >
              <div className="w-full h-full overflow-hidden rounded-[34px] relative bg-[#FAF4E3] flex items-center justify-center p-12">
                {/* Subtle grading overlay tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#6b4f3a]/5 via-transparent to-transparent opacity-60 pointer-events-none z-10" />

                <img
                  src={product.image || product.images?.[0] || "https://images.unsplash.com/photo-1594488651083-023b857dc3f8?q=80&w=600&auto=format&fit=crop"}
                  alt={product.name}
                  className="w-full h-full object-contain filter drop-shadow-2xl transform transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 z-0"
                />

                {/* Flavor Profile Callout Badge */}
                <div className="absolute top-6 left-6 z-20">
                  <span className="px-5 py-2.5 rounded-full bg-[#FFFDF6]/90 backdrop-blur-md text-[9px] font-poppins font-bold uppercase tracking-[0.25em] text-[#6b4f3a] border border-[#E3DBC5] shadow-[0_4px_12px_rgba(32,59,35,0.08)]">
                    {product.flavor || 'Classic Roasted'}
                  </span>
                </div>

                {/* Structural Stock Status Indicator */}
                {product.stock_status && (
                  <div className="absolute bottom-6 right-6 z-20">
                    <span className={`px-4 py-2.5 rounded-full text-[9px] font-poppins font-bold uppercase tracking-[0.25em] border shadow-[0_4px_12px_rgba(32,59,35,0.06)] backdrop-blur-sm ${product.stock_status === 'In Stock'
                        ? 'bg-[#FFFDF6]/90 text-[#6b4f3a] border-[#6b4f3a]/20'
                        : product.stock_status === 'Low Stock'
                          ? 'bg-[#FFFDF6]/90 text-[#976E2A] border-[#976E2A]/30'
                          : 'bg-red-50/90 text-red-700 border-red-200'
                      }`}>
                      {product.stock_status}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Fine Art Trust Metrics Canvas Grid */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Leaf, text: '100% Bio-Organic' },
                { icon: Shield, text: 'Zero Modifiers' },
                { icon: Truck, text: 'Priority Dispatch' }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex flex-col items-center text-center p-5 rounded-[24px] bg-[#FFFDF6] border border-[#E3DBC5]/80 space-y-3 shadow-[0_4px_12px_rgba(32,59,35,0.03)] transition-all duration-500 hover:border-[#976E2A]/40 hover:shadow-[0_12px_24px_rgba(151,110,42,0.08)] hover:-translate-y-1">
                    <div className="w-10 h-10 rounded-full bg-[#FAF4E3] border border-[#E3DBC5] flex items-center justify-center text-[#976E2A]">
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <p className="text-[9px] font-poppins font-bold uppercase tracking-[0.2em] text-[#6b4f3a] leading-snug">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: REFINED EDITORIAL DATA INFUSION */}
          <div className="lg:col-span-6 space-y-12">

            {/* Header Identity Deck */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(product.rating || 4.8) ? "#976E2A" : "none"}
                      className={i < Math.floor(product.rating || 4.8) ? "text-[#976E2A]" : "text-[#E3DBC5]"}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-poppins font-bold text-[#976E2A] uppercase tracking-[0.25em]">
                  {product.rating || 4.8} // Verified Score
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-bold text-[#6b4f3a] tracking-tight leading-[1.05]">
                {product.name}
              </h1>

              {/* Cost Calibration Node Matrix */}
              <div className="pt-2 flex items-center gap-6">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-poppins font-bold text-[#6b4f3a]">₹{product.price}</span>
                  {product.original_price && product.original_price > product.price && (
                    <span className="text-lg text-[#976E2A]/60 line-through font-poppins italic tracking-wide">₹{product.original_price}</span>
                  )}
                </div>
                {product.net_quantity && (
                  <span className="px-4 py-1.5 rounded-full bg-[#FFFDF6] text-[10px] font-poppins font-bold uppercase tracking-[0.2em] text-[#6b4f3a] border border-[#E3DBC5] shadow-sm">
                    {product.net_quantity}
                  </span>
                )}
              </div>
            </div>

            {/* Ingestion & Allocation Node Controls */}
            <div className="pt-10 border-t border-[#E3DBC5] space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-end">

                {/* Micro-Counter Input Wrapper */}
                <div className="sm:col-span-4 space-y-3">
                  <p className="text-[9px] font-poppins font-bold uppercase tracking-[0.25em] text-[#976E2A] ml-1">Allocation Units</p>
                  <div className="flex items-center justify-between bg-[#FFFDF6] rounded-[16px] p-1.5 border border-[#E3DBC5]/80 shadow-[0_4px_12px_rgba(32,59,35,0.03)]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center text-lg font-light text-[#6b4f3a] hover:bg-[#FAF4E3] rounded-xl transition-colors"
                    >
                      −
                    </button>
                    <span className="font-poppins font-bold text-[#6b4f3a] text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center text-lg font-light text-[#6b4f3a] hover:bg-[#FAF4E3] rounded-xl transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Primary Cart Committal Control */}
                <div className="sm:col-span-8 flex flex-col sm:flex-row gap-5 pt-8">
                  <button
                    onClick={() => addToCollection('cart')}
                    disabled={isInCart}
                    className={`flex-1 h-[72px] rounded-2xl font-poppins font-bold text-[11px] uppercase tracking-[0.4em] transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 group ${isInCart
                        ? "bg-[#C45525] text-white cursor-default opacity-90"
                        : "bg-[#6b4f3a] text-[#FFFDF6] hover:bg-[#C45525] shadow-[#6b4f3a]/20"
                      }`}
                  >
                    {isInCart ? "Already in Bag" : "Commit to Cart"}
                    <ShoppingBag size={18} className="group-hover:rotate-12 transition-transform" />
                  </button>

                  <button
                    onClick={() => addToCollection('wishlist')}
                    className={`w-[72px] h-[72px] rounded-2xl border-[1.5px] flex items-center justify-center transition-all duration-500 group ${isWishlisted
                        ? "bg-[#C45525] border-[#C45525] text-[#FFFDF6]"
                        : "bg-white border-[#E3DBC5] text-[#6b4f3a] hover:border-[#6b4f3a]"
                      }`}
                  >
                    <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} className="group-hover:scale-125 transition-transform" />
                  </button>
                </div>

              </div>
            </div>

            {/* Architectural Data Tabs */}
            <div className="pt-8 space-y-8">
              <div className="flex gap-8 border-b border-[#E3DBC5] pb-4 overflow-x-auto no-scrollbar">
                {['description', 'ingredients', 'nutrition', 'preparation'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[10px] font-poppins font-bold uppercase tracking-[0.25em] transition-all duration-300 relative pb-2 whitespace-nowrap ${activeTab === tab ? 'text-[#6b4f3a]' : 'text-[#6b4f3a]/40 hover:text-[#976E2A]'
                      }`}
                  >
                    <span>{tab}</span>
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTabLine"
                        className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-[#976E2A]"
                        transition={{ duration: 0.4, ease: premiumEase }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Dynamic Information Display Deck */}
              <div className="min-h-[160px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: premiumEase }}
                    className="text-sm leading-loose text-[#6b4f3a]/80 font-poppins"
                  >
                    {activeTab === 'description' && (
                      <div className="space-y-4">
                        <p className="text-base text-[#6b4f3a] leading-relaxed">
                          {product.description || 'Experience the authentic structural purity of premium sattu, hand-selected and native stone-ground to perfection to maximize raw biological availability.'}
                        </p>
                      </div>
                    )}

                    {activeTab === 'ingredients' && (
                      <div className="bg-[#FFFDF6] p-8 rounded-[24px] border border-[#E3DBC5]/80 shadow-[0_4px_12px_rgba(32,59,35,0.03)]">
                        <p className="font-poppins italic text-[#6b4f3a] text-base leading-relaxed">
                          {product.ingredients || 'Native Roasted Gram (Chana Sattu), Hand-milled Barley, Mineralized Salt Crystals.'}
                        </p>
                      </div>
                    )}

                    {activeTab === 'nutrition' && (
                      <div className="bg-[#FFFDF6] p-8 rounded-[24px] border border-[#E3DBC5]/80 shadow-[0_4px_12px_rgba(32,59,35,0.03)]">
                        <div className="font-poppins font-medium text-xs tracking-widest uppercase text-[#6b4f3a] space-y-3 whitespace-pre-line leading-relaxed">
                          {product.nutritional_info || 'Per 100g serving concentration:\n\n▪ Macro Protein: 20g\n▪ Organic Fiber: 8g\n▪ Complex Carbohydrates: 55g\n▪ Native Lipids: 3g'}
                        </div>
                      </div>
                    )}

                    {activeTab === 'preparation' && (
                      <div className="space-y-6">
                        <div className="bg-[#FFFDF6] p-8 rounded-[24px] border border-[#E3DBC5]/80 shadow-[0_4px_12px_rgba(32,59,35,0.03)]">
                          <p className="whitespace-pre-line font-poppins italic text-[#6b4f3a] text-base leading-relaxed">
                            {product.how_to_prepare || '1. Introduce 2 calibrated tablespoons of sattu to 1 glass of pristine cold water.\n\n2. Infuse natural jaggery or native sugar variants to desired sweet taste.\n\n3. Agitate dynamic suspension fluid thoroughly and serve at chilled equilibrium.'}
                          </p>
                        </div>

                        {/* Elite Informational Notification Node Accent */}
                        <div className="p-5 rounded-[20px] bg-[#FFFDF6] border border-[#E3DBC5] shadow-[0_8px_24px_rgba(151,110,42,0.06)] flex gap-5 items-start">
                          <div className="w-10 h-10 rounded-full bg-[#FAF4E3] border border-[#976E2A]/20 text-[#976E2A] flex items-center justify-center flex-shrink-0">
                            <Maximize2 size={16} strokeWidth={1.5} />
                          </div>
                          <div className="space-y-1.5 mt-0.5">
                            <p className="text-[10px] font-poppins font-bold uppercase tracking-[0.25em] text-[#976E2A]">Apothecary Protocol</p>
                            <p className="text-xs text-[#6b4f3a] font-poppins italic leading-relaxed">Incorporate a single compression swipe of organic lime juice and black salt for premium physiological activation.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
