"use client";

import ImageSlider from "./ImageSlider";
import HeroContent from "./HeroContent";
import Image from "next/image";

export default function HeroSection() {
    return (
        <div className="relative w-full h-[calc(100vh+100px)] overflow-hidden flex items-center justify-start mt-16">
            {/* Background Slider (Image Slider) */}
            <div className="absolute inset-0 -z-10">
                <ImageSlider />
            </div>

            {/* Hero Content Section - Overlay Content */}
            <div className="relative w-full h-full flex items-start justify-start px-4 sm:px-12">
                {/* Left Section: Hero Text and Cards */}
                <div className="w-full sm:w-2/3 flex flex-col items-start justify-center space-y-8 text-white">
                    {/* Hero Content will take more width and align left */}
                    <HeroContent />
                </div>
            </div>
        </div>
    );
}
