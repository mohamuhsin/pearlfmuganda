// components/SocialIcon.jsx
import Link from "next/link";

export default function SocialIcon({ href, icon, label, color }) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-white text-3xl sm:text-4xl md:text-5xl transition-transform duration-300 transform hover:scale-125 ${color} drop-shadow-md hover:drop-shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white`}
            aria-label={label}
        >
            {icon}
        </Link>
    );
}
