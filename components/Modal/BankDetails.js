import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaCopy } from "react-icons/fa";

export default function BankDetails() {
    const [selectedBank, setSelectedBank] = useState(null);
    const [isCopied, setIsCopied] = useState(false);

    const banks = [
        {
            name: "TROPICAL BANK UGANDA",
            info: {
                bankName: "Tropical Bank Uganda",
                branchName: "Nakivubo",
                accountName: "Pearl Of Africa Radio Limited",
                accountNumber: "0050029597",
                swiftCode: "TROAUGKA",
            },
        },
    ];

    const handleCopyAll = (bankInfo) => {
        const allInfo = `Bank Name: ${bankInfo.bankName}\nBranch Name: ${bankInfo.branchName}\nAccount Name: ${bankInfo.accountName}\nAccount No (UGX): ${bankInfo.accountNumber}\nSWIFT Code: ${bankInfo.swiftCode}`;
        navigator.clipboard.writeText(allInfo).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000); // Hide notification after 3 seconds
        });
    };

    return (
        <div className="space-y-6">
            {banks.map((bank, index) => (
                <div
                    key={index}
                    className="p-6 mb-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                    {/* Bank Header */}
                    <div
                        className="flex justify-between items-center cursor-pointer p-4 bg-[#f7f7f7] rounded-lg"
                        onClick={() =>
                            setSelectedBank(selectedBank === bank.name ? null : bank.name)
                        }
                    >
                        <p className="text-xl font-semibold text-[#030269]">{bank.name}</p>
                        {selectedBank === bank.name ? (
                            <FaChevronUp size={20} className="text-[#030269]" />
                        ) : (
                            <FaChevronDown size={20} className="text-[#030269]" />
                        )}
                    </div>

                    {/* Bank Info */}
                    {selectedBank === bank.name && (
                        <div className="mt-6 space-y-4">
                            {/* Bank Info Fields */}
                            {Object.entries(bank.info).map(([key, value]) => (
                                <div key={key} className="flex justify-between text-[#030269]">
                                    <p className="font-medium text-sm sm:text-base">
                                        <strong>
                                            {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                                        </strong>
                                    </p>
                                    <p className="text-sm sm:text-base">{value}</p>
                                </div>
                            ))}

                            {/* Copy Button */}
                            <div className="mt-6 flex justify-center">
                                <button
                                    className="bg-[#ff7e1c] text-[#ffffff] px-6 py-3 rounded-lg font-bold flex items-center hover:bg-[#e6b800] transition-colors duration-300"
                                    onClick={() => handleCopyAll(bank.info)}
                                >
                                    <FaCopy className="mr-2" /> Copy All Bank Details
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* Toast Notification for Copy */}
            {isCopied && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-blue-600 text-white rounded-lg shadow-md">
                    <p className="font-semibold">Bank information copied to clipboard!</p>
                </div>
            )}
        </div>
    );
}
