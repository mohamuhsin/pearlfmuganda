"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade"; // Import Fade Effect

import Image from "next/image";

const slides = [
    { src: "/hero.jpg", alt: "Community Event", title: "" },
    { src: "/hero2.jpg", alt: "Charity Drive", title: "" },
    { src: "/hero3.jpg", alt: "Dawa Session", title: "" },
    { src: "/hero4.jpg", alt: "Dawa Session", title: "" },
];

export default function ImageSlider() {
    return (
        <Swiper
            modules={[Autoplay, EffectFade]}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }} // 3 seconds transition
            effect="fade" // Fade transition for a smooth effect
            speed={1000} // Smooth transition speed (1 second)
            className="w-full h-[100vh]" // Height set to 80% of the viewport height
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <div className="relative w-full h-full">
                        <Image
                            src={slide.src}
                            alt={slide.alt}
                            className="object-cover"
                            fill
                            priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute bottom-10 left-10 text-white text-2xl font-semibold drop-shadow-lg">
                            {slide.title}
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
