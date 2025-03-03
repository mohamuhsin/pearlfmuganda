"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import Logo from "./Logo";
import ContactInfo from "./ContactInfo";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 z-50 w-full flex transition-all duration-300 text-xs md:text-sm lg:text-base h-16 shadow-lg">
            {/* Left Section - Logo with White Background */}
            <div className="w-1/2 md:w-1/5 lg:w-1/6 flex items-center justify-center h-16 bg-white">
                <Logo />
            </div>

            {/* Right Section - Contact Info & Menu Button */}
            <div className="w-1/2 md:w-4/5 lg:w-5/6 flex justify-center md:justify-between items-center px-4 h-16 bg-[#030269] text-white relative">
                {/* Desktop Contact Info */}
                <div className="hidden md:flex max-w-7xl xl:max-w-[90%] 2xl:max-w-[85%]">
                    <ContactInfo />
                </div>

                {/* Mobile Menu Button - Centered in its section */}
                <button
                    className="md:hidden w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#030269] text-2xl hover:bg-[#ff7e1c] transition duration-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu (conditionally rendered) */}
            {isMenuOpen && <MobileMenu />}
        </nav>
    );
}
