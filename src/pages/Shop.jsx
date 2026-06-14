import React, { useState, useEffect } from "react";
import { db } from "../components/Firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Search, Heart, Plus, SlidersHorizontal, ArrowUpRight, X, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/Sattu/PageHeader";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFlavor, setSelectedFlavor] = useState("All");
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  
  const navigate = useNavigate();
  const { user } = useAuth();

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

  const addToCollection = async (e, product, collectionName) => {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const itemRef = doc(db, "users", user.uid, collectionName, product.id);
      await setDoc(itemRef, {
        name: product.name,
        price: product.price,
        image: product.image || product.images?.[0] || "",
        addedAt: new Date().toISOString(),
        flavor: product.flavor || "",
      });
      triggerToast(`Successfully added to your ${collectionName}!`);
    } catch (error) {
      console.error(`Error adding to ${collectionName}:`, error);
      triggerToast("An error occurred. Please try again.");
    }
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
    <div className="min-h-screen bg-[#FDFBF7]">
      <PageHeader
        title="Premium Sattu Collection"
        subtitle="Shop Our Blends"
        breadcrumbItems={[
          { label: "Home", path: "/" },
          { label: "Shop" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10 pb-24 pt-12">
        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-start lg:items-center">
          {/* Minimalist Search Tunnel */}
          <div className="w-full lg:w-1/3 relative group">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-[#707A72] group-focus-within:text-[#1C3B24] transition-colors"
              size={16}
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder="Search sattu blends..."
              className="w-full bg-white border border-[#D9D3C7] rounded-xl pl-12 pr-6 py-4 text-xs font-light text-[#1C2B21] outline-none placeholder:text-[#707A72]/60 focus:border-[#1C3B24]/40 focus:shadow-[0_10px_30px_rgba(28,43,33,0.02)] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Premium Filter Track */}
          <div className="w-full lg:w-2/3 flex flex-wrap gap-2 items-center justify-start lg:justify-end">
            {flavors.map((flavor) => (
              <button
                key={flavor}
                onClick={() => setSelectedFlavor(flavor)}
                className={`px-5 py-3 rounded-lg text-[9px] font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-500 ${
                  selectedFlavor === flavor
                    ? "bg-[#1C3B24] text-[#EFECE6] shadow-xl shadow-[#1C3B24]/10"
                    : "bg-white text-[#707A72] hover:bg-[#FDFBF7] border border-[#D9D3C7] hover:border-[#707A72]/40"
                }`}
              >
                {flavor}
              </button>
            ))}
          </div>
        </div>

        {/* Product Collection Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-6 animate-pulse">
                <div className="aspect-[4/5] rounded-2xl bg-[#EFECE6]" />
                <div className="h-4 bg-[#EFECE6] rounded w-2/3" />
                <div className="h-3 bg-[#EFECE6] rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.8, ease: premiumEase }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="group cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[4/5] mb-6 bg-[#EFECE6] rounded-2xl overflow-hidden border border-[#D9D3C7] transition-all duration-700 ease-out group-hover:shadow-[0_20px_60px_rgba(28,43,33,0.06)] group-hover:-translate-y-1">
                  <img
                    src={
                      product.image ||
                      product.images?.[0] ||
                      "https://images.unsplash.com/photo-1594488651083-023b857dc3f8?q=80&w=600&auto=format&fit=crop"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C2B21]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <button
                      onClick={(e) => addToCollection(e, product, "wishlist")}
                      className="w-11 h-11 bg-white/95 backdrop-blur-md rounded-xl text-[#1C2B21] hover:bg-[#1C3B24] hover:text-white transition-all shadow-lg flex items-center justify-center border border-[#D9D3C7]"
                    >
                      <Heart size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md text-[9px] font-black uppercase tracking-[0.25em] text-[#1C3B21] shadow-sm border border-[#D9D3C7]">
                      {product.flavor || "Classic Roasted"}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 px-1">
                  <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-[#707A72]">
                    <span className="flex items-center gap-1 text-[#D9A036]">
                      ★ <span className="text-[#1C2B21] font-medium">{product.rating || "4.9"}</span>
                    </span>
                    {product.stock_status && (
                      <span
                        className={
                          product.stock_status === "In Stock"
                            ? "text-[#4A5D4E]"
                            : "text-[#D9A036]"
                        }
                      >
                        {product.stock_status}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#1C2B21] tracking-tight group-hover:text-[#1C3B24] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="pt-4 border-t border-[#D9D3C7] flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold uppercase tracking-widest text-[#707A72]">
                        Price
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-serif font-bold text-[#1C3B24] mt-0.5">
                          ₹{product.price}
                        </span>
                        {product.original_price && product.original_price > product.price && (
                          <span className="text-sm text-[#707A72] line-through font-serif">
                            ₹{product.original_price}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => addToCollection(e, product, "cart")}
                      className="w-12 h-12 bg-[#1C3B24] border border-[#1C3B24] text-white group-hover:bg-[#112517] hover:scale-105 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg shadow-[#1C3B24]/20"
                    >
                      <Plus size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty Filter Landing */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-28 bg-white rounded-2xl border border-dashed border-[#707A72]/30 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#FDFBF7] border border-[#D9D3C7] flex items-center justify-center text-[#707A72] mx-auto mb-6">
              <Search size={16} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#1C2B21] mb-1">
              No Sattu Blends Found
            </h3>
            <p className="text-xs text-[#707A72] font-light max-w-xs mx-auto leading-relaxed">
              We couldn't find any blends matching your criteria. Try a different search term!
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedFlavor("All");
              }}
              className="mt-6 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D9A036] hover:text-[#1C3B24] transition-colors"
            >
              <span>Reset Filters</span>
              <ArrowUpRight size={12} />
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
            className="fixed bottom-12 left-1/2 z-50 bg-[#1C3B24] border border-white/10 text-[#EFECE6] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 backdrop-blur-md max-w-md w-[90%]"
          >
            <Sparkles size={16} className="text-[#D9A036] shrink-0" />
            <p className="text-xs font-light tracking-wide flex-1">{feedbackMessage}</p>
            <button
              onClick={() => setFeedbackMessage(null)}
              className="opacity-40 hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
