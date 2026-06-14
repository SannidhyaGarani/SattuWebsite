import React, { useState, useEffect } from "react";
import { db } from "../components/Firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Search, Heart, Plus, SlidersHorizontal, ArrowUpRight, X, Sparkles, Star, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/Sattu/PageHeader";

// Heritage-style flower icon
const DividerFlower = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#203B23]">
    <path d="M12 2C12 2 14 8 18 10C18 10 12 12 12 18C12 18 10 12 6 10C6 10 12 8 12 2Z" fill="currentColor" />
    <circle cx="12" cy="10" r="2" fill="#976E2A" />
  </svg>
);

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
    <div className="min-h-screen bg-[#FAF4E3]">
      <PageHeader
        title="Premium Sattu"
        subtitle="Heritage Selection"
        breadcrumbItems={[
          { label: "Home", path: "/" },
          { label: "Boutique" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10 pb-24 pt-12">
        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-16 items-start lg:items-center">
          {/* Heritage Search Input */}
          <div className="w-full lg:w-1/3 relative group">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-[#976E2A] group-focus-within:text-[#203B23] transition-colors"
              size={16}
            />
            <input
              type="text"
              placeholder="Search sattu blends..."
              className="w-full bg-[#FFFDF6] border-[1.5px] border-[#E3DBC5] rounded-2xl pl-12 pr-6 py-4 text-[13px] font-poppins font-medium text-[#203B23] outline-none placeholder:text-[#605948]/40 focus:border-[#203B23]/40 focus:shadow-xl transition-all"
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
                className={`px-5 py-3 rounded-xl text-[10px] font-poppins font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-500 border-[1.5px] ${
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

        {/* Product Collection Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-6 animate-pulse">
                <div className="aspect-[4/5] rounded-[32px] bg-[#FFFDF6] border border-[#E3DBC5]" />
                <div className="h-4 bg-[#E3DBC5] rounded w-2/3" />
                <div className="h-3 bg-[#E3DBC5] rounded w-1/2" />
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
                className="group cursor-pointer flex flex-col h-full bg-[#FFFDF6] border-[1.5px] border-[#E3DBC5] rounded-[32px] p-4 transition-all duration-500 hover:border-[#976E2A]/60 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Arched Image Container */}
                <div className="relative aspect-square mb-6 rounded-t-[100px] rounded-b-[24px] overflow-hidden bg-[#FAF4E3] border border-[#E3DBC5]/50 group-hover:scale-[1.02] transition-transform duration-700">
                  <img
                    src={product.image || product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#203B23]/5" />
                  
                  {/* Floating Action Badge */}
                  <button
                    onClick={(e) => addToCollection(e, product, "wishlist")}
                    className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full text-[#203B23] hover:bg-[#C45525] hover:text-white transition-all shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
                  >
                    <Heart size={14} />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[9px] font-poppins font-bold uppercase tracking-[0.2em] text-[#203B23] shadow-sm border border-[#E3DBC5]/50">
                      {product.flavor || "Heritage Blend"}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 px-2 flex-grow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className="fill-[#976E2A] text-[#976E2A]" />
                      ))}
                      <span className="text-[10px] font-poppins font-bold text-[#203B23] ml-1">{product.rating || "4.9"}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-poppins font-bold text-[#203B23] tracking-tight leading-tight line-clamp-2">
                    {product.name}
                  </h3>

                   {/* Decorative Divider */}
                  <div className="flex items-center gap-3 py-1 opacity-40">
                    <div className="h-[1px] flex-grow border-t border-dashed border-[#203B23]/30" />
                    <DividerFlower />
                    <div className="h-[1px] flex-grow border-t border-dashed border-[#203B23]/30" />
                  </div>
                  
                  <div className="pt-2 flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                       <span className="text-[24px] font-poppins font-bold text-[#203B23] leading-none">
                        ₹{product.price}
                      </span>
                      {product.mrp && product.mrp > product.price && (
                        <span className="text-[12px] text-[#605948]/50 line-through font-poppins font-semibold mt-1">
                          ₹{product.mrp}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => addToCollection(e, product, "cart")}
                      className="px-6 py-2.5 bg-[#203B23] text-white rounded-xl text-[11px] font-poppins font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#C45525] transition-all shadow-md group/btn"
                    >
                      ADD
                      <Plus size={14} className="group-hover/btn:rotate-90 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty Filter Landing */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-28 bg-[#FFFDF6] rounded-[32px] border-[1.5px] border-dashed border-[#E3DBC5] max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-[#FAF4E3] border border-[#E3DBC5] flex items-center justify-center text-[#976E2A] mx-auto mb-6">
              <Search size={20} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-poppins font-bold text-[#203B23] mb-1">
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
              className="mt-6 inline-flex items-center gap-2 text-[11px] font-poppins font-bold uppercase tracking-[0.2em] text-[#976E2A] hover:text-[#203B23] transition-colors"
            >
              <span>Reset Selection</span>
              <ArrowUpRight size={14} />
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
            className="fixed bottom-12 left-1/2 z-50 bg-[#203B23] border border-[#FAF4E3]/10 text-[#FAF4E3] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 backdrop-blur-md max-w-md w-[90%]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FAF4E3]/10 flex items-center justify-center text-[#976E2A]">
              <Sparkles size={16} />
            </div>
            <p className="text-xs font-poppins font-medium tracking-wide flex-1">{feedbackMessage}</p>
            <button
              onClick={() => setFeedbackMessage(null)}
              className="opacity-40 hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
