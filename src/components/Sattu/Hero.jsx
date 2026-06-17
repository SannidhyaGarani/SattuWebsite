import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const Hero = () => {
  const videos = [
    "/img/sattuvideo1.mp4",
    "/img/sattuvideo2.mp4",
  ];

  return (
    <section className="relative h-[65vh] sm:h-[80vh] lg:h-[calc(100vh-120px)] w-full overflow-hidden bg-[#fff] mt-[80px] md:mt-28 ">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={2000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
        loop={true}
        className="h-full w-full"
      >
        {videos.map((video, index) => (
          <SwiperSlide key={index} className="relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              >
                <source src={video} type="video/mp4" />
              </video>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-pagination {
          bottom: 20px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: auto !important;
          display: flex;
          gap: 10px;
        }
        @media (min-width: 768px) {
          .swiper-pagination {
            bottom: 40px !important;
            gap: 15px;
          }
        }
        .custom-bullet {
          width: 30px !important;
          height: 3px !important;
          background: rgba(253, 251, 247, 0.3) !important;
          border-radius: 0 !important;
          opacity: 1 !important;
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          border: none !important;
          cursor: pointer;
        }
        @media (min-width: 768px) {
          .custom-bullet {
            width: 50px !important;
          }
        }
        .swiper-pagination-bullet-active {
          background: #D4B27A !important;
          width: 60px !important;
        }
        @media (min-width: 768px) {
          .swiper-pagination-bullet-active {
            width: 100px !important;
          }
        }
      `}} />
    </section>
  );
};

export default Hero;
