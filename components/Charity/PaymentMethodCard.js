import Image from "next/image";
import { track } from "@vercel/analytics";

const PaymentMethodCard = ({
    method,
    paymentNumber,
    onCopy,
    backgroundColor,
    textColor,
    hoverColor,
    imageSrc,
}) => {
    const handleCopy = () => {
        // Call the onCopy function
        onCopy(paymentNumber, method);

        // Track the button click with custom event data
        track("Copy Button Clicked", {
            method,
            paymentNumber,
        });
    };

    return (
        <div
            className={`${backgroundColor} p-4 rounded-xl shadow-lg flex flex-col justify-center items-center space-y-2 hover:scale-105 transition duration-300 hover:shadow-2xl`}
        >
            <Image
                src={imageSrc}
                alt={method}
                width={180}
                height={50}
                className="object-contain"
                priority
            />
            <button
                onClick={handleCopy}
                className={`bg-white ${textColor} px-4 py-2 rounded-lg shadow-md ${hoverColor} transition duration-300`}
            >
                Copy Number
            </button>
        </div>
    );
};

export default PaymentMethodCard;
