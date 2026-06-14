import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, User, Search, Menu, X, Leaf, Heart, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import { db } from './Firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const location = useLocation();
  const { user } = useAuth();
  const { scrollY } = useScroll();

  // Smooth architectural scroll transformations - refined for compactness
  const headerHeight = useTransform(scrollY, [0, 80], ['80px', '65px']);
  const headerBg = useTransform(
    scrollY,
    [0, 80],
    ['rgba(253, 246, 233, 0)', 'rgba(253, 246, 233, 0.98)']
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 80],
    ['rgba(139, 115, 85, 0)', 'rgba(217, 160, 54, 0.4)']
  );
  const logoScale = useTransform(scrollY, [0, 80], [1, 0.95]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!user) {
      setCartCount(0);
      setWishlistCount(0);
      return;
    }

    const unsubscribeCart = onSnapshot(
      collection(db, "users", user.uid, "cart"),
      (snapshot) => setCartCount(snapshot.size),
      (error) => console.error("Error fetching luxury cart:", error)
    );

    const unsubscribeWishlist = onSnapshot(
      collection(db, "users", user.uid, "wishlist"),
      (snapshot) => setWishlistCount(snapshot.size),
      (error) => console.error("Error fetching luxury wishlist:", error)
    );

    return () => {
      unsubscribeCart();
      unsubscribeWishlist();
    };
  }, [user]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About us', path: '/about' },
    { name: 'Benefits', path: '/benefits' },
    { name: 'Contact', path: '/contact' },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06, duration: 0.5, ease: [0.215, 0.610, 0.355, 1.000] }
    })
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[100] transition-all duration-500">
      {/* Tactile Editorial Announcement Ticker */}
      <div className="bg-[#1C3B24] text-[#FDF6E9] py-2.5 px-4 overflow-hidden relative border-b-2 border-[#D9A036]/20 select-none">
        {/* Subtle fiber pattern overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
        
        <motion.div 
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
          className="flex gap-20 md:gap-24 whitespace-nowrap items-center text-[8px] md:text-[9px] font-bold tracking-[0.4em] uppercase font-sans relative z-10"
        >
          <span className="flex items-center gap-3 text-[#FDF6E9]/90"><Leaf size={10} className="text-[#D9A036]" /> 100% Certified Organic Foods</span>
          <span className="flex items-center gap-3 text-[#FDF6E9]/90"><div className="w-1.5 h-1.5 bg-[#D9A036] rotate-45" /> Stone-Ground · Sun-Dried · No Preservatives</span>
          <span className="flex items-center gap-3 text-[#FDF6E9]/90"><Sparkles size={10} className="text-[#D9A036]" /> Premium Sattu · Namkeen · Dry Fruits</span>
          <span className="flex items-center gap-3 text-[#FDF6E9]/90"><div className="w-1.5 h-1.5 bg-[#D9A036] rotate-45" /> Free Shipping on Orders Above ₹999</span>
          
          {/* Loop duplicates */}
          <span className="flex items-center gap-3 text-[#FDF6E9]/90"><Leaf size={10} className="text-[#D9A036]" /> 100% Certified Organic Foods</span>
          <span className="flex items-center gap-3 text-[#FDF6E9]/90"><div className="w-1.5 h-1.5 bg-[#D9A036] rotate-45" /> Stone-Ground · Sun-Dried · No Preservatives</span>
          <span className="flex items-center gap-3 text-[#FDF6E9]/90"><Sparkles size={10} className="text-[#D9A036]" /> Premium Sattu · Namkeen · Dry Fruits</span>
          <span className="flex items-center gap-3 text-[#FDF6E9]/90"><div className="w-1.5 h-1.5 bg-[#D9A036] rotate-45" /> Free Shipping on Orders Above ₹999</span>
        </motion.div>
      </div>

      {/* Main Luxury Navbar */}
      <motion.nav 
        style={{ 
          height: headerHeight,
          backgroundColor: headerBg,
          borderBottomWidth: '2px',
          borderBottomColor: headerBorder,
          backdropFilter: 'blur(30px)' 
        }}
        className="px-4 sm:px-8 md:px-12 flex items-center transition-all duration-500"
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          
          {/* Logo & Brand Name Signature - Premium Stacked Layout */}
          <motion.div style={{ scale: logoScale }}>
            <Link to="/" className="flex items-center gap-4 group relative z-[110]">
              <div className="relative">
                <img 
                  src="/img/logo.png" 
                  alt="Indian Food Way" 
                  className="h-12 md:h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#D9A036]/10 blur-xl rounded-full scale-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <div className="flex flex-col items-start leading-[0.8] gap-0">
                <span className="text-[20px] md:text-[28px] font-serif font-black text-[#1C3B24] tracking-tighter transition-colors group-hover:text-[#D9A036] uppercase">
                  Indian
                </span>
                <div className="flex flex-col items-start">
                  <span className="text-[14px] md:text-[20px] font-serif text-[#1C3B24] tracking-tight transition-colors group-hover:text-[#D9A036] uppercase">
                    Food Way
                  </span>
                  <div className="flex items-center gap-2 mt-1.5 w-full">
                    <div className="h-[1px] flex-grow bg-[#D9A036]/30" />
                    <span className="text-[7px] md:text-[8px] tracking-[0.4em] text-[#8B7355] uppercase font-sans font-black whitespace-nowrap">
                      Pure Nutrition
                    </span>
                    <div className="h-[1px] flex-grow bg-[#D9A036]/30" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="px-6 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#1C3B24]/80 relative group transition-all"
              >
                <span className="relative z-10 transition-colors duration-400 group-hover:text-[#1C3B24]">{link.name}</span>
                
                {/* Hover Underline - Elegant & Minimal */}
                <span className="absolute bottom-1.5 left-1/2 w-0 h-[1.5px] bg-[#D9A036]/40 transition-all duration-500 -translate-x-1/2 group-hover:w-[30%]" />
                
                {location.pathname === link.path && (
                  <div className="absolute inset-0 flex flex-col items-center justify-end h-full">
                    {/* Background Tint */}
                    <motion.span 
                      layoutId="luxuryNavBg"
                      className="absolute inset-0 bg-[#D9A036]/[0.05] rounded-sm -z-0"
                      transition={{ type: 'spring', damping: 30, stiffness: 180 }}
                    />
                    
                    {/* Premium Animated Indicator */}
                    <div className="relative w-full h-[6px] mb-[-2px] flex flex-col items-center justify-center overflow-visible">
                      <motion.div 
                        layoutId="luxuryNavLine"
                        className="w-[50%] h-[2px] bg-[#D9A036] rounded-full relative"
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                      >
                        {/* Diamond Accent */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] bg-[#D9A036] rotate-45 shadow-[0_0_8px_rgba(217,160,54,0.6)]" />
                      </motion.div>
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* Action Icons Bar */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 relative z-[110]">
            <motion.button 
              whileHover={{ scale: 1.1, color: '#D9A036' }}
              whileTap={{ scale: 0.95 }}
              className="text-[#1C3B24] p-1.5 transition-colors hidden xs:block"
            >
              <Search size={20} strokeWidth={2} />
            </motion.button>
            
            <Link to="/wishlist" className="relative group hidden xs:block">
              <motion.div
                whileHover={{ scale: 1.1, color: '#D9A036' }}
                whileTap={{ scale: 0.95 }}
              className="text-[#1C3B24] p-1.5 transition-colors"
              >
                <Heart size={20} strokeWidth={2} />
              </motion.div>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#D9A036] text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-[#FDF6E9] shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/account" className="hidden xs:block">
              <motion.div
                whileHover={{ scale: 1.1, color: '#D9A036' }}
                whileTap={{ scale: 0.95 }}
              className="text-[#1C3B24] p-1.5 transition-colors"
              >
                <User size={20} strokeWidth={2} />
              </motion.div>
            </Link>
            
            <Link to="/cart" className="relative group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="text-white p-2.5 bg-[#1C3B24] border-2 border-[#5C4033] shadow-[3px_3px_0px_0px_rgba(217,160,54,0.3)] transition-all hover:bg-[#D9A036] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(28,59,36,0.3)] flex items-center justify-center"
              >
                <ShoppingBag size={16} strokeWidth={2} />
              </motion.div>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D4B27A] text-white text-[9px] font-black w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-[#FDF6E9] shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Premium Mobile Trigger */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="lg:hidden text-[#1C3B24] p-1.5 ml-1 border-2 border-[#1C3B24]/10 rounded-lg bg-[#1C3B24]/5"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={22} strokeWidth={2} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Exhibition-Style Luxury Mobile Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#FDF6E9] z-[200] flex flex-col justify-between lg:hidden overflow-y-auto"
          >
            {/* Embedded Micro-Grid Pattern for Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1C3B24_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

            {/* Dedicated Top Bar inside Overlay - Compact height */}
            <div className="w-full px-6 sm:px-10 h-[80px] flex items-center justify-between border-b border-[#1C3B24]/5 relative z-20 bg-[#FDF6E9]">
              <div className="flex items-center gap-3 select-none">
                <img 
                  src="/img/logo.png" 
                  alt="Indian food way" 
                  className="h-10 w-auto object-contain"
                />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-sm font-serif font-black text-[#1C3B24] tracking-tight">
                    Indian food way
                  </span>
                  <span className="text-[7px] tracking-[0.3em] text-[#8B7355] uppercase font-sans mt-0.5 font-bold">
                    Pure Nutrition
                  </span>
                </div>
              </div>
              
              {/* Refined Fixed Close Action */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white w-10 h-10 rounded-full bg-[#1C3B24] flex items-center justify-center shadow-md active:bg-[#D9A036] transition-colors"
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={2} />
              </motion.button>
            </div>

            {/* Navigation List Container - Compacted gaps */}
            <div className="flex flex-col gap-4 px-8 sm:px-12 pt-10 pb-6 relative z-10">
              <p className="text-[9px] font-black tracking-[0.5em] uppercase text-[#D9A036] mb-1 flex items-center gap-3">
                <span className="w-6 h-[1px] bg-[#D9A036]/30" />
                Index
              </p>
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  custom={idx}
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link 
                    to={link.path}
                    className="text-2xl sm:text-4xl font-serif font-bold text-[#1C3B24] flex items-center justify-between group border-b border-[#1C3B24]/10 pb-4 hover:text-[#D9A036] transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowRight size={18} className="text-[#D9A036] opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Core Action Blocks & Contextual Footer */}
            <div className="px-8 sm:px-12 pb-8 pt-4 mt-auto relative z-10 w-full">
              <div className="grid grid-cols-2 gap-3 mb-8">
                <Link 
                  to="/account" 
                  className="py-3 text-center bg-[#1C3B24] text-white text-[10px] font-bold uppercase tracking-[0.25em] shadow-[3px_3px_0px_0px_rgba(217,160,54,0.3)] active:translate-y-1 active:shadow-none transition-all"
                >
                  My Profile
                </Link>
                <Link 
                  to="/contact" 
                  className="py-3 text-center border-2 border-[#1C3B24] text-[#1C3B24] text-[10px] font-bold uppercase tracking-[0.25em] active:bg-[#1C3B24]/5 transition-all"
                >
                  Assistance
                </Link>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center text-[#1C3B24]/40 text-[10px] font-bold tracking-[0.3em] font-sans uppercase pt-6 border-t border-[#1C3B24]/10 text-center sm:text-left">
                <span>© 2026 NATIVA INTERNATIONAL</span>
                <div className="flex gap-4 text-[#D9A036]/60 items-center">
                  <Leaf size={14} />
                  <span className="text-[9px]">EST. 2026</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;