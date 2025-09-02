import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Pocket from "../assets/images/poc.avif";
import iq from "../assets/images/opt.avif";
import quo from "../assets/images/tex.avif";
import { Autoplay } from "swiper/modules";

const brands = [
  { src: Pocket, alt: "Pocket Option" },
  { src: iq, alt: "IQ Option" },
  { src: quo, alt: "Quotex" },
  { src: Pocket, alt: "Pocket Option" },
  { src: quo, alt: "Quotex" },
];

export default function BrandCarousel() {
  return (
    <div className="w-full backdrop-blur-sm lg:mt-[90px] mt-10">
      <h2 className="text-center text-white text-lg font-medium mb-6">
        Trusted by Leading Brokers for Seamless Trading
      </h2>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 0,
            disableOnInteraction: false, 
         }}
         speed={3000}
         freeMode={true}
        spaceBetween={30}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {brands.map((brand, index) => (
          <SwiperSlide key={index}>
            <img
              src={brand.src}
              alt={brand.alt}
              className="h-16 w-auto object-contain m-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
