import Image from "next/image";
import { FaCopy } from "react-icons/fa";
import { useState } from "react";

export default function SendWave() {
    const [isCopied, setIsCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCopyNumber = () => {
        setIsLoading(true);
        navigator.clipboard.writeText("+256706746070").then(() => {
            setIsCopied(true);
            setIsLoading(false);
            setTimeout(() => setIsCopied(false), 3000); // Reset after 3 seconds
        });
    };

    return (
        <div className="text-center">
            {/* Container for image and text */}
            <div className="flex flex-col items-center mb-6">
                <Image
                    src="/sendwave.png"
                    alt="Pearl FM Uganda"
                    width={300}
                    height={300}
                    className="mb-4"
                    priority
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, 300px"
                    style={{ width: "auto", height: "auto" }} // Ensures aspect ratio is preserved
                />
                <p className="font-bold text-[#030269] text-lg sm:text-xl md:text-2xl">
                    Pearl FM Uganda
                </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-4 mt-4">
                <button
                    className={`bg-gray-300 text-[#030269] px-4 py-2 rounded-lg font-bold flex items-center hover:bg-gray-400 transition-colors duration-300 text-sm sm:text-base ${isLoading ? "cursor-not-allowed opacity-50" : ""
                        }`}
                    onClick={handleCopyNumber}
                    disabled={isLoading}
                >
                    <FaCopy className="mr-2" /> {isLoading ? "Copying..." : "Copy Number"}
                </button>
                <button
                    className="bg-[#fec76f] text-[#030269] px-6 py-2 rounded-lg font-bold hover:bg-[#e6b800] transition-colors duration-300 text-sm sm:text-base"
                    onClick={() => { }}
                >
                    Okay, No Problem
                </button>
            </div>

            {/* Toast Notification for Copy */}
            {isCopied && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-blue-600 text-white rounded-lg shadow-md">
                    <p className="font-semibold">Number copied to clipboard!</p>
                </div>
            )}
        </div>
    );
}
