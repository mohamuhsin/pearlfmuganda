import { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import TabButton from "./TabButton";
import BankDetails from "./BankDetails";
import MobileMoneyForm from "./MobileMoney";
import SendWave from "./SendWave";
import CustomAlert from "./CustomAlert";
import Backdrop from "./Backdrop"; // <-- Import the Backdrop component

export default function PaymentModal({ onClose }) {
    const [activeTab, setActiveTab] = useState("mobileMoney");
    const [alertMessage, setAlertMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const modalRef = useRef(null);

    // Handle keydown events, specifically Escape key to close the modal
    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            onClose();
        }
    };

    // Close the modal when clicking outside of the modal content
    const handleCloseModal = (e) => {
        if (e.target === modalRef.current) {
            onClose();
        }
    };

    useEffect(() => {
        modalRef.current?.focus(); // Focus the modal when it's mounted
        return () => {
            // Optionally return focus to the element that opened the modal
            // document.activeElement.focus();
        };
    }, []);

    return (
        <>
            {/* Render the Backdrop component */}
            <Backdrop onClose={onClose} />

            {/* Modal Content */}
            <motion.div
                ref={modalRef}
                className="fixed inset-0 flex items-center justify-center z-50" // Ensure it's above the backdrop
                onClick={handleCloseModal}
                onKeyDown={handleKeyDown} // Handle keydown event directly
                tabIndex={-1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                role="dialog"
                aria-labelledby="modalTitle"
                aria-describedby="modalContent"
            >
                <motion.div
                    className="bg-white w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg relative"
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="bg-[#030269] text-white text-center py-3 rounded-t-lg">
                        <h2
                            id="modalTitle"
                            className="text-2xl sm:text-3xl md:text-4xl font-bold"
                        >
                            PAYMENTS
                        </h2>
                    </div>
                    <button
                        className="absolute top-3 right-3 text-white hover:text-red-600"
                        onClick={onClose}
                    >
                        <FaTimes size={24} />
                    </button>
                    <div className="flex border-b border-[#030269]">
                        {["mobileMoney", "sendWave", "bankTransfer"].map((tab) => (
                            <TabButton
                                key={tab}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                tab={tab}
                            />
                        ))}
                    </div>

                    <div className="p-3" id="modalContent">
                        {alertMessage && <CustomAlert message={alertMessage} />}
                        {errorMessage && (
                            <div className="bg-red-500 text-white p-2 rounded-lg mb-4 text-center">
                                {errorMessage}
                            </div>
                        )}

                        {activeTab === "sendWave" && <SendWave />}
                        {activeTab === "mobileMoney" && <MobileMoneyForm />}
                        {activeTab === "bankTransfer" && <BankDetails />}
                    </div>

                    <p className="text-center text-[#030269] font-semibold py-3 bg-[#e0e0e0] rounded-b-lg text-xs sm:text-sm md:text-base">
                        POWERED BY IVENTICS TECHNOLOGIES
                    </p>
                </motion.div>
            </motion.div>
        </>
    );
}
