// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { FaHandHoldingHeart } from "react-icons/fa";

// export default function CampaignSection() {
//     const [copyStatus, setCopyStatus] = useState(""); // For showing copy success/failure message
//     const [copiedNumber, setCopiedNumber] = useState(null); // For showing copy success tooltip

//     // Function to handle copy action
//     const handleCopy = (paymentNumber, provider) => {
//         navigator.clipboard
//             .writeText(paymentNumber)
//             .then(() => {
//                 setCopiedNumber(provider);
//                 setCopyStatus("Copied!");
//             })
//             .catch(() => setCopyStatus("Failed to copy"));

//         // Reset copy status after 2 seconds
//         setTimeout(() => {
//             setCopyStatus("");
//             setCopiedNumber(null);
//         }, 2000);
//     };

//     return (
//         <section className="bg-gray-50 py-12 px-4 flex justify-center">
//             <div className="max-w-6xl w-full bg-white shadow-2xl rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center space-y-10 md:space-y-0 md:space-x-12">
//                 {/* Left - Image */}
//                 <div className="w-full md:w-1/3 flex justify-center">
//                     <Image
//                         src="/nel.jpeg"
//                         alt="Support Our Campaign"
//                         width={320}
//                         height={320}
//                         className="rounded-2xl shadow-xl"
//                         priority
//                     />
//                 </div>

//                 {/* Right - Campaign Message & Contribution Methods */}
//                 <div className="md:w-2/3 text-center md:text-left">
//                     <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
//                         Support Counsel Nalukoola Candidature.
//                     </h2>
//                     <p className="text-gray-700 mt-4 text-base md:text-lg leading-relaxed">
//                         Every contribution brings us closer to change. your support help us
//                         reach every corner in constituency, spread the change message, and
//                         making a lasting impact.
//                     </p>

//                     {/* Payment Methods Introduction */}
//                     <p className="mt-6 text-base md:text-lg text-gray-700 font-semibold bg-yellow-100 p-4 rounded-lg shadow-lg">
//                         Use the payment numbers below to contribute via Airtel Money, MTN
//                         Mobile Money, or Bank of Africa.
//                     </p>

//                     {/* Contribution Methods */}
//                     <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {/* Airtel Money */}
//                         <div className="bg-red-500 p-6 rounded-xl shadow-lg flex flex-col justify-center items-center space-y-4 hover:scale-105 transition duration-300 hover:shadow-2xl">
//                             <Image
//                                 src="/AIRTEL.png"
//                                 alt="Airtel Money"
//                                 width={180}
//                                 height={50}
//                                 className="object-contain"
//                                 priority
//                             />
//                             <button
//                                 onClick={() => handleCopy("0702901590", "Airtel Money")}
//                                 className="bg-white text-red-600 px-6 py-2 rounded-lg shadow-md hover:bg-red-100 transition duration-300"
//                             >
//                                 Copy Number
//                             </button>
//                         </div>

//                         {/* MTN Mobile Money */}
//                         <div className="bg-yellow-500 p-6 rounded-xl shadow-lg flex flex-col justify-center items-center space-y-4 hover:scale-105 transition duration-300 hover:shadow-2xl">
//                             <Image
//                                 src="/MTN.png"
//                                 alt="MTN Mobile Money"
//                                 width={180}
//                                 height={50}
//                                 className="object-contain"
//                                 priority
//                             />
//                             <button
//                                 onClick={() => handleCopy("0772901590", "MTN Mobile Money")}
//                                 className="bg-white text-yellow-500 px-6 py-2 rounded-lg shadow-md hover:bg-yellow-100 transition duration-300"
//                             >
//                                 Copy Number
//                             </button>
//                         </div>

//                         {/* Bank of Africa */}
//                         <div className="bg-[#159155] p-6 rounded-xl shadow-lg flex flex-col justify-center items-center space-y-4 hover:scale-105 transition duration-300 hover:shadow-2xl">
//                             <Image
//                                 src="/BOA.png"
//                                 alt="Bank of Africa"
//                                 width={180}
//                                 height={50}
//                                 className="object-contain"
//                                 priority
//                             />
//                             <button
//                                 onClick={() => handleCopy("15115412002", "Bank of Africa")}
//                                 className="bg-white text-[#159155] px-6 py-2 rounded-lg shadow-md hover:bg-[#c8ddcb] transition duration-300"
//                             >
//                                 Copy Number
//                             </button>
//                         </div>
//                     </div>

//                     {/* Copy Status Message */}
//                     {copyStatus && (
//                         <div className="mt-4 text-center text-lg font-semibold text-green-600">
//                             {copyStatus}
//                         </div>
//                     )}

//                     {/* Call to Action Button */}
//                     <div className="mt-8 flex justify-center md:justify-start">
//                         <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-lg font-bold text-lg md:text-xl flex items-center justify-center space-x-3 transition transform hover:scale-105 shadow-md">
//                             <FaHandHoldingHeart className="text-2xl" />
//                             <span>Contribute Now</span>
//                         </button>
//                     </div>

//                     {/* Payment Solution Note */}
//                     <div className="mt-6 text-center text-sm md:text-lg text-gray-600 font-semibold">
//                         <p>
//                             <strong>Note:</strong> Payments through this button are not yet
//                             active, but we are actively working on integrating a secure
//                             payment solution.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }
