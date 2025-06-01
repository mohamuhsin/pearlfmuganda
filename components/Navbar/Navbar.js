"use client";

import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import ContactInfo from "./ContactInfo";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Optional: Close menu on ESC key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setIsMenuOpen(false);
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
            <nav className="flex h-16 text-xs md:text-sm lg:text-base transition-all duration-300">
                {/* Left: Logo */}
                <div className="w-1/2 md:w-1/5 lg:w-1/6 flex items-center justify-center bg-white">
                    <Logo />
                </div>

                {/* Right: Contact Info + Mobile Toggle */}
                <div className="w-1/2 md:w-4/5 lg:w-5/6 flex items-center justify-center md:justify-between bg-[#030269] text-white px-4 relative">
                    {/* Desktop: Contact Info */}
                    <div className="hidden md:flex w-full justify-end">
                        <ContactInfo />
                    </div>

                    {/* Mobile: Toggle Button */}
                    <button
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#030269] text-xl hover:bg-[#ff7e1c] hover:text-white transition absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                    >
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
        </header>
    );
}
