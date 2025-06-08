// "use client";

// import React, { useCallback } from "react";

// export default function Whatsapp({
//     phone = "256782306060",
//     size = "md", // sm, md, lg
//     label = "Chat with us on WhatsApp",
// }) {
//     const handleTrackClick = useCallback(() => {
//         if (typeof window !== "undefined" && window.analytics) {
//             window.analytics.track("WhatsApp Button Clicked", {
//                 platform: "WhatsApp",
//                 location: "Bottom Right",
//             });
//         }
//     }, []);

//     // Size classes based on prop
//     const sizeClasses = {
//         sm: "w-12 h-12",
//         md: "w-16 h-16",
//         lg: "w-20 h-20",
//     };

//     return (
//         <div className="fixed bottom-5 right-5 z-50">
//             <a
//                 href={`https://wa.me/${phone}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label={label}
//                 onClick={handleTrackClick}
//                 className={`
//           flex items-center justify-center
//           ${sizeClasses[size]}
//           bg-green-600 rounded-full shadow-md
//           hover:shadow-green-400/60
//           hover:scale-110
//           transition-transform transition-shadow duration-300 ease-in-out
//           focus:outline-none focus-visible:ring-4 focus-visible:ring-green-400 focus-visible:ring-opacity-75
//           animate-[pulse_3s_infinite] group
//         `}
//             >
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="white"
//                     className={`${size === "sm"
//                         ? "w-6 h-6"
//                         : size === "lg"
//                             ? "w-14 h-14"
//                             : "w-10 h-10"
//                         }`}
//                     aria-hidden="true"
//                     role="img"
//                 >
//                     <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.372 0 0 5.372 0 12a11.9 11.9 0 001.755 6.063L0 24l6.106-1.744A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12 0-3.206-1.252-6.217-3.48-8.52zm-8.23 17.033a9.5 9.5 0 01-5.094-1.529l-.362-.218-3.62 1.037 1.034-3.52-.236-.367a9.48 9.48 0 011.511-11.908 9.505 9.505 0 0113.442 0 9.48 9.48 0 011.372 11.836 9.5 9.5 0 01-8.63 4.569zm5.322-6.235c-.29-.145-1.717-.847-1.983-.942-.266-.096-.46-.144-.655.145s-.75.942-.92 1.136c-.17.195-.34.217-.63.073-.29-.145-1.223-.451-2.33-1.436-.86-.77-1.44-1.72-1.609-2.01-.17-.29-.018-.446.127-.59.13-.13.29-.34.435-.51.145-.17.193-.29.29-.483.096-.195.048-.365-.024-.51-.072-.145-.655-1.58-.898-2.162-.236-.565-.48-.49-.655-.5-.17-.007-.36-.008-.55-.008s-.51.073-.775.365c-.265.29-1.01.985-1.01 2.395 0 1.41 1.035 2.775 1.178 2.965.145.195 2.04 3.12 4.945 4.374.69.3 1.23.48 1.65.615.693.225 1.32.193 1.82.118.555-.084 1.717-.7 1.96-1.374.24-.672.24-1.248.168-1.374-.072-.124-.264-.195-.555-.34z" />
//                 </svg>
//             </a>
//         </div>
//     );
// }
