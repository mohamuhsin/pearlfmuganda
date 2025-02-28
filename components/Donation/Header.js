// components/Header.js
import { motion } from "framer-motion";

export default function Header() {
    return (
        <motion.h1
            className="text-4xl md:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            Help Provide Iftar for Prisoners
        </motion.h1>
    );
}
