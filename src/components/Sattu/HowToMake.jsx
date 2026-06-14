import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Leaf } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

const steps = [
  {
    number: "01",
    title: "Add 2-3 tbsp Sattu Mix",
    subtitle: "Pure traditional roast",
    image: "img/ss.png"
  },
  {
    number: "02",
    title: "Add 200ml of water or milk",
    subtitle: "Chilled or room temp",
    image: "img/s11.png"
  },
  {
    number: "03",
    title: "Stir well until smooth",
    subtitle: "No lumps, perfect blend",
    image: "https://images.unsplash.com/photo-1556767576-5ec41e3239ea?q=80&w=400&auto=format&fit=crop"
  },
  {
    number: "04",
    title: "Enjoy your healthy Sattu Drink!",
    subtitle: "Real nutrition unlocked",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=400&auto=format&fit=crop"
  }
];

const HowToMake = () => {
  return (
    <section 
      className="py-24 relative overflow-hidden border-t-4 border-b-4 border-[#8B7355]/20 bg-cover bg-center"
      style={{ backgroundImage: "url('/img/b3.png')" }} // Preserve background image
    >
      {/* Subtle Premium Texture Overlay */}
      <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20 flex flex-col items-center">
          <span className="text-[#8B5A2B] font-sans font-bold tracking-widest text-sm uppercase mb-3 block sepia-[15%]">
              Simple Preparation
            </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#2D241E] tracking-tight relative pb-4">
            How to Make Sattu Drink
          </h2>
          <div className="w-16 h-[2px] bg-[#8B5A2B] mt-2 sepia-[15%]"></div>
        </div>

        {/* Desktop Grid Layout (Hidden on Mobile/Tablet) */}
        <div className="hidden lg:grid grid-cols-4 gap-8 relative">
          
          {/* Connecting Premium Line (Desktop only) */}
          <div className="absolute top-24 left-0 w-full h-[1px] hidden lg:block px-32">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full h-full border-b border-dashed border-[#5C4033]/20 origin-left"
            />
          </div>

          {/* Map through steps for Desktop */}
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
              className="relative flex flex-col items-center group w-full text-center transition-all duration-300"
            >
              {/* Image Frame Wrapper */}
              <div className="relative mb-6">
                
                {/* Traditional Heavy Ink-Print Style Frame */}
                <div className="relative w-48 h-60 aspect-[3/4] bg-[#E5D3B3] p-1.5 border-b-4 border-r-4 border-[#5C4033] transition-transform duration-500 group-hover:scale-105">
                  <div className="w-full h-full overflow-hidden relative">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover grayscale-[20%] sepia-[10%] transition-transform duration-700 group-hover:scale-110" 
                    />
                    {/* Darkening image tint filter */}
                    <div className="absolute inset-0 bg-amber-950/10 mix-blend-multiply"></div>
                  </div>
                </div>

                {/* Number Badge - Stamp style */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.15, type: "spring", stiffness: 120 }}
                  className="absolute -top-3 -left-3 w-10 h-10 bg-[#2D241E] text-[#E5D3B3] font-mono font-bold text-lg flex items-center justify-center border-2 border-[#5C4033] group-hover:bg-[#112517] transition-colors duration-300"
                >
                  {step.number}
                </motion.div>
              </div>
              
              {/* Text Meta */}
              <h3 className="font-serif text-lg font-bold text-[#2D241E] leading-snug mb-1 px-2 group-hover:text-[#1C3B24] transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#8B5A2B]">
                {step.subtitle}
              </p>

            </motion.div>
          ))}
        </div>

        {/* Mobile & Tablet Slider Layout */}
        <div className="block lg:hidden !-mr-6 md:!-mr-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1.2}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            breakpoints={{
              480: { slidesPerView: 1.5 },
              640: { slidesPerView: 2 },
            }}
            className="pb-12 premium-htw-swiper"
          >
            {/* Map through steps for Mobile/Tablet Slider */}
            {steps.map((step, index) => (
              <SwiperSlide key={step.number} className="h-full">
                <div className="relative flex flex-col items-center group w-full text-center transition-all duration-300">
                  {/* Image Frame Wrapper */}
                  <div className="relative mb-6">
                    
                    {/* Traditional Heavy Ink-Print Style Frame */}
                    <div className="relative w-48 h-60 aspect-[3/4] bg-[#E5D3B3] p-1.5 border-b-4 border-r-4 border-[#5C4033] transition-transform duration-500 group-hover:scale-105">
                      <div className="w-full h-full overflow-hidden relative">
                        <img 
                          src={step.image} 
                          alt={step.title} 
                          className="w-full h-full object-cover grayscale-[20%] sepia-[10%] transition-transform duration-700 group-hover:scale-110" 
                        />
                        {/* Darkening image tint filter */}
                        <div className="absolute inset-0 bg-amber-950/10 mix-blend-multiply"></div>
                      </div>
                    </div>

                    {/* Number Badge - Stamp style */}
                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-[#2D241E] text-[#E5D3B3] font-mono font-bold text-lg flex items-center justify-center border-2 border-[#5C4033] group-hover:bg-[#112517] transition-colors duration-300">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Text Meta */}
                  <h3 className="font-serif text-lg font-bold text-[#2D241E] leading-snug mb-1 px-2">
                    {step.title}
                  </h3>
                  <p className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#8B5A2B]">
                    {step.subtitle}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Embedded Swiper Custom Pagination Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .premium-htw-swiper .swiper-pagination-bullet {
          background: #5C4033 !important;
          opacity: 0.15;
          width: 5px;
          height: 5px;
        }
        .premium-htw-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #8B5A2B !important;
          width: 16px;
          border-radius: 4px;
        }
        .premium-htw-swiper .swiper-pagination {
          bottom: 0px !important;
          text-align: center !important;
        }
      `}} />

      {/* Decorative Traditional Assets */}
      <div className="absolute left-8 bottom-12 opacity-15 rotate-45 hidden lg:block text-[#1C3B24]">
        <Leaf size={56} strokeWidth={1.5} />
      </div>
      <div className="absolute right-12 top-1/3 opacity-15 -rotate-12 hidden lg:block text-[#1C3B24]">
        <Leaf size={44} strokeWidth={1.5} />
      </div>
    </section>
  );
};

export default HowToMake;