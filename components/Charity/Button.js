"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import PaymentModal from "../Modal/PaymentModal";

export default function DonationButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <motion.button
                className="relative bg-[#dd0300] text-[#ffffff] py-3 px-8 rounded-full text-2xl font-extrabold shadow-lg mt-8 transition-all"
                animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                        "0 0 10px rgba(252, 199, 111, 0.8)",
                        "0 0 20px rgba(252, 199, 111, 1)",
                        "0 0 10px rgba(252, 199, 111, 0.8)",
                    ],
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                whileHover={{
                    scale: 1.1,
                    backgroundColor: "#0c0076",
                    boxShadow: "0 0 25px rgba(12, 0, 118, 0.8)",
                }}
                onClick={() => setIsModalOpen(true)}
            >
                TAP AND PAY HERE
            </motion.button>
            {isModalOpen && <PaymentModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
}
