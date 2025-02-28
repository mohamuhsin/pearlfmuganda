import { useState } from "react";
import FormInput from "./FormInput";

export default function MobileMoneyForm({ onCancel, onPay }) {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form validation check
    const isFormValid = name && phoneNumber && amount;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            setIsSubmitting(true);
            onPay(name, phoneNumber, amount);
            setIsSubmitting(false);
        } else {
            // Optionally show an error message
            alert("Please fill in all fields.");
        }
    };

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <FormInput
                label="Your Name"
                value={name}
                onChange={setName}
                placeholder="Name"
            />
            <FormInput
                label="Your Mobile Money Number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                type="tel"
                placeholder="07..."
            />
            <FormInput
                label="Amount"
                value={amount}
                onChange={setAmount}
                type="number"
                placeholder="Amount"
            />

            {/* Buttons Section */}
            <div className="flex justify-between mt-4">
                <button
                    type="button"
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-bold hover:bg-gray-400 transition duration-300"
                    onClick={onCancel}
                >
                    CANCEL
                </button>
                <button
                    type="submit"
                    className={`bg-[#fec76f] text-[#030269] px-6 py-2 rounded-lg font-bold hover:bg-[#e6b800] transition duration-300 ${!isFormValid ? "cursor-not-allowed opacity-50" : ""
                        }`}
                    disabled={!isFormValid || isSubmitting}
                >
                    {isSubmitting ? "Processing..." : "PAY NOW"}
                </button>
            </div>
        </form>
    );
}
