"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaHome } from "react-icons/fa";
import { LiveButton } from "./LiveButton";

const contacts = [
    { href: "/", icon: FaHome, label: "Home", type: "internal" },
    {
        href: "tel:0200926711",
        icon: FaPhoneAlt,
        label: "0200 926 711",
        type: "external",
    },
    {
        href: "mailto:info@pearlfmuganda.com",
        icon: FaEnvelope,
        label: "info@pearlfmuganda.com",
        type: "external",
    },
    {
        href: "tel:0759107900",
        icon: FaPhoneAlt,
        label: "Studio Line: 0759 107 900",
        type: "external",
    },
];

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (index) => ({
        opacity: 1,
        y: 0,
        transition: { delay: index * 0.2, duration: 0.4, ease: "easeOut" },
    }),
};

export default function ContactInfo() {
    return (
        <motion.nav
            aria-label="Contact Information"
            initial="hidden"
            animate="visible"
            className="flex flex-wrap md:flex-nowrap w-full items-start md:items-center justify-start md:justify-center gap-y-2 md:gap-x-10 text-[10px] md:text-xs lg:text-sm px-6 py-4 min-w-0"
        >
            {contacts.map(({ href, icon: Icon, label, type }, index) => {
                const commonClasses =
                    "flex items-center gap-3 text-white hover:text-[#ff7e1c] transition duration-300";

                const iconWrapperClasses =
                    "w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#030269] hover:bg-[#ff7e1c] hover:text-white transition duration-300 text-[16px]";

                return (
                    <motion.div
                        key={label} // Use label as key for better stability if unique
                        custom={index}
                        variants={itemVariants}
                        className="w-full md:w-auto shrink-0"
                    >
                        {type === "internal" ? (
                            <Link
                                href={href}
                                aria-label={`Go to ${label}`}
                                className={commonClasses}
                            >
                                <div className={iconWrapperClasses}>
                                    <Icon aria-hidden="true" />
                                </div>
                                <span className="text-[14px] md:text-xs lg:text-sm font-bold">
                                    {label}
                                </span>
                            </Link>
                        ) : (
                            <a
                                href={href}
                                className={commonClasses}
                                aria-label={`Call or email ${label}`}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel={
                                    href.startsWith("http") ? "noopener noreferrer" : undefined
                                }
                            >
                                <div className={iconWrapperClasses}>
                                    <Icon aria-hidden="true" />
                                </div>
                                <span className="text-[14px] md:text-xs lg:text-sm font-bold">
                                    {label}
                                </span>
                            </a>
                        )}
                    </motion.div>
                );
            })}

            <motion.div
                custom={contacts.length}
                variants={itemVariants}
                className="w-full md:w-auto shrink-0"
            >
                <LiveButton />
            </motion.div>
        </motion.nav>
    );
}
