import React, { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { db } from "./Firebase";
import { collection, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Trash2, ShoppingBag, ArrowLeft, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "./Sattu/PageHeader";

const Wishlist = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const triggerToast = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const snap = await getDocs(collection(db, "users", user.uid, "wishlist"));
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setItems(list);
      } catch (error) {
        console.error("Error loading wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const removeItem = async (id) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "wishlist", id));
      setItems((prev) => prev.filter((i) => i.id !== id));
      triggerToast("Removed from wishlist");
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const moveToCart = async (item) => {
    if (!user) return;
    try {
      // Add to cart
      await setDoc(doc(db, "users", user.uid, "cart", item.id), {
        ...item,
        addedAt: new Date().toISOString()
      });
      // Remove from wishlist
      await deleteDoc(doc(db, "users", user.uid, "wishlist", item.id));
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      triggerToast("Moved to cart!");
    } catch (error) {
      console.error("Error moving to cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EFECE6] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1C3B24]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#EFECE6]">
        <PageHeader
          title="Your Wishlist"
          subtitle="Saved Favorites"
          breadcrumbItems={[
            { label: "Home", path: "/" },
            { label: "Wishlist" },
          ]}
        />
        <div className="py-24 px-6">
          <div className="bg-white p-12 rounded-3xl border border-[#D9D3C7] shadow-[0_20px_50px_rgba(28,43,33,0.05)] max-w-md w-full text-center mx-auto">
            <div className="w-20 h-20 bg-[#EFECE6] rounded-3xl flex items-center justify-center mx-auto mb-8 text-[#1C3B24]">
              <Heart size={40} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#1C2B21] mb-4 text-center">
              Sign In to Wishlist
            </h2>
            <p className="text-[#707A72] font-medium mb-8">
              Sign in to access your saved Sattu blends.
            </p>
            <Link
              to="/login"
              className="block w-full py-4 bg-[#1C3B24] text-white rounded-2xl font-bold hover:bg-[#112517] transition-all shadow-lg shadow-[#1C3B24]/20"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EFECE6]">
      <PageHeader
        title="Your Wishlist"
        subtitle="Saved Favorites"
        backUrl="/shop"
        breadcrumbItems={[
          { label: "Home", path: "/" },
          { label: "Shop", path: "/shop" },
          { label: "Wishlist" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <p className="text-[#707A72] font-medium">
              {items.length} {items.length === 1 ? "Saved Blend" : "Saved Blends"}
            </p>
          </div>
        </div>

        {/* Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative flex flex-col justify-between"
              >
                <div className="relative aspect-[4/5] mb-6 bg-[#EFECE6] rounded-2xl overflow-hidden border border-[#D9D3C7] transition-all duration-700 ease-out group-hover:shadow-[0_20px_60px_rgba(28,43,33,0.06)] group-hover:-translate-y-1">
                  <img
                    src={item.image || item.images?.[0] || "https://images.unsplash.com/photo-1594488651083-023b857dc3f8?q=80&w=600&auto=format&fit=crop"}
                    alt={item.name}
                    className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C2B21]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-4 right-4 w-11 h-11 bg-white/95 backdrop-blur-md rounded-xl text-[#1C2B21] hover:bg-red-500 hover:text-white transition-all shadow-lg flex items-center justify-center border border-[#D9D3C7]"
                  >
                    <Trash2 size={16} strokeWidth={1.5} />
                  </button>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md text-[9px] font-black uppercase tracking-[0.25em] text-[#1C3B21] shadow-sm border border-[#D9D3C7]">
                      {item.flavor || "Classic Roasted"}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 px-1">
                  <h3 className="text-lg font-serif font-bold text-[#1C2B21] tracking-tight group-hover:text-[#1C3B24] transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <div className="pt-4 border-t border-[#D9D3C7] flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold uppercase tracking-widest text-[#707A72]">
                        Price
                      </span>
                      <span className="text-2xl font-serif font-bold text-[#1C3B24] mt-0.5">
                        ₹{Number(item.price || 0).toFixed(0)}
                      </span>
                    </div>
                    <button
                      onClick={() => moveToCart(item)}
                      className="w-12 h-12 bg-[#1C3B24] border border-[#1C3B24] text-white group-hover:bg-[#112517] hover:scale-105 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg shadow-[#1C3B24]/20"
                    >
                      <ShoppingBag size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-28 bg-white rounded-3xl border border-[#D9D3C7] max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#EFECE6] border border-[#D9D3C7] flex items-center justify-center mx-auto mb-8 text-[#707A72]">
              <Heart size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1C2B21] mb-4">
              Your Wishlist is Empty
            </h3>
            <p className="text-[#707A72] font-medium max-w-md mx-auto mb-8 leading-relaxed">
              Explore our premium Sattu blends and save your favorites here for later.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-[#1C3B24] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#112517] transition-all shadow-lg shadow-[#1C3B24]/20"
            >
              Explore Products
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
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

export default Wishlist;
