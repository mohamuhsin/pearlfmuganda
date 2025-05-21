"use client";

import { useState } from "react";

export default function VoteTestForm() {
    const [phone, setPhone] = useState("+256782330038");
    const [categoryId, setCategoryId] = useState("682c5c9ed2ff67b7f2631fc3");
    const [companyId, setCompanyId] = useState("682c827fd2ff67b7f2632056");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVote = async () => {
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/votes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone, categoryId, companyId }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage(`✅ OTP sent! Vote ID: ${data.voteId}`);
            } else {
                setMessage(`❌ Error: ${data.error}`);
            }
        } catch (err) {
            console.error(err);
            setMessage("❌ Network or server error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Test Vote Form</h2>

            <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-3"
            />

            <input
                type="text"
                placeholder="Category ID"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-3"
            />

            <input
                type="text"
                placeholder="Company ID"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-4"
            />

            <button
                onClick={handleVote}
                disabled={loading}
                className={`w-full py-2 px-4 text-white font-semibold rounded ${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                    }`}
            >
                {loading ? "Submitting..." : "Submit Vote"}
            </button>

            {message && <p className="mt-4 text-sm text-center">{message}</p>}
        </div>
    );
}
