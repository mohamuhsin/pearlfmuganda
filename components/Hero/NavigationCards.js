"use client";

import {
    FaHandHoldingHeart,
    FaCalendarAlt,
    FaCreditCard,
    FaStoreAlt,
    FaPlayCircle,
    FaTrophy,
} from "react-icons/fa";
import Link from "next/link";

const cards = [
    {
        title: "Pay a Service",
        icon: <FaCreditCard size={40} aria-hidden="true" />,
        link: "/services",
    },
    {
        title: "Dawah",
        icon: <FaPlayCircle size={40} aria-hidden="true" />,
        link: "/dawah",
    },
    {
        title: "Charity",
        icon: <FaHandHoldingHeart size={40} aria-hidden="true" />,
        link: "/sadaqah",
    },
    {
        title: "Halal Business",
        icon: <FaStoreAlt size={40} aria-hidden="true" />,
        link: "/halal-business",
    },
    {
        title: "Events",
        icon: <FaCalendarAlt size={40} aria-hidden="true" />,
        link: "/events",
    },
    {
        title: "Ekkula Awards",
        icon: <FaTrophy size={40} aria-hidden="true" />,
        link: "/awards",
    },
];

export default function HeroContent() {
    return (
        <>
            <section className="mt-16 mb-16 sm:mt-24 sm:mb-20 overflow-hidden">
                <div className="w-full max-w-6xl mx-auto px-6 sm:px-8">
                    <h1
                        id="hero-section-title"
                        className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight mb-10 sm:mb-14"
                    >
                        {/* Removed nowrap so it breaks naturally */}
                        Ekkula Ly&apos;omuntu W&apos;abulijjo -{" "}
                        <span className="text-[0.8em]">107.9 FM</span>
                    </h1>

                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
                        {cards.map(({ title, icon, link }, index) => (
                            <Link
                                key={index}
                                href={link}
                                className="group"
                                aria-label={`Navigate to ${title}`}
                            >
                                <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-4 hover:bg-gray-100 transition-all duration-300 min-h-[150px] card-wrapper">
                                    <div className="flex items-center justify-center w-20 h-20 rounded-full border-4 border-[#0c0076] group-hover:border-[#ff7e1c] transition-colors duration-300 bg-white icon-wrapper">
                                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#0c0076] text-white group-hover:bg-[#ff7e1c] transition-colors duration-300">
                                            {icon}
                                        </div>
                                    </div>

                                    <span className="text-black font-semibold text-lg text-center whitespace-nowrap overflow-hidden text-ellipsis mt-2 card-title">
                                        {title}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx>{`
        @media (max-width: 360px) {
          .icon-wrapper {
            width: 4.5rem !important;
            height: 4.5rem !important;
          }
          .icon-wrapper > div {
            width: 3.5rem !important;
            height: 3.5rem !important;
          }
          .card-wrapper {
            min-height: 120px !important;
            padding: 0.75rem !important;
          }
          .card-title {
            font-size: 0.875rem !important; /* text-sm */
          }

          #hero-section-title {
            font-size: 1.75rem !important; /* Slightly smaller than 3xl */
            line-height: 1.2 !important;
            text-align: left !important; /* Keep left aligned */
            white-space: normal !important; /* Allow wrapping */
            max-width: 320px; /* prevent full width so it breaks early */
            margin-left: auto;
            margin-right: auto;
          }

          #hero-section-title span {
            font-size: 0.7em !important; /* smaller subtext */
          }
        }
      `}</style>
        </>
    );
}
