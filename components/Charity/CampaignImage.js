import { useState } from "react";
import Image from "next/image";

const CampaignImage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="w-full md:w-1/3 flex justify-center">
                <Image
                    src="/campaign.jpeg"
                    alt="Support Our Campaign"
                    width={320}
                    height={320}
                    className="rounded-2xl shadow-xl cursor-pointer transition-transform duration-300 hover:scale-105"
                    priority
                    onClick={toggleModal}
                />
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 overflow-auto animate-fadeIn"
                    onClick={toggleModal}
                >
                    <div
                        className="relative max-w-5xl max-h-screen p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src="/campaign.jpeg"
                            alt="Support Our Campaign"
                            width={1200}
                            height={800}
                            className="rounded-2xl shadow-2xl w-full h-auto"
                        />
                        <button
                            onClick={toggleModal}
                            className="absolute top-4 right-4 text-white text-4xl font-bold hover:scale-110 transition-transform"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
        </>
    );
};

export default CampaignImage;
