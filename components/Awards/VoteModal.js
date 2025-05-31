"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import VerifyOtpModal from "./VerifyOtpModal";

function isValidUgandanPhone(phone) {
    return /^\+2567\d{8}$/.test(phone);
}

const StyledPhoneInput = forwardRef(function StyledPhoneInput(props, ref) {
    return (
        <input
            {...props}
            ref={ref}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#ff7d1c] transition duration-150"
        />
    );
});

export default function VoteModal({
    isOpen,
    onClose,
    category,
    onVoteSuccess,
}) {
    const [phone, setPhone] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [voteId, setVoteId] = useState(null);
    const [showVerifyModal, setShowVerifyModal] = useState(false);

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
        if (!isOpen) {
            setPhone("");
            setCompanyId("");
            setError(null);
            setVoteId(null);
            setShowVerifyModal(false);
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        if (loading) return;

        if (!phone || !companyId) {
            setError("Phone number and company are required.");
            return;
        }

        if (!isValidUgandanPhone(phone)) {
            setError("Only Ugandan numbers starting with +2567XXXXXXXX are allowed.");
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

            if (!res.ok || !data.voteId) {
                setError(data.error || "Failed to send OTP. Check your network.");
            } else {
                setVoteId(data.voteId);
                setShowVerifyModal(true);
            }
        } catch {
            setError("An error occurred. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const closeVerifyModal = () => {
        setShowVerifyModal(false);
        setVoteId(null);
        onClose();
    };

    const handleVerificationSuccess = () => {
        closeVerifyModal();
        if (onVoteSuccess) onVoteSuccess();
    };

    if (!isOpen || !category) return null;

    const selectedCompany = category.companies?.find((c) => c._id === companyId);

    return (
        <>
            {!showVerifyModal && (
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
                                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#ff7d1c] transition duration-150"
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
                                defaultCountry="UG"
                                countries={["UG"]}
                                international={false}
                                withCountryCallingCode
                                value={phone}
                                onChange={(value) => {
                                    if (!value || value.length <= 15) {
                                        setPhone(value);
                                    }
                                }}
                                inputComponent={StyledPhoneInput}
                            />
                            <small className="text-gray-500 text-xs mt-1">
                                Only Ugandan phone numbers (e.g. +2567XXXXXXXX)
                            </small>
                        </div>

                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

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
            )}

            {showVerifyModal && (
                <VerifyOtpModal
                    isOpen={true}
                    onClose={closeVerifyModal}
                    voteId={voteId}
                    categoryName={category.name}
                    companyName={selectedCompany?.name || ""}
                    onVerificationSuccess={handleVerificationSuccess}
                />
            )}
        </>
    );
}
