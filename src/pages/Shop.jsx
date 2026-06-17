import React, { useState, useEffect } from "react";
import { db } from "../components/Firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Search, Heart, ArrowUpRight, X, Sparkles, Star, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/Sattu/PageHeader";
import { useStore } from "../components/StoreProvider";

// Heritage-style flower icon from Bestsellers
const DividerFlower = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#10321F]">
    <path d="M12 2C12 2 14 8 18 10C18 10 12 12 12 18C12 18 10 12 6 10C6 10 12 8 12 2Z" fill="currentColor" />
    <circle cx="12" cy="10" r="2" fill="#D9A036" />
  </svg>
);

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFlavor, setSelectedFlavor] = useState("All");
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, wishlist, cart } = useStore();

  const handleAction = async (e, product, type) => {
    e.stopPropagation();
    const isInCart = cart.some(item => item.id === product.id);
    const isWishlisted = wishlist.some(item => item.id === product.id);

    if (type === 'cart') {
      if (isInCart) return;
      await addToCart(product);
      triggerToast("Added to your collection!");
    } else {
      if (isWishlisted) {
        await removeFromWishlist(product.id);
        triggerToast("Removed from wishlist");
      } else {
        await addToWishlist(product);
        triggerToast("Added to wishlist!");
      }
    }
  };

  const premiumEase = [0.25, 1, 0.5, 1];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setProducts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const triggerToast = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  const flavors = ["All", "Classic Roasted", "Elaichi", "Rose", "Dry Fruit", "Chocolate", "Namkeen Spicy"];
  
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFlavor =
      selectedFlavor === "All" ||
      (p.flavor && p.flavor.toLowerCase() === selectedFlavor.toLowerCase());
    return matchesSearch && matchesFlavor;
  });

  return (
    <div className="min-h-screen bg-transparent">
      <PageHeader
        title="Premium Sattu"
        subtitle="Heritage Selection"
        breadcrumbItems={[
          { label: "Home", path: "/" },
          { label: "Shop" },
        ]}
      />

      {/* Heritage Detail Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6-grain.png')] mix-blend-multiply"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10 pb-24 pt-12">
        {/* Filters & Search - Matching Homepage Spacing */}
        <div className="flex flex-col lg:flex-row gap-8 mb-20 items-start lg:items-end">
          <div className="w-full lg:w-1/3 space-y-3">
             <label className="text-[10px] font-poppins font-bold uppercase tracking-widest text-[#976E2A] ml-1">Search Our Blends</label>
             <div className="relative group">
                <Search
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#976E2A]"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Pure heritage sattu..."
                  className="w-full bg-[#FFFDF6] border border-[#E3DBC5] rounded-[20px] pl-12 pr-6 py-5 text-[13px] font-poppins font-medium text-[#203B23] outline-none shadow-sm focus:border-[#976E2A] transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
          </div>

          <div className="w-full lg:w-2/3 space-y-3">
             <label className="text-[10px] font-poppins font-bold uppercase tracking-widest text-[#976E2A] ml-1">Filter by Flavor</label>
             <div className="flex flex-wrap gap-3">
                {flavors.map((flavor) => (
                  <button
                    key={flavor}
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`px-6 py-3 rounded-xl text-[10px] font-poppins font-bold uppercase tracking-widest transition-all duration-300 border ${
                      selectedFlavor === flavor
                        ? "bg-[#203B23] text-[#FAF4E3] border-[#203B23] shadow-lg shadow-[#203B23]/10"
                        : "bg-[#FFFDF6] text-[#605948] border-[#E3DBC5] hover:border-[#976E2A]/40"
                    }`}
                  >
                    {flavor}
                  </button>
                ))}
             </div>
          </div>
        </div>

        {/* Product Collection Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[450px] bg-[#f5d2a1]/20 rounded-[24px] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {filteredProducts.map((product, idx) => {
              const isWishlisted = wishlist.some(item => item.id === product.id);
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.8, ease: premiumEase }}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-[#fbe7c8] rounded-[24px] border border-[#EACDA4] p-4 group relative cursor-pointer hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden"
                >
                  {/* Corner Ornaments Matching Homepage */}
                  <div className="absolute top-2 left-2 opacity-20 pointer-events-none">
                    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="#10321F" strokeWidth="1">
                      <path d="M10,10 Q30,10 50,30 Q10,30 10,10 Z M10,10 Q10,30 30,50 Q30,10 10,10 Z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-2 right-2 opacity-20 pointer-events-none rotate-180">
                    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="#10321F" strokeWidth="1">
                      <path d="M10,10 Q30,10 50,30 Q10,30 10,10 Z M10,10 Q10,30 30,50 Q30,10 10,10 Z" />
                    </svg>
                  </div>

                  {/* Arched Image Container */}
                  <div className="relative aspect-square mb-5 rounded-[20px] overflow-hidden bg-[#F4EBD8] border border-[#E3DBC5]/30">
                    <img
                      src={product.image || product.images?.[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#203B23]/5" />
                    <button
                      onClick={(e) => handleAction(e, product, "wishlist")}
                      className={`absolute top-3 right-3 w-10 h-10 rounded-full transition-all duration-300 shadow-md flex items-center justify-center z-20 backdrop-blur-sm ${
                        isWishlisted 
                        ? "bg-[#C45525] text-white" 
                        : "bg-white/90 text-[#203B23] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                      }`}
                    >
                      <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                  </div>

                  <div className="space-y-4 px-1 flex-grow flex flex-col relative z-10">
                    <div className="space-y-1">
                      <span className="text-[10px] font-poppins font-bold uppercase tracking-[0.2em] text-[#C45525]">
                        {product.flavor || "Heritage Blend"}
                      </span>
                      <h3 className="text-[22px] font-poppins font-bold text-[#10321F] tracking-tight leading-tight line-clamp-2">
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="fill-[#D9A036] text-[#D9A036]" />
                      ))}
                      <span className="text-[12px] font-poppins font-bold text-[#10321F] ml-1">{product.rating || "4.9"}</span>
                    </div>

                     {/* Decorative Divider */}
                     <div className="flex items-center gap-3 py-1 opacity-40">
                      <div className="h-[1px] flex-grow border-t border-dashed border-[#10321F]/30" />
                      <DividerFlower />
                      <div className="h-[1px] flex-grow border-t border-dashed border-[#10321F]/30" />
                    </div>
                    
                    <div className="pt-2 flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                         <span className="text-[28px] font-poppins font-bold text-[#10321F] leading-none">
                          ₹{product.price}
                        </span>
                        {product.mrp && product.mrp > product.price && (
                          <span className="text-[12px] text-[#10321F]/50 line-through font-poppins font-semibold mt-1">
                            ₹{product.mrp}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => handleAction(e, product, "cart")}
                        disabled={cart.some(item => item.id === product.id)}
                        className={`px-6 py-3 rounded-xl text-[11px] font-poppins font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-md group/btn ${
                          cart.some(item => item.id === product.id)
                          ? "bg-[#C45525] text-white cursor-default"
                          : "bg-[#10321F] text-white hover:bg-[#C45525]"
                        }`}
                      >
                        {cart.some(item => item.id === product.id) ? "IN BAG" : "ADD"}
                        <ShoppingBag size={14} className="group-hover/btn:rotate-12 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Empty Filter Landing */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-28 bg-[#FFFDF6] rounded-[48px] border-[1.5px] border-dashed border-[#E3DBC5] max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#FAF4E3] border border-[#E3DBC5] flex items-center justify-center text-[#976E2A] mx-auto mb-6">
              <Search size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-poppins font-bold text-[#203B23] mb-2">
              No Blends Found
            </h3>
            <p className="text-sm text-[#605948] font-poppins font-medium max-w-xs mx-auto leading-relaxed">
              We couldn't find any heritage blends matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedFlavor("All");
              }}
              className="mt-8 inline-flex items-center gap-2 text-[11px] font-poppins font-bold uppercase tracking-[0.2em] text-[#976E2A] hover:text-[#203B23] transition-colors pb-1 border-b border-dashed border-[#976E2A]"
            >
              <span>Reset Selection</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Feedback Toast */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-12 left-1/2 z-50 bg-[#203B23] border border-[#FAF4E3]/10 text-[#FAF4E3] px-8 py-5 rounded-[24px] shadow-2xl flex items-center gap-6 backdrop-blur-xl max-w-md w-[90%]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FAF4E3]/10 flex items-center justify-center text-[#976E2A]">
              <Sparkles size={20} />
            </div>
            <p className="text-xs font-poppins font-medium tracking-wide flex-1">{feedbackMessage}</p>
            <button
              onClick={() => setFeedbackMessage(null)}
              className="opacity-40 hover:opacity-100 transition-opacity"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
