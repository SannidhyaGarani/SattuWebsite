import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../components/Firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useAuth } from '../../components/useAuth';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Tiny floral divider icon from the reference
const DividerFlower = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#10321F]">
    <path d="M12 2C12 2 14 8 18 10C18 10 12 12 12 18C12 18 10 12 6 10C6 10 12 8 12 2Z" fill="currentColor" />
    <circle cx="12" cy="10" r="2" fill="#D9A036" />
  </svg>
);

// Leaf flourish icon for headers
const LeafFlourish = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#C45525]">
    <path d="M21.9996 2.00035C21.9996 2.00035 15.9996 1.00035 10.9996 6.00035C8.49964 8.50035 7.49964 12.0003 7.49964 12.0003C7.49964 12.0003 10.9996 11.0003 13.4996 8.50035C18.4996 3.50035 21.9996 2.00035 21.9996 2.00035Z" />
    <path d="M7.49964 12.0003C7.49964 12.0003 3.99964 11.0003 2.99964 13.0003C1.99964 15.0003 4.99964 21.0003 4.99964 21.0003C4.99964 21.0003 10.9996 18.0003 12.9996 17.0003C14.9996 16.0003 13.9996 12.5003 13.9996 12.5003C13.9996 12.5003 11.9996 14.5003 9.49964 15.0003C6.99964 15.5003 7.49964 12.0003 7.49964 12.0003Z" />
  </svg>
);

const ProductCard = ({ product, idx }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const addToCollection = async (e, collectionName) => {
    e.stopPropagation();
    if (!user) { navigate('/login'); return; }
    // existing cart logic
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
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="#10321F" strokeWidth="1">
          <path d="M10,10 Q30,10 50,30 Q10,30 10,10 Z M10,10 Q10,30 30,50 Q30,10 10,10 Z" />
        </svg>
      </div>
      <div className="absolute bottom-2 right-2 opacity-30 pointer-events-none rotate-180">
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="#10321F" strokeWidth="1">
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
      </div>

      {/* Info Block */}
      <div className="flex flex-col flex-grow relative z-10 px-1">
        <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#C45525] mb-1">
          {product.flavor || "Flavor Type"}
        </span>
        <h3 className="text-[22px] font-serif font-bold text-[#10321F] mb-1 leading-tight">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-[#D9A036] text-[#D9A036]" />
            ))}
          </div>
          <span className="text-sm font-bold text-[#10321F] ml-1">4.5</span>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center gap-3 my-2 opacity-60">
          <div className="h-[1px] flex-grow bg-[#10321F]/20 border-t border-dashed border-[#10321F]/30"></div>
          <DividerFlower />
          <div className="h-[1px] flex-grow bg-[#10321F]/20 border-t border-dashed border-[#10321F]/30"></div>
        </div>
      </div>

      {/* Price & Action Footer */}
      <div className="flex items-center justify-between mt-auto px-1 pt-3 relative z-10">
        <div className="flex flex-col">
          <span className="text-[28px] font-serif font-bold text-[#10321F] leading-none">
            ₹{product.price}
          </span>
          <span className="text-sm font-sans font-semibold text-[#10321F]/50 line-through mt-0.5">
            ₹{product.mrp || Math.round(product.price * 1.2)}
          </span>
        </div>
        <button
          onClick={(e) => addToCollection(e, 'cart')}
          className="px-5 py-2.5 bg-[#10321F] text-white rounded-[12px] text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#1A452C] transition-colors"
        >
          ADD
          <ShoppingBag size={14} className="opacity-90" />
        </button>
      </div>
    </motion.div>
  );
};

const BestsellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setProducts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })).slice(0, 3)); // Limiting to 3 to match design
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
      <section
        className="py-24 relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/img/b1.png')" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[450px] bg-[#f5d2a1]/50 rounded-[24px] animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-24 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/img/b1.png')" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Title Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <LeafFlourish />
              <span className="text-[#C45525] font-sans font-bold tracking-[0.2em] text-xs uppercase">
                Curated Favorites
              </span>
              <LeafFlourish />
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-[42px] md:text-[52px] font-serif font-bold text-[#10321F] tracking-tight leading-none">
                Our Bestsellers
              </h2>
              <DividerFlower />
            </div>
          </div>

          <Link
            to="/shop"
            className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-[#10321F] flex items-center gap-2 hover:text-[#C45525] transition-colors pb-1 border-b-[1.5px] border-dashed border-[#10321F]/40 mb-2"
          >
            <span>View All Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Desktop Grid Layout (Matched to 3 columns like reference) */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} idx={idx} />
          ))}
        </div>

        {/* Mobile & Tablet Slider Layout */}
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
                <ProductCard product={product} idx={idx} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>

      {/* Embedded Swiper Custom Pagination Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .heritage-swiper .swiper-pagination-bullet {
          background: #10321F !important;
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