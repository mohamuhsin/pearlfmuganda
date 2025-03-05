"use client";

import { useState } from "react";
import CampaignImage from "./CampaignImage";
import CampaignMessage from "./CampaignMessage";
import PaymentMethodsNote from "./PaymentMethodsNote";
import PaymentMethodCard from "./PaymentMethodCard";
import CopyStatus from "./CopyStatus";
import Note from "./Note";

export default function CampaignSection() {
    const [copyStatus, setCopyStatus] = useState(""); // For showing copy success/failure message
    const [copiedNumber, setCopiedNumber] = useState(null); // For showing copy success tooltip

    // Function to handle copy action
    const handleCopy = (paymentNumber, provider) => {
        navigator.clipboard
            .writeText(paymentNumber)
            .then(() => {
                setCopiedNumber(provider);
                setCopyStatus("Copied!");
            })
            .catch(() => setCopyStatus("Failed to copy"));

        // Reset copy status after 2 seconds
        setTimeout(() => {
            setCopyStatus("");
            setCopiedNumber(null);
        }, 2000);
    };

    return (
        <section className="bg-gray-50 py-12 px-4 pt-24 flex justify-center">
            <div className="max-w-6xl w-full bg-white shadow-2xl rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center space-y-10 md:space-y-0 md:space-x-12">
                {/* Left - Image */}
                <CampaignImage />

                {/* Right - Campaign Message & Contribution Methods */}
                <div className="md:w-2/3 text-center md:text-left">
                    <CampaignMessage />

                    {/* Payment Methods Introduction */}
                    <PaymentMethodsNote />

                    {/* Contribution Methods */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                        <div className="flex justify-center">
                            <PaymentMethodCard
                                method="Airtel Money"
                                paymentNumber="1095075"
                                onCopy={handleCopy}
                                backgroundColor="bg-red-500"
                                textColor="text-red-600"
                                hoverColor="hover:bg-red-100"
                                imageSrc="/airtel.png"
                            />
                        </div>
                        <div className="flex justify-center">
                            <PaymentMethodCard
                                method="MTN Mobile Money"
                                paymentNumber="582548"
                                onCopy={handleCopy}
                                backgroundColor="bg-yellow-500"
                                textColor="text-yellow-500"
                                hoverColor="hover:bg-yellow-100"
                                imageSrc="/mtn.png"
                            />
                        </div>
                    </div>

                    {/* Copy Status Message */}
                    <CopyStatus status={copyStatus} />

                    <Note />
                </div>
            </div>
        </section>
    );
}
