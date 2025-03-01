"use client";

import ImageSlider from "./ImageSlider";
import HeroContent from "./HeroContent";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="relative w-full h-[calc(100vh+100px)] overflow-hidden flex items-center justify-between mt-16">
            {/* Background Slider (Image Slider) */}
            <div className="absolute inset-0 -z-10">
                <ImageSlider />
            </div>

            {/* Hero Content Section - Overlay Content */}
            <div className="relative w-full h-full flex items-center justify-between px-4 sm:px-8 md:px-12">
                {/* Left Section: Hero Text and Cards (Wider for better emphasis) */}
                <div className="w-full sm:w-3/5 flex flex-col items-start justify-center space-y-8 text-white">
                    <HeroContent />
                </div>

                {/* Right Section: Watch Live Image */}
                <div className="hidden sm:flex w-2/5 items-center justify-center">
                    <div className="relative">
                        <Link href="https://www.youtube.com/@pearlfmnews8016/videos">
                            <div className="relative">
                                <Image
                                    src="/watch-live.png"
                                    alt="Watch Live"
                                    width={250}
                                    height={250}
                                    className="rounded-full shadow-lg"
                                    priority
                                    layout="intrinsic"
                                />
                                {/* Circular Pulse Wave Effect */}
                                <div className="absolute inset-0 rounded-full animate-pulse-wave" />
                                <div className="absolute inset-0 rounded-full animate-pulse-wave delay-1000" />
                                <div className="absolute inset-0 rounded-full animate-pulse-wave delay-2000" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
