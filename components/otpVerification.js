"use client";
import { useState } from "react";

export default function VerifyOtpForm({ voteId }) {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleVerify = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!otp) {
            setError("Please enter the OTP.");
            return;
        }

        try {
            const res = await fetch("/api/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ voteId, otp }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Verification failed.");
            } else {
                setMessage(data.message);
            }
        } catch (err) {
            setError("Network error. Try again.");
        }
    };

    return (
        <form onSubmit={handleVerify} className="space-y-4">
            <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="border p-2 rounded w-full"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Verify OTP
            </button>

            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}
        </form>
    );
}
