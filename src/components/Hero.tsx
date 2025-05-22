// components/Hero.tsx
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const images: string[] = [
  "/images/slider1.JPG",
  "/images/slider2.jpg",
  "/images/slider3.jpg",
  "/images/slider4.jpg",
  "/images/slider5.jpg",
  "/images/slider6.jpg",
  "/images/slider7.jpg",
  "/images/slider8.JPG",
];

import Divider from "@/components/Divider";
import Countdown from "@/components/Countdown";
const Hero: FC = () => {
  return (
    <section className="relative h-screen">
      <Swiper
        spaceBetween={30}
        allowTouchMove={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Autoplay]}
        effect="fade"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-screen w-full">
              {/* Background image layer */}
              <div
                className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${src})` }}
              />

              {/* Overlay (optional dark layer for text readability) */}
              <div className="absolute inset-0 bg-[#C08081]/50" />

              {/* Centered content */}
              <div className="relative z-10 flex flex-col h-full items-center justify-center text-white text-center px-4">
                <Divider position="top" />

                <div className="flex flex-wrap items-end justify-center gap-x-4 gap-y-2 mt-5 mb-5">
                  <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-2 sm:mb-4">
                    Ronnel
                  </span>
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl self-center mx-4 mb-0">
                    &
                  </span>
                  <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-2 sm:mb-4">
                    Junna
                  </span>
                </div>
                <Divider position="bottom" />

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mt-4 sm:mt-6 mb-4 sm:mb-6">
                  Are getting married in
                </p>
                <Countdown targetDate="2025-08-08T16:00:00" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
