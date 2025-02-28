"use client";

import ImageSlider from "./ImageSlider";

export default function HeroSection() {
    return (
        <div className="relative w-full h-screen overflow-hidden flex items-center justify-center mt-16">
            {/* Background Slider (Set behind) */}
            <div className="absolute inset-0 -z-10">
                <ImageSlider />
            </div>
        </div>
    );
}
