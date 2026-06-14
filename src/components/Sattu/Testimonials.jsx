import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Leaf } from 'lucide-react';

const testimonials = [
  {
    name: "Rohit Sharma",
    role: "Verified Buyer",
    text: "Perfect drink for summers! Keeps me full for long and gives natural energy.",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=400&h=400&auto=format&fit=crop"
  },
  {
    name: "Ananya Verma",
    role: "Verified Buyer",
    text: "Tastes amazing and super healthy. A must-have in my daily routine.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=400&auto=format&fit=crop"
  },
  {
    name: "Karan Patel",
    role: "Fitness Enthusiast",
    text: "Great source of protein. Much better than other protein shakes.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&auto=format&fit=crop"
  }
];

const Testimonials = () => {
  return (
    <section 
      className="py-24 bg-[#FDF8F1] text-[#2D241E] relative overflow-hidden"
      style={{ backgroundImage: "url('/img/parchment-bg.jpg')", backgroundSize: 'cover' }} // Aged parchment texture background
    >
      {/* Subtle organic fiber overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header with artisanal typography */}
        <div className="text-center mb-20 flex flex-col items-center">
          <span className="text-[#D9A036] font-sans font-bold tracking-widest text-sm uppercase mb-3 block">
            Real Reviews
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#2D241E] tracking-tight pb-4">
            Trusted by Thousands
          </h2>
          {/* Stamped rustic gold bar divider */}
          <div className="w-24 h-2 bg-[#D9A036] mt-1 border border-[#5C4033] rounded-sm shadow-inner opacity-80"></div>
        </div>

        {/* Testimonials Grid with heavy traditional frames */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 p-2">
          {testimonials.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -4, boxShadow: '12px 12px 0px 0px rgba(139,115,85,0.2)' }} // Physical depth shadow
              className="bg-[#FDF8F1] p-8 rounded-sm flex flex-col justify-between relative group transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(139,115,85,0.1)] border-[4px] border-[#5C4033] border-asymmetrical hover:border-[#D9A036]"
            >
              {/* Decorative Stamped Gold Quote Icon with weathering */}
              <div className="absolute top-6 right-8 text-[#D9A036]/70 transition-colors duration-300">
                <Quote size={40} strokeWidth={1} fill="currentColor" className="opacity-40 filter drop-shadow-[2px_2px_1px_rgba(92,64,51,0.3)]" />
              </div>

              <div>
                {/* Weathered Gold Star Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#D9A036] text-[#D9A036]/60" strokeWidth={1.2} />
                  ))}
                </div>
                
                {/* Testimonial Quote in prominent hand-lettered-style serif */}
                <p className="font-serif text-base md:text-lg leading-relaxed text-[#5C4033] italic mb-10 tracking-tight font-handcrafted">
                  "{item.text}"
                </p>
              </div>

              {/* User Bio Footer with sketch-style avatars */}
              <div className="flex items-center gap-4 pt-6 border-t border-[#D9D3C7]/40 mt-auto">
                {/* Avatar as a textured woodcut sketch portrait */}
                <div className="w-14 h-14 rounded-md overflow-hidden border-2 border-[#5C4033] p-1 bg-[#EFECE6] flex items-center justify-center sepia-sketch">
                  <img src={item.avatar} alt={item.name} className="w-full h-full object-cover rounded-sm grayscale-[30%] sepia-[15%]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#2D241E] tracking-tight">{item.name}</h4>
                  <p className="text-xs font-sans tracking-wide text-[#8B7355]">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Re-styled leaf patterns as watercolor sketches on parchment */}
      <div className="absolute -bottom-16 -left-16 opacity-10 rotate-45 hidden lg:block text-[#1C3B24] pointer-events-none filter sepia">
        <Leaf size={240} strokeWidth={1.2} />
      </div>
      <div className="absolute -top-16 -right-16 opacity-10 -rotate-12 hidden lg:block text-[#1C3B24] pointer-events-none filter sepia">
        <Leaf size={200} strokeWidth={1.2} />
      </div>

      {/* Embedded CSS for custom traditional features */}
      <style dangerouslySetInnerHTML={{__html: `
        .border-asymmetrical {
          border-top-left-radius: 4px;
          border-top-right-radius: 6px;
          border-bottom-right-radius: 2px;
          border-bottom-left-radius: 8px;
        }
        .sepia-sketch img {
          filter: grayscale(30%) sepia(15%);
        }
        .font-handcrafted {
          font-variation-settings: 'ital' 1, 'wght' 400;
        }
      `}} />
    </section>
  );
};

export default Testimonials;