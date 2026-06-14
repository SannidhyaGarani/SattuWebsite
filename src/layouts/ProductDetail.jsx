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

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const premiumEase = [0.25, 1, 0.5, 1];

  useEffect(() => {
    const load = async () => {
      const ref = doc(db, "products", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProduct({ id: snap.id, ...snap.data() });
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const triggerToast = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  const addToCollection = async (collectionName) => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!product) return;

    try {
      const itemRef = doc(db, "users", user.uid, collectionName, product.id);
      await setDoc(itemRef, {
        name: product.name,
        price: product.price,
        image: product.image || product.images?.[0] || "",
        addedAt: new Date().toISOString(),
        quantity: quantity,
        flavor: product.flavor || ''
      });
      triggerToast(`Successfully added to ${collectionName}!`);
    } catch (error) {
      console.error(`Error adding to ${collectionName}:`, error);
      triggerToast("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex flex-col items-center justify-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-2 border-[#1C3B24]/10 rounded-full" />
          <div className="absolute inset-0 border-2 border-t-[#D9A036] rounded-full animate-spin" />
        </div>
        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#9A8F80]">Compiling Formulation Profiles...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex flex-col items-center justify-center text-center p-6">
        <div className="w-12 h-12 rounded-full bg-white border border-[#EAE6DF] flex items-center justify-center text-[#9A8F80] mb-6">
          <Info size={16} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-serif font-bold text-[#1C2B21] mb-2">Formulation Unresolved</h3>
        <p className="text-xs text-[#707A72] font-light max-w-xs mx-auto mb-8 leading-relaxed">
          The unique parameter tracking index could not identify a correlated organic blend within our records.
        </p>
        <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-[#1C3B24] text-[#EFECE6] font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#1C2B21] transition-all shadow-xl shadow-[#1C3B24]/10">
          <span>Return To Registry</span>
          <ChevronRight size={12} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6] pt-32 lg:pt-44 pb-32 text-[#1C2B21] relative selection:bg-[#1C3B24] selection:text-white">
      {/* Light Luxury Geometric Dot Mesh Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:32px_32px]"></div>

      {/* Premium Toast System */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-12 left-1/2 z-50 bg-[#1C3B24] border border-white/10 text-[#EFECE6] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 backdrop-blur-md max-w-md w-[90%]"
          >
            <Sparkles size={16} className="text-[#D9A036] shrink-0" />
            <p className="text-xs font-light tracking-wide flex-1">{feedbackMessage}</p>
            <button onClick={() => setFeedbackMessage(null)} className="opacity-40 hover:opacity-100 transition-opacity">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* ================= NAVIGATION BACKTRACK TRACK ================= */}
        <div className="flex items-center justify-between pb-10 border-b border-[#EAE6DF] mb-12 sm:mb-16">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-[#9A8F80] hover:text-[#1C2B21] transition-colors"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Collection Archive</span>
          </button>
          
          <button className="w-10 h-10 rounded-xl border border-[#EAE6DF] bg-white flex items-center justify-center text-[#5C665E] hover:text-[#1C2B21] hover:border-[#1C3B24] transition-all shadow-sm">
            <Share2 size={14} strokeWidth={1.5} />
          </button>
        </div>

        {/* ================= MAIN METAFRAME DISPATCH GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-start">
          
          {/* LEFT COLUMN: ARCHITECTURAL GALLERY CAPTURE */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: premiumEase }}
              className="relative aspect-[4/5] bg-white rounded-2xl overflow-hidden border border-[#EAE6DF] shadow-[0_30px_70px_rgba(28,43,33,0.02)] group flex items-center justify-center p-12"
            >
              <img
                src={product.image || product.images?.[0] || "https://images.unsplash.com/photo-1594488651083-023b857dc3f8?q=80&w=600&auto=format&fit=crop"}
                alt={product.name}
                className="w-full h-full object-contain filter drop-shadow-2xl transform transition-transform duration-[1.5s] ease-out group-hover:scale-102"
              />
              
              {/* Flavor Profile Callout Badge */}
              <div className="absolute top-6 left-6">
                <span className="px-5 py-2.5 rounded-lg bg-[#F9F8F6]/90 backdrop-blur-md text-[9px] font-bold uppercase tracking-widest text-[#1C2B21] border border-[#EAE6DF] shadow-sm">
                  {product.flavor || 'Classic Roasted'}
                </span>
              </div>
              
              {/* Structural Stock Status Indicator */}
              {product.stock_status && (
                <div className="absolute bottom-6 right-6">
                  <span className={`px-4 py-2 rounded-md text-[9px] font-bold uppercase tracking-widest border shadow-sm ${
                    product.stock_status === 'In Stock' 
                      ? 'bg-[#1C3B24]/5 text-[#1C3B24] border-[#1C3B24]/10' 
                      : product.stock_status === 'Low Stock' 
                      ? 'bg-[#D9A036]/5 text-[#D9A036] border-[#D9A036]/10' 
                      : 'bg-red-50 text-red-700 border-red-100'
                  }`}>
                    {product.stock_status}
                  </span>
                </div>
              )}
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
                  <div key={i} className="flex flex-col items-center text-center p-5 rounded-xl bg-white border border-[#EAE6DF] space-y-2.5 shadow-sm transition-all duration-300 hover:border-[#1C3B24]/20">
                    <div className="text-[#D9A036]"><Icon size={24} strokeWidth={1.5} /></div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#9A8F80] leading-snug">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: REFINED EDITORIAL DATA INFUSION */}
          <div className="lg:col-span-6 space-y-10">
            
            {/* Header Identity Deck */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={12} 
                      fill={i < Math.floor(product.rating || 4.8) ? "#D9A036" : "none"} 
                      className={i < Math.floor(product.rating || 4.8) ? "text-[#D9A036]" : "text-[#EAE6DF]"} 
                    />
                  ))}
                </div>
                <span className="text-[9px] font-bold text-[#9A8F80] uppercase tracking-widest">{product.rating || 4.8} // Verified Score</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-serif font-light text-[#1C2B21] tracking-tight leading-[1.1]">
                {product.name}
              </h1>
              
              {/* Cost Calibration Node Matrix */}
              <div className="pt-4 flex items-center gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-serif font-light text-[#1C3B24]">₹{product.price}</span>
                  {product.original_price && product.original_price > product.price && (
                    <span className="text-base text-[#9A8F80] line-through font-serif font-light">₹{product.original_price}</span>
                  )}
                </div>
                {product.net_quantity && (
                  <span className="px-3 py-1 rounded-md bg-white text-[9px] font-bold uppercase tracking-widest text-[#5C665E] border border-[#EAE6DF] shadow-sm">
                    {product.net_quantity}
                  </span>
                )}
              </div>
            </div>

            {/* Ingestion & Allocation Node Controls */}
            <div className="pt-8 border-t border-[#EAE6DF] space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                
                {/* Micro-Counter Input Wrapper */}
                <div className="sm:col-span-4 space-y-2">
                  <p className="text-[8px] font-bold uppercase tracking-widest text-[#9A8F80] ml-0.5">Allocation Units</p>
                  <div className="flex items-center justify-between bg-white rounded-xl p-1.5 border border-[#EAE6DF] shadow-inner">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-sm font-light text-[#1C2B21] hover:bg-[#F9F8F6] rounded-lg transition-all"
                    >
                      −
                    </button>
                    <span className="font-serif font-medium text-[#1C2B21] text-base">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-sm font-light text-[#1C2B21] hover:bg-[#F9F8F6] rounded-lg transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Primary Cart Committal Control */}
                <div className="sm:col-span-8 flex gap-3">
                  <button
                    onClick={() => addToCollection("cart")}
                    className="flex-1 h-[54px] rounded-xl bg-[#1C3B24] text-[#EFECE6] font-bold text-[10px] uppercase tracking-[0.25em] shadow-xl shadow-[#1C3B24]/10 hover:bg-[#1C2B21] transition-all duration-300 flex items-center justify-center gap-3 transform active:scale-[0.99]"
                  >
                    <ShoppingBag size={13} strokeWidth={1.5} />
                    <span>Commit To Cart</span>
                  </button>
                  
                  {/* Personal Wishlist Archival Control */}
                  <button
                    onClick={() => addToCollection("wishlist")}
                    className="w-[54px] h-[54px] rounded-xl bg-white border border-[#EAE6DF] flex items-center justify-center text-[#1C2B21] hover:text-[#D9A036] hover:border-[#9A8F80]/50 transition-all shadow-sm"
                  >
                    <Heart size={16} strokeWidth={1.5} />
                  </button>
                </div>

              </div>
            </div>

            {/* Architectural Data Tabs */}
            <div className="pt-4 space-y-6">
              <div className="flex gap-6 border-b border-[#EAE6DF] pb-3 overflow-x-auto no-scrollbar">
                {['description', 'ingredients', 'nutrition', 'preparation'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative pb-2 whitespace-nowrap ${
                      activeTab === tab ? 'text-[#1C3B24]' : 'text-[#9A8F80] hover:text-[#1C2B21]'
                    }`}
                  >
                    <span>{tab}</span>
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="activeTabLine"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D9A036]" 
                      />
                    )}
                  </button>
                ))}
              </div>
              
              {/* Dynamic Information Display Deck */}
              <div className="min-h-[140px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: premiumEase }}
                    className="text-xs leading-relaxed text-[#5C665E] font-light"
                  >
                    {activeTab === 'description' && (
                      <div className="space-y-4">
                        <p className="text-sm font-serif font-light text-[#1C2B21] leading-relaxed">
                          {product.description || 'Experience the authentic structural purity of premium sattu, hand-selected and native stone-ground to perfection to maximize raw biological availability.'}
                        </p>
                      </div>
                    )}
                    
                    {activeTab === 'ingredients' && (
                      <div className="space-y-2">
                        <div className="bg-white p-6 rounded-xl border border-[#EAE6DF] shadow-sm">
                          <p className="font-serif italic text-[#1C2B21] text-sm">
                            {product.ingredients || 'Native Roasted Gram (Chana Sattu), Hand-milled Barley, Mineralized Salt Crystals.'}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'nutrition' && (
                      <div className="space-y-2">
                        <div className="bg-white p-6 rounded-xl border border-[#EAE6DF] shadow-sm font-mono text-[11px] text-[#1C2B21]/90 space-y-1 whitespace-pre-line">
                          {product.nutritional_info || 'Per 100g serving concentration:\n▪ Macro Protein: 20g\n▪ Organic Fiber: 8g\n▪ Complex Carbohydrates: 55g\n▪ Native Lipids: 3g'}
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'preparation' && (
                      <div className="space-y-4">
                        <div className="bg-white p-6 rounded-xl border border-[#EAE6DF] shadow-sm space-y-2">
                          <p className="whitespace-pre-line font-serif italic text-[#1C2B21] text-sm leading-relaxed">
                            {product.how_to_prepare || '1. Introduce 2 calibrated tablespoons of sattu to 1 glass of pristine cold water.\n2. Infuse natural jaggery or native sugar variants to desired sweet taste.\n3. Agitate dynamic suspension fluid thoroughly and serve at chilled equilibrium.'}
                          </p>
                        </div>
                        
                        {/* Elite Informational Notification Node Accent */}
                        <div className="p-4 rounded-xl bg-white border border-[#EAE6DF] shadow-sm flex gap-4 items-start">
                          <div className="w-8 h-8 rounded-lg bg-[#1C3B24]/5 text-[#1C3B24] flex items-center justify-center flex-shrink-0">
                            <Maximize2 size={12} strokeWidth={1.5} />
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-[9px] font-bold uppercase tracking-widest text-[#1C3B24]">Apothecary Custom Protocol</p>
                            <p className="text-[11px] text-[#5C665E] font-light leading-normal">Incorporate a single compression swipe of organic lime juice and black salt for premium physiological activation.</p>
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
