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
        icon: <FaCreditCard size={40} />,
        link: "/services",
    },
    {
        title: "Dawah",
        icon: <FaPlayCircle size={40} />, // play icon for videos
        link: "/dawah",
    },
    {
        title: "Charity",
        icon: <FaHandHoldingHeart size={40} />,
        link: "/sadaqah",
    },
    {
        title: "Halal Business",
        icon: <FaStoreAlt size={40} />,
        link: "/halal-business",
    },
    { title: "Events", icon: <FaCalendarAlt size={40} />, link: "/events" },
    {
        title: "Ekkula Awards",
        icon: <FaTrophy size={40} />,
        link: "/awards",
    },
];

export default function HeroContent() {
    return (
        <div className="flex flex-col items-start justify-start text-left mt-16 mb-16 sm:mt-24 sm:mb-20 px-6 sm:px-8 overflow-hidden">
            {/* Hero Text */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 sm:text-center md:text-left hidden sm:block">
                Ekkula Ly&apos;omuntu W&apos;abulijjo
            </h1>

            {/* Cards Section */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-6xl mx-auto">
                {cards.map((card, index) => (
                    <Link key={index} href={card.link} className="group">
                        <div className="flex flex-col items-center justify-center bg-white rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg p-4 space-y-4">
                            {/* Circular Icon with Outer Border and White Space */}
                            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white border-4 border-[#0c0076] mb-2 group-hover:border-[#ff7e1c]">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#0c0076] text-white group-hover:bg-[#ff7e1c] transition-all duration-300">
                                    {/* Icon with hover effect to change color */}
                                    <div className="group-hover:text-white transition-all duration-300">
                                        {card.icon}
                                    </div>
                                </div>
                            </div>
                            {/* Card Title (Centered with Dark Text) */}
                            <span className="text-black font-semibold text-lg text-center whitespace-nowrap overflow-hidden text-ellipsis">
                                {card.title}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
