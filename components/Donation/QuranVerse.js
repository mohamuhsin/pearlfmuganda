// components/QuranVerse.js
import { motion } from "framer-motion";

export default function QuranVerse() {
    return (
        <motion.blockquote
            className="bg-white/10 p-6 rounded-lg text-lg font-medium italic text-white border-l-4 border-[#fec76f] backdrop-blur-md shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
        >
            “Whoever feeds a fasting person in Ramadan will have a reward like
            theirs.” – [Hadith]
        </motion.blockquote>
    );
}
