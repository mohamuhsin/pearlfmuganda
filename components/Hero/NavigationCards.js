// components/HeroSection/HeroContent.js
"use client";

import {
    FaHandHoldingHeart,
    FaPrayingHands,
    FaCalendarAlt,
    FaBriefcase,
} from "react-icons/fa";
import Link from "next/link";

const cards = [
    { title: "Services", icon: <FaBriefcase size={32} />, link: "/services" },
    { title: "Events", icon: <FaCalendarAlt size={32} />, link: "/events" },
    { title: "Dawa", icon: <FaPrayingHands size={32} />, link: "/dawa" },
    {
        title: "Charity",
        icon: <FaHandHoldingHeart size={32} />,
        link: "/charity",
    },
];

export default function HeroContent() {
    return (
        <div className="max-w-xl space-y-8">
            {/* Hero Text */}
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                Empowering Communities, <br /> One Step at a Time.
            </h1>

            {/* Cards Section */}
            <div className="grid grid-cols-2 gap-6">
                {cards.map((card, index) => (
                    <Link key={index} href={card.link} className="group">
                        <div className="flex flex-col items-center text-center space-y-4 p-4 rounded-2xl bg-white/20 backdrop-blur-lg hover:scale-105 transition-transform duration-300">
                            {/* Circular Icon */}
                            <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-[#dd0300] to-[#0c0076] rounded-full shadow-lg">
                                {card.icon}
                            </div>
                            <span className="text-white font-semibold text-lg">
                                {card.title}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
