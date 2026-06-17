import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Leaf
} from 'lucide-react';

// Heritage-style floral accent item updated to match our exact theme colors
const DividerFlower = () => (
  <div className="flex items-center justify-center gap-1 text-[#976E2A] opacity-80">
    <Leaf size={10} className="rotate-[-30deg] fill-current" />
    <Leaf size={12} className="fill-current -translate-y-0.5" />
    <Leaf size={10} className="rotate-[30deg] scale-x-[-1] fill-current" />
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { name: 'Heritage Shop', path: '/shop' },
      { name: 'Our Vedic Roots', path: '/about' },
      { name: 'The Sattu Ritual', path: '/benefits' },
      { name: 'Gifting Studio', path: '/shop' },
    ],
    essential: [
      { name: 'My Account', path: '/account' },
      { name: 'Track Order', path: '/account' },
      { name: 'Care & Support', path: '/contact' },
      { name: 'Store Locator', path: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
      { name: 'Shipping Policy', path: '#' },
      { name: 'Refund Policy', path: '#' },
    ]
  };

  return (
    <footer className="relative bg-[#FAF4E3] text-[#6b4f3a] pt-16 pb-8 overflow-hidden font-poppins border-t border-[#E3DBC5] selection:bg-[#976E2A] selection:text-white">

      {/* --- BACKGROUND ORNAMENTATION --- */}
      {/* Large Muted Watermark Text */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[14vw] font-poppins font-bold text-[#6b4f3a]/[0.02] whitespace-nowrap pointer-events-none select-none tracking-tight uppercase z-0">
        NATURAL ENERGY
      </div>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6-grain.png')] z-0 mix-blend-multiply" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* --- MAIN NAVIGATION GRID SECTION --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-y-12 pb-16">

          {/* Brand Pillar Column */}
          <div className="col-span-2 lg:col-span-4 flex flex-col gap-5">
            <Link to="/" className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3">
                <img src="/img/logo.png" alt="Logo" className="h-9 w-auto contrast-125" />
                <span className="text-xl font-poppins font-bold tracking-tight text-[#6b4f3a] uppercase">
                  Indian Food Way
                </span>
              </div>
              <span className="text-[10px] text-[#976E2A] font-poppins font-bold tracking-[0.35em] uppercase">
                Nutrition • Est. 2024
              </span>
            </Link>

            <p className="text-xs text-[#605948] leading-relaxed max-w-xs italic font-medium">
              "Crafted with reverence to authentic Vedic structures. Operating at the intersection of raw purity and biological refinement."
            </p>

            {/* Social Links Package */}
            <div className="flex gap-3 pt-2">
              {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-[#E3DBC5] bg-[#FFFDF6] flex items-center justify-center text-[#6b4f3a]/70 hover:bg-[#6b4f3a] hover:text-[#FAF4E3] hover:border-[#6b4f3a] transition-all duration-400 shadow-sm"
                >
                  <Icon size={14} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Boutique Navigation Links */}
          <div className="col-span-1 lg:col-span-2 lg:col-start-6">
            <h4 className="text-[10px] font-poppins font-bold uppercase tracking-[0.25em] text-[#976E2A] mb-6">
              The Boutique
            </h4>
            <ul className="flex flex-col gap-3.5">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-xs font-poppins font-semibold text-[#605948] hover:text-[#976E2A] transition-colors flex items-center group">
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 opacity-70">▹</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Essentials Navigation Links */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-[10px] font-poppins font-bold uppercase tracking-[0.25em] text-[#976E2A] mb-6">
              Essential
            </h4>
            <ul className="flex flex-col gap-3.5">
              {footerLinks.essential.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-xs font-poppins font-semibold text-[#605948] hover:text-[#976E2A] transition-colors flex items-center group">
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 opacity-70">▹</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact Metadata Column */}
          <div className="col-span-2 md:col-span-1 lg:col-span-3">
            <h4 className="text-[10px] font-poppins font-bold uppercase tracking-[0.25em] text-[#976E2A] mb-6">
              Connect With Us
            </h4>
            <div className="flex flex-col gap-4">

              <a href="tel:+919876543210" className="group flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FFFDF6] flex items-center justify-center border border-[#E3DBC5] group-hover:bg-[#976E2A]/10 group-hover:border-[#976E2A]/40">
                  <Phone size={13} className="text-[#976E2A]" />
                </div>
                <span className="text-xs font-poppins font-semibold text-[#605948] group-hover:text-[#6b4f3a] transition-colors">
                  +91 98765 43210
                </span>
              </a>

              <a href="mailto:care@indianfoodway.com" className="group flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FFFDF6] flex items-center justify-center border border-[#E3DBC5] group-hover:bg-[#976E2A]/10 group-hover:border-[#976E2A]/40">
                  <Mail size={13} className="text-[#976E2A]" />
                </div>
                <span className="text-xs font-poppins font-semibold text-[#605948] group-hover:text-[#6b4f3a] transition-colors">
                  care@indianfoodway.com
                </span>
              </a>

              <div className="group flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FFFDF6] flex items-center justify-center border border-[#E3DBC5]">
                  <MapPin size={13} className="text-[#976E2A]" />
                </div>
                <span className="text-xs font-poppins font-medium text-[#605948]/80 leading-relaxed">
                  Flagship Studio, Gaya, Bihar <br /> Republic of India
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* --- BOTTOM ROW SECTION: LEGAL MATRIX & COPYRIGHT --- */}
        <div className="pt-8 border-t border-[#E3DBC5] flex flex-col lg:flex-row justify-between items-center gap-6">

          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-10 order-2 lg:order-1">
            <p className="text-[#605948]/60 text-[10px] font-poppins font-bold uppercase tracking-widest whitespace-nowrap">
              © {currentYear} Indian Food Way
            </p>
            <div className="flex flex-wrap justify-center gap-5 text-[10px] text-[#605948]/70 font-poppins font-bold uppercase tracking-widest">
              {footerLinks.legal.map(link => (
                <a key={link.name} href={link.path} className="hover:text-[#976E2A] transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Clean Muted Payment Gateways */}
          <div className="flex items-center gap-5 opacity-40 hover:opacity-80 transition-opacity duration-500 order-1 lg:order-2 mix-blend-multiply">
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-3.5" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="VISA" className="h-2.5" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Rupay-Logo.svg" alt="RuPay" className="h-3.5" />
          </div>

          {/* Smooth Scroll Anchor Trigger */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex flex-col items-center gap-1.5 order-3"
          >
            <div className="w-9 h-9 rounded-full border border-[#E3DBC5] bg-[#FFFDF6] flex items-center justify-center text-[#976E2A] group-hover:bg-[#6b4f3a] group-hover:border-[#6b4f3a] group-hover:text-[#FAF4E3] transition-all duration-400 shadow-sm">
              <ArrowUpRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform duration-400" />
            </div>
            <span className="text-[9px] font-poppins font-bold uppercase tracking-[0.25em] text-[#605948]/50 group-hover:text-[#976E2A] transition-colors">
              Return to Zenith
            </span>
          </button>

        </div>

        {/* Center Base Accent Icon Wrap */}
        <div className="mt-8 pt-2">
          <DividerFlower />
        </div>

      </div>
    </footer>
  );
};

export default Footer;
