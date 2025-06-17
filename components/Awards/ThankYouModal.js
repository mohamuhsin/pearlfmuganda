"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ThankYouModal({
    isOpen,
    onClose,
    companyName,
    categoryName,
}) {
    const router = useRouter();
    const [shareError, setShareError] = useState(false);
    const modalRef = useRef();
    const closeBtnRef = useRef();

    const shareMessage = `I just voted for ${companyName} in the ${categoryName} category in the Pearl Fm Radio Awards, brought to us by Pearl FM Radio. click here 👉 https://pearlfmuganda.com/awards to vote for your favorite company!`;

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    // Redirect after 10 seconds
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
                router.push("/awards");
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose, router]);

    // Focus close button when modal opens
    useEffect(() => {
        if (isOpen && closeBtnRef.current) {
            closeBtnRef.current.focus();
        }
    }, [isOpen]);

    // Trap focus inside modal
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key !== "Tab") return;
            const focusableElements = modalRef.current.querySelectorAll(
                'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements.length === 0) return;

            const firstEl = focusableElements[0];
            const lastEl = focusableElements[focusableElements.length - 1];

            if (!e.shiftKey && document.activeElement === lastEl) {
                e.preventDefault();
                firstEl.focus();
            } else if (e.shiftKey && document.activeElement === firstEl) {
                e.preventDefault();
                lastEl.focus();
            }
        }
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    const handleShare = async () => {
        setShareError(false);
        if (!companyName || !categoryName) {
            alert("Missing company or category name. Cannot share.");
            return;
        }

        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Pearl Fm Radio Awards Vote",
                    text: shareMessage,
                    url: "https://pearlfmuganda.com/awards",
                });
            } catch (err) {
                console.error("Share failed:", err);
                setShareError(true);
                alert("Sharing failed. You can copy the message below instead.");
            }
        } else {
            alert(
                "Sharing not supported on this device. Try copying the message instead."
            );
        }
    };

    const handleCopy = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(shareMessage);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = shareMessage;
                textArea.style.position = "fixed";
                textArea.style.opacity = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
            }
        } catch (err) {
            console.error("Copy failed:", err);
            alert("Failed to copy. Please copy this manually:\n\n" + shareMessage);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="thank-you-title"
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 backdrop-blur-sm transition-all duration-300"
        >
            <div
                ref={modalRef}
                className="bg-white dark:bg-gray-900 w-full max-w-md sm:max-w-lg p-6 rounded-2xl shadow-2xl relative animate-fade-in dark:text-gray-200"
            >
                <button
                    ref={closeBtnRef}
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#ff7d1c] focus:ring-offset-2 rounded"
                    aria-label="Close modal"
                >
                    &times;
                </button>

                <h1
                    id="thank-you-title"
                    className="text-4xl font-extrabold text-center mb-2 text-gray-900 dark:text-gray-100"
                >
                    Vote Recorded!
                </h1>
                <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
                    Thank you for voting! Your vote has been recorded.
                </p>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6 text-center text-gray-800 dark:text-gray-200 text-sm font-medium break-words whitespace-pre-wrap">
                    I just voted for <strong>{companyName}</strong> in the{" "}
                    <strong>{categoryName}</strong> category in the{" "}
                    <a
                        href="https://pearlfmuganda.com/award"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ff7d1c] font-semibold underline hover:text-[#ff5900] focus:outline-none focus:ring-2 focus:ring-[#ff7d1c] rounded"
                    >
                        👉 Pearl Fm Radio Awards
                    </a>
                    , brought to you by Pearl FM Radio. Click the link above to vote to
                    your favorite company!
                </div>

                {shareError && (
                    <div className="mb-4 text-center text-red-600 font-semibold">
                        Sharing failed. Please copy the message below instead.
                    </div>
                )}

                <button
                    onClick={handleShare}
                    className="w-full bg-[#ff7d1c] text-white text-sm font-medium py-2 rounded-lg hover:scale-[1.02] transition mb-3 focus:outline-none focus:ring-2 focus:ring-[#ff7d1c]"
                >
                    Share with Others
                </button>

                <button
                    onClick={handleCopy}
                    className="w-full border border-[#ff7d1c] text-[#ff7d1c] text-sm font-medium py-2 rounded-lg hover:bg-[#ff7d1c]/10 transition focus:outline-none focus:ring-2 focus:ring-[#ff7d1c]"
                >
                    Copy Share Message
                </button>

                <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
                    You will be redirected shortly...
                </p>
            </div>
        </div>
    );
}
