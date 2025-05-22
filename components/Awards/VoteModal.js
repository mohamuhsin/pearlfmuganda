"use client";

import { useEffect, useRef, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function VoteModal({ isOpen, onClose, category }) {
    const [phone, setPhone] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const modalRef = useRef();

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    const handleSubmit = async () => {
        if (!phone || !companyId) {
            setError("Phone number and company are required.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/request_otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone,
                    companyId,
                    categoryId: category._id,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to send OTP");
            } else {
                console.log("OTP sent, vote ID:", data.voteId);
            }
        } catch {
            setError("An error occurred. Try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !category) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 backdrop-blur-sm transition-all duration-300">
            <div
                ref={modalRef}
                className="bg-white w-full max-w-md sm:max-w-lg p-6 rounded-2xl shadow-2xl relative animate-fade-in"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl"
                    aria-label="Close modal"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Vote in {category.name}
                </h2>

                <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                        Select Company
                    </label>
                    <select
                        value={companyId}
                        onChange={(e) => setCompanyId(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#ff7d1c]"
                    >
                        <option value="">-- Select --</option>
                        {category.companies?.map((company) => (
                            <option key={company._id} value={company._id}>
                                {company.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                        Phone Number
                    </label>
                    <PhoneInput
                        value={phone}
                        onChange={setPhone}
                        defaultCountry="UG"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#ff7d1c]"
                    />
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                {/* Updated button styling only */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-[#ff7d1c] text-white text-sm font-medium py-2 rounded-lg hover:scale-[1.02] transition"
                >
                    {loading ? "Sending OTP..." : "Send OTP"}
                </button>

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
