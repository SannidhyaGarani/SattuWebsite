import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Leaf, Instagram, Facebook, Twitter, Youtube, 
  ArrowUpRight, Phone, Mail, MapPin, ShieldCheck, 
  Globe2, Sparkles, MoveRight
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    collection: [
      { name: 'Shop All', path: '/shop' },
      { name: 'Our Story', path: '/about' },
      { name: 'The Benefits', path: '/benefits' },
      { name: 'Get In Touch', path: '/contact' },
    ],
    philosophy: [
      { name: 'About Us', path: '/about' },
      { name: 'Benefits', path: '/benefits' },
      { name: 'Contact', path: '/contact' },
    ],
    concierge: [
      { name: 'My Account', path: '/account' },
      { name: 'My Cart', path: '/cart' },
      { name: 'Wishlist', path: '/wishlist' },
    ]
  };

  return (
    <footer className="bg-[#F9F8F6] text-[#1C2B21] pt-32 pb-12 overflow-hidden border-t border-[#EAE6DF] font-sans selection:bg-[#1C3B24] selection:text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Top Tier: Epic Brand Statement & High-Conversion Luxury Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 pb-24 border-b border-[#EAE6DF]">
          
          <div className="lg:col-span-6 flex flex-col justify-between max-w-xl">
            <div>
              <div className="flex items-center gap-2 text-[#D9A036] mb-6">
                <Sparkles size={14} strokeWidth={1.5} />
                <span className="text-xs font-bold uppercase tracking-[0.3em]">The New Standard of Wellness</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light leading-[1.15] tracking-tight text-[#1C2B21]">
                Reviving India’s most potent <br />
                <span className="font-serif italic text-[#1C3B24]">ancient super-fuel</span> for the global avant-garde.
              </h2>
            </div>
            
            {/* Global Trust Anchor Badge */}
            <div className="hidden lg:flex items-center gap-8 mt-12 pt-8 border-t border-[#EAE6DF]/60">
              <div className="flex items-center gap-2.5 text-xs text-[#707A72]">
                <Globe2 size={15} strokeWidth={1.5} className="text-[#1C3B24]" />
                <span>Sourced Sustainably from Bihar</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#707A72]">
                <ShieldCheck size={15} strokeWidth={1.5} className="text-[#1C3B24]" />
                <span>Certified Bio-Available Nutrition</span>
              </div>
            </div>
          </div>

          {/* Luxury Newsletter Form Block */}
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-end">
            <p className="text-sm uppercase tracking-[0.2em] font-bold text-[#1C2B21] mb-2">The Inner Circle</p>
            <p className="text-sm text-[#5C665E] mb-8 leading-relaxed font-light">
              Join our private dispatch list. Receive masterclass recipes, clinical health reports, and priority allocations of seasonal micro-batches.
            </p>
            
            <form onSubmit={(e) => e.preventDefault()} className="group relative">
              <div className="flex items-center border-b-2 border-[#1C2B21]/10 group-focus-within:border-[#1C3B24] transition-colors duration-500 pb-3">
                <input 
                  type="email" 
                  placeholder="Enter your luxury or corporate email address" 
                  className="w-full bg-transparent text-sm font-light focus:outline-none placeholder:text-[#9A8F80] tracking-wide py-1 text-[#1C2B21]"
                />
                <button type="submit" className="text-[#1C3B24] p-2 hover:translate-x-2 transition-transform duration-500">
                  <MoveRight size={18} strokeWidth={1.5} />
                </button>
              </div>
              {/* Animated Bottom Focus Line Accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#1C3B24] group-focus-within:w-full transition-all duration-700 ease-out" />
            </form>
            <p className="text-xs text-[#9A8F80] mt-3 font-light">By clicking access, you accept our premium privacy terms.</p>
          </div>
        </div>

        {/* Middle Tier: Generous Multi-Column Editorial Index Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-x-8 gap-y-16 pt-24 pb-24">
          
          {/* Flagship Brand Pillar */}
          <div className="col-span-2 lg:col-span-4 flex flex-col gap-6 pr-0 lg:pr-12">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1C3B24] rounded-xl flex items-center justify-center shadow-lg shadow-[#1C3B24]/10">
                <Leaf className="text-[#EAE6DF] w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold tracking-tight text-[#1C2B21]">SATTU</span>
                <span className="text-xs tracking-[0.3em] font-bold text-[#D9A036] uppercase -mt-1">
                  Maison de la Santé
                </span>
              </div>
            </Link>
            <p className="text-xs text-[#5C665E] leading-relaxed font-light mt-2">
              Our products are crafted with uncompromising reverence to authentic Vedic production structures. We operate at the intersection of raw purity and absolute modern biological refinement.
            </p>
            <div className="flex gap-5 mt-2">
              {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full border border-[#EAE6DF] flex items-center justify-center text-[#1C2B21] hover:bg-[#1C3B24] hover:text-[#F9F8F6] hover:border-[#1C3B24] transition-all duration-500">
                  <Icon size={13} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Tracks */}
          <div className="col-span-1 lg:col-span-2 lg:col-start-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A8F80] mb-6">The Collections</h4>
            <ul className="space-y-4">
              {footerLinks.collection.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm font-light text-[#5C665E] hover:text-[#1C3B24] transition-colors duration-300 block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A8F80] mb-6">The Philosophy</h4>
            <ul className="space-y-4">
              {footerLinks.philosophy.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm font-light text-[#5C665E] hover:text-[#1C3B24] transition-colors duration-300 block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A8F80] mb-6">Flagship Concierge</h4>
            <ul className="space-y-4 mb-6">
              {footerLinks.concierge.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm font-light text-[#5C665E] hover:text-[#1C3B24] transition-colors duration-300 block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Direct Editorial Contact Link */}
            <div className="pt-4 border-t border-[#EAE6DF] flex flex-col gap-2">
              <a href="tel:+919876543210" className="text-sm text-[#1C2B21] font-medium flex items-center gap-1.5 hover:text-[#D9A036] transition-colors">
                <span>+91 98765 43210</span>
                <ArrowUpRight size={14} className="opacity-40" />
              </a>
              <a href="mailto:concierge@sattudrink.com" className="text-sm text-[#1C2B21] font-medium flex items-center gap-1.5 hover:text-[#D9A036] transition-colors">
                <span>concierge@sattudrink.com</span>
                <ArrowUpRight size={14} className="opacity-40" />
              </a>
            </div>
          </div>

        </div>

        {/* Lower Massive Typography Display Row */}
       
        {/* Bottom Tier: Legal Matrix, Smooth Scroll Anchor, and Premium Payment Badges */}
        <div className="pt-8 border-t border-[#EAE6DF] flex flex-col lg:flex-row justify-between items-center gap-8">
          
          {/* Copyright/Legal link lineup */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 order-2 lg:order-1">
            <p className="text-[#9A8F80] text-sm font-light">
              © {currentYear} Sattu Drink Global Luxury Inc.
            </p>
            <div className="flex gap-4 text-xs text-[#707A72] font-light">
              <a href="#" className="hover:text-[#1C3B24] transition-colors">Privacy Charter</a>
              <span>·</span>
              <a href="#" className="hover:text-[#1C3B24] transition-colors">Terms of Luxury Service</a>
              <span>·</span>
              <a href="#" className="hover:text-[#1C3B24] transition-colors">Accessibility Matrix</a>
            </div>
          </div>
          
          {/* Ultra-clean Minimalist Gateway Logos */}
          <div className="flex items-center gap-8 opacity-30 hover:opacity-75 transition-opacity duration-500 order-1 lg:order-2">
             <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4 grayscale" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="VISA" className="h-3 grayscale" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 grayscale" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Rupay-Logo.svg" alt="RuPay" className="h-4 grayscale" />
          </div>

          {/* Luxury Floating Smooth Top Interactive Module */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-3 text-sm uppercase tracking-[0.2em] font-semibold text-[#1C2B21] hover:text-[#D9A036] transition-colors duration-300 order-3"
          >
            <span>Return to Zenith</span>
            <div className="w-8 h-8 rounded-full border border-[#EAE6DF] group-hover:bg-[#1C3B24] group-hover:border-[#1C3B24] flex items-center justify-center text-[#1C2B21] group-hover:text-white transition-all duration-500">
              <ArrowUpRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
            </div>
          </button>
          
        </div>

      </div>
    </footer>
  );
};

export default Footer;