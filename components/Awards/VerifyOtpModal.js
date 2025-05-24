"use client";

import { useState, useRef, useEffect } from "react";

export default function VerifyOtpModal({ isOpen, onClose, voteId }) {
    const [otpCode, setOtpCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [error, setError] = useState(null);
    const [timer, setTimer] = useState(60);
    const modalRef = useRef();

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

    useEffect(() => {
        let interval;
        if (isOpen && timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isOpen, timer]);

    const handleVerify = async () => {
        if (!otpCode || !voteId) {
            setError("Missing OTP or vote ID.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/verify_otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ voteId, otpCode }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "OTP verification failed.");
            } else {
                alert("OTP verified! Your vote has been recorded.");
                onClose();
            }
        } catch {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setError(null);
        setResendLoading(true);

        try {
            const res = await fetch("/api/resend_otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ voteId }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to resend OTP.");
            } else {
                setTimer(60);
            }
        } catch {
            setError("An error occurred. Please try again.");
        } finally {
            setResendLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 backdrop-blur-sm transition-all duration-300">
            <div
                ref={modalRef}
                className="bg-white w-full max-w-md sm:max-w-lg p-6 rounded-2xl shadow-2xl relative animate-fade-in"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl transition hover:scale-110"
                    aria-label="Close modal"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Verify OTP
                </h2>

                <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                        Enter OTP
                    </label>
                    <input
                        type="text"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="Enter the OTP sent to your phone"
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#ff7d1c] transition duration-150"
                    />
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <button
                    onClick={handleVerify}
                    disabled={loading}
                    className="w-full bg-[#ff7d1c] text-white text-sm font-medium py-2 rounded-lg hover:scale-[1.02] transition mb-3"
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <div className="text-center text-sm text-gray-600">
                    {timer > 0 ? (
                        <span>Resend OTP in {timer}s</span>
                    ) : (
                        <button
                            onClick={handleResendOtp}
                            disabled={resendLoading}
                            className="text-[#ff7d1c] font-semibold hover:underline"
                        >
                            {resendLoading ? "Resending..." : "Resend OTP"}
                        </button>
                    )}
                </div>

                <footer className="text-xs text-gray-400 mt-6 text-center">
                    Powered by{" "}
                    <a
                        href="https://iventics.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        Iventics Technologies
                    </a>
                </footer>
            </div>
        </div>
    );
}
