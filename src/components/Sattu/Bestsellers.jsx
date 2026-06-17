import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star, ShoppingBag, ArrowRight, Heart, X, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../components/Firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useStore } from '../../components/StoreProvider';
import SectionHeader from './SectionHeader';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Tiny floral divider icon from the reference
const DividerFlower = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#6b4f3a]">
    <path d="M12 2C12 2 14 8 18 10C18 10 12 12 12 18C12 18 10 12 6 10C6 10 12 8 12 2Z" fill="currentColor" />
    <circle cx="12" cy="10" r="2" fill="#D9A036" />
  </svg>
);

const ProductCard = ({ product, idx, triggerToast }) => {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, wishlist, cart } = useStore();
  const isWishlisted = wishlist.some(item => item.id === product.id);
  const isInCart = cart.some(item => item.id === product.id);

  const handleAction = async (e, type) => {
    e.stopPropagation();
    if (type === 'cart') {
      if (isInCart) return;
      await addToCart(product);
      triggerToast("Added to your selection!");
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-[#fbe7c8] rounded-[24px] border border-[#EACDA4] p-4 group relative cursor-pointer hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden"
    >
      {/* Corner Ornaments */}
      <div className="absolute top-2 left-2 opacity-30 pointer-events-none">
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="#6b4f3a" strokeWidth="1">
          <path d="M10,10 Q30,10 50,30 Q10,30 10,10 Z M10,10 Q10,30 30,50 Q30,10 10,10 Z" />
        </svg>
      </div>
      <div className="absolute bottom-2 right-2 opacity-30 pointer-events-none rotate-180">
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="#6b4f3a" strokeWidth="1">
          <path d="M10,10 Q30,10 50,30 Q10,30 10,10 Z M10,10 Q10,30 30,50 Q30,10 10,10 Z" />
        </svg>
      </div>

      {/* Image Block */}
      <div className="relative aspect-square rounded-[18px] overflow-hidden bg-[#F4EBD8] mb-4">
        <img
          src={product.image || product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Hover Wishlist Action */}
        <button
          onClick={(e) => handleAction(e, 'wishlist')}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-20 ${isWishlisted
              ? "bg-[#C45525] text-white"
              : "bg-white/80 text-[#6b4f3a] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
            }`}
        >
          <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Info Block */}
      <div className="flex flex-col flex-grow relative z-10 px-1">
        <span className="text-[11px] font-poppins font-bold uppercase tracking-widest text-[#C45525] mb-1">
          {product.flavor || "Flavor Type"}
        </span>
        <h3 className="text-[22px] font-poppins font-bold text-[#6b4f3a] mb-1 leading-tight">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-[#D9A036] text-[#D9A036]" />
            ))}
          </div>
          <span className="text-sm font-bold text-[#6b4f3a] ml-1">4.5</span>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center gap-3 my-2 opacity-60">
          <div className="h-[1px] flex-grow bg-[#6b4f3a]/20 border-t border-dashed border-[#6b4f3a]/30"></div>
          <DividerFlower />
          <div className="h-[1px] flex-grow bg-[#6b4f3a]/20 border-t border-dashed border-[#6b4f3a]/30"></div>
        </div>
      </div>

      {/* Price & Action Footer */}
      <div className="flex items-center justify-between mt-auto px-1 pt-3 relative z-10">
        <div className="flex flex-col">
          <span className="text-[28px] font-poppins font-bold text-[#6b4f3a] leading-none">
            ₹{product.price}
          </span>
          <span className="text-sm font-poppins font-semibold text-[#6b4f3a]/50 line-through mt-0.5">
            ₹{product.mrp || Math.round(product.price * 1.2)}
          </span>
        </div>
        <button
          onClick={(e) => handleAction(e, 'cart')}
          disabled={isInCart}
          className={`px-5 py-2.5 rounded-[12px] text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-300 ${isInCart
              ? "bg-[#C45525] text-white cursor-default opacity-80"
              : "bg-[#6b4f3a] text-white hover:bg-[#C45525]"
            }`}
        >
          {isInCart ? "IN BAG" : "ADD"}
          <ShoppingBag size={14} className="opacity-90" />
        </button>
      </div>
    </motion.div>
  );
};

const BestsellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const triggerToast = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setProducts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })).slice(0, 4));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#FAF4E3]/50" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[450px] bg-[#f5d2a1]/50 rounded-[24px] animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 block md:hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/img/b1.png')" }}
      />
      <div
        className="absolute inset-0 hidden md:block bg-cover bg-center"
        style={{ backgroundImage: "url('/img/b1.png')" }}
      />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6-grain.png')]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="relative">
          <SectionHeader
            title="Our Bestsellers"
            subtitle=" Shop the Collection"
          />
          <div className="absolute top-0 right-0 hidden md:block">
            <Link
              to="/shop"
              className="text-[11px] font-poppins font-bold uppercase tracking-[0.15em] text-[#6b4f3a] flex items-center gap-2 hover:text-[#C45525] transition-colors pb-1 border-b-[1.5px] border-dashed border-[#6b4f3a]/40"
            >
              <span>View Shop</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} idx={idx} triggerToast={triggerToast} />
          ))}
        </div>

        <div className="block lg:hidden !-mr-6 md:!-mr-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1.15}
            pagination={{ clickable: true, modifier: 1 }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              480: { slidesPerView: 1.4 },
              640: { slidesPerView: 2.1 },
              868: { slidesPerView: 2.5 },
            }}
            className="pb-16 heritage-swiper"
          >
            {products.map((product, idx) => (
              <SwiperSlide key={product.id} className="h-auto">
                <ProductCard product={product} idx={idx} triggerToast={triggerToast} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Feedback Toast */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-12 left-1/2 z-[200] bg-[#6b4f3a] border border-white/10 text-[#FAF4E3] px-8 py-5 rounded-[24px] shadow-2xl flex items-center gap-6 backdrop-blur-xl max-w-md w-[90%]"
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

      <style dangerouslySetInnerHTML={{
        __html: `
        .heritage-swiper .swiper-pagination-bullet {
          background: #6b4f3a !important;
          opacity: 0.25;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .heritage-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #C45525 !important;
          width: 24px;
          border-radius: 4px;
        }
        .heritage-swiper .swiper-pagination {
          bottom: 0px !important;
        }
      `}} />
    </section>
  );
};

export default BestsellerProducts;
export { BestsellerProducts as Bestsellers };
