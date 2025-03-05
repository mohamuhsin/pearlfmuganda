// components/Quote.js
import { motion } from "framer-motion";

export default function Quote() {
    return (
        <motion.blockquote
            className="bg-white/10 p-6 rounded-lg text-lg font-medium italic text-white border-l-4 border-[#dd0300] backdrop-blur-md shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
        >
            “Alone we can do so little; together we can do so much” – [Helen Keller]
        </motion.blockquote>
    );
}
