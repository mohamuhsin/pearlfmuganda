import { useState } from "react";
import { FaHandHoldingHeart } from "react-icons/fa";
import PaymentModal from "../Modal/PaymentModal";

const CallToActionButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    // Function to open the modal
    const openModal = () => setIsModalOpen(true);

    // Function to close the modal
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="mt-8 flex justify-center md:justify-start">
            <button
                className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-lg font-bold text-lg md:text-xl flex items-center justify-center space-x-3 transition transform hover:scale-105 shadow-md"
                onClick={openModal} // Open the modal when the button is clicked
            >
                <FaHandHoldingHeart className="text-2xl" />
                <span>Contribute Now</span>
            </button>

            {/* Conditionally render the modal only if it is open */}
            {isModalOpen && <PaymentModal onClose={closeModal} />}
        </div>
    );
};

export default CallToActionButton;
