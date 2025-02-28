// components/Statement.js
import { motion } from "framer-motion";

export default function Statement() {
    return (
        <motion.p
            className="text-lg text-gray-300 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            Support prisoners in Kiggo, Uganda with an Iftar meal this Ramadan.
        </motion.p>
    );
}
