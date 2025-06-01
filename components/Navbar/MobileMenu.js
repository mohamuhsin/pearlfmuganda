"use client";

import ContactInfo from "./ContactInfo";

export default function MobileMenu() {
    return (
        <aside
            aria-label="Mobile menu"
            className="fixed top-16 left-0 w-full bg-[#030269] text-white flex flex-col items-start md:items-center py-4 shadow-md md:hidden transition-transform duration-300 ease-in-out px-6 z-50"
        // Using fixed for better behavior on mobile (sticks on scroll)
        // and transition-transform for better GPU performance
        >
            <ContactInfo />
        </aside>
    );
}
