// // app/verifyotp/page.js
// import VerifyOtpForm from "@/components/otpVerification";

// export default async function VerifyPage({ searchParams }) {
//     const voteId = searchParams?.voteId;

//     if (!voteId) {
//         return <p className="text-red-600 p-4">Missing vote ID</p>;
//     }

//     return (
//         <div className="max-w-md mx-auto mt-10 p-4">
//             <h1 className="text-xl font-semibold mb-4">Verify Your Vote</h1>
//             <VerifyOtpForm voteId={voteId} />
//         </div>
//     );
// }
