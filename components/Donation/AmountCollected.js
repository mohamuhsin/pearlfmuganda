// components/AmountCollected.js
import { motion } from "framer-motion";

export default function AmountCollected({ amount }) {
    return (
        <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
        >
            <h2 className="text-3xl font-bold text-white mb-2">
                Amount Collected So Far
            </h2>
            <p className="text-5xl font-extrabold text-white">
                <span className="text-[#fec76f]">UGX</span> {amount}
            </p>
        </motion.div>
    );
}
