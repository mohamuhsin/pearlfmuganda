"use client";

import ImageSlider from "./ImageSlider";
import HeroContent from "./HeroContent";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section
            aria-label="Hero section with background slider and live watch button"
            className="relative w-full h-[calc(100vh+100px)] overflow-hidden flex items-center justify-between mt-16"
        >
            {/* Background Slider (ImageSlider behind content) */}
            <div className="absolute inset-0 -z-10">
                <ImageSlider />
            </div>

            {/* Overlay Hero Content */}
            <div className="relative flex w-full h-full items-center justify-between px-4 sm:px-8 md:px-12">
                {/* Left Content: Text & Cards */}
                <div className="w-full sm:w-3/5 flex flex-col items-start justify-center space-y-8 text-white max-w-5xl">
                    <HeroContent />
                </div>

                {/* Right Content: Watch Live Button & Image */}
                <div className="hidden sm:flex w-2/5 items-center justify-center">
                    <Link
                        href="https://www.youtube.com/@pearlfmnews8016/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Watch Pearl FM live on YouTube"
                        className="relative"
                    >
                        <Image
                            src="/watch-live.png"
                            alt="Watch Live"
                            width={250}
                            height={250}
                            className="rounded-full shadow-lg"
                            priority
                        />
                        {/* Circular Pulse Wave Effects */}
                        <span
                            className="absolute inset-0 rounded-full animate-pulse-wave"
                            aria-hidden="true"
                        />
                        <span
                            className="absolute inset-0 rounded-full animate-pulse-wave delay-1000"
                            aria-hidden="true"
                        />
                        <span
                            className="absolute inset-0 rounded-full animate-pulse-wave delay-2000"
                            aria-hidden="true"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}
