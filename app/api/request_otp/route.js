// import { connectDB } from "@/lib/db";
// import Vote from "@/models/Vote";
// import { sendOtpSms } from "@/lib/egosms"; // Using EgoSMS for OTPs

// function isValidUgandanPhone(phone) {
//     return /^(?:\+?2567\d{8})$/.test(phone); // Accepts +2567XXXXXXXX or 2567XXXXXXXX
// }

// export async function POST(req) {
//     await connectDB();

//     const { phone, categoryId, companyId } = await req.json();

//     if (!phone || !categoryId || !companyId) {
//         return new Response(JSON.stringify({ error: "Missing required fields" }), {
//             status: 400,
//         });
//     }

//     if (!isValidUgandanPhone(phone)) {
//         return new Response(
//             JSON.stringify({
//                 error:
//                     "Only valid Ugandan numbers are allowed (e.g. +2567XXXXXXXX or 2567XXXXXXXX)",
//             }),
//             { status: 400 }
//         );
//     }

//     try {
//         const existingVote = await Vote.findOne({
//             phone,
//             category: categoryId,
//             status: "verified",
//         });

//         if (existingVote) {
//             return new Response(
//                 JSON.stringify({ error: "You have already voted in this category" }),
//                 { status: 409 }
//             );
//         }

//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins from now

//         const vote = await Vote.findOneAndUpdate(
//             { phone, category: categoryId },
//             {
//                 $set: {
//                     phone,
//                     category: categoryId,
//                     company: companyId,
//                     status: "pending",
//                     otpCode: otp,
//                     otpExpiresAt,
//                 },
//             },
//             { upsert: true, new: true, setDefaultsOnInsert: true }
//         );

//         try {
//             await sendOtpSms(phone, otp); // sendOtpSms internally sanitizes the phone number
//         } catch (smsError) {
//             console.error("Failed to send OTP SMS via EgoSMS:", smsError);
//             return new Response(
//                 JSON.stringify({ error: "Failed to send OTP SMS. Please try again!" }),
//                 {
//                     status: 500,
//                 }
//             );
//         }

//         return new Response(JSON.stringify({ success: true, voteId: vote._id }), {
//             status: 200,
//         });
//     } catch (error) {
//         console.error("Request OTP error:", error);
//         return new Response(JSON.stringify({ error: "Something went wrong" }), {
//             status: 500,
//         });
//     }
// }

import { connectDB } from "@/lib/db";
import Vote from "@/models/Vote";
import SuspiciousAttempt from "@/models/SuspiciousAttempt";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const rateLimitMap = new Map();

function rateLimit(key, limit = 5, windowMs = 60_000) {
    const now = Date.now();
    if (!rateLimitMap.has(key)) rateLimitMap.set(key, []);
    const timestamps = rateLimitMap.get(key);

    while (timestamps.length && timestamps[0] <= now - windowMs) {
        timestamps.shift();
    }

    if (timestamps.length >= limit) return false;

    timestamps.push(now);
    return true;
}

export async function POST(req) {
    await connectDB();

    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor
        ? forwardedFor.split(",")[0].trim()
        : req.headers.get("x-real-ip") || "unknown";

    const { phone, categoryId, companyId, fingerprint, userAgent } =
        await req.json();

    if (!phone || !categoryId || !companyId || !fingerprint) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
            status: 400,
        });
    }

    // Normalize phone: Accept +2567XXXXXXXX (12 digits) or 07XXXXXXXX (10 digits)
    let normalizedPhone = phone;

    if (/^07\d{8}$/.test(phone)) {
        normalizedPhone = "+256" + phone.slice(1);
    } else if (/^\+2567\d{8}$/.test(phone)) {
        normalizedPhone = phone;
    } else {
        return new Response(
            JSON.stringify({
                error: "Phone number must start with 07 or +2567 and be valid",
            }),
            { status: 400 }
        );
    }

    const phoneNumber = parsePhoneNumberFromString(normalizedPhone, "UG");
    if (!phoneNumber || !phoneNumber.isValid()) {
        return new Response(
            JSON.stringify({ error: "Invalid phone number format" }),
            { status: 400 }
        );
    }

    const e164Phone = phoneNumber.number;

    // Rate limit check
    const rateLimitKey = `${ip}:${e164Phone}`;
    if (!rateLimit(rateLimitKey)) {
        await SuspiciousAttempt.create({
            ip,
            phone: e164Phone,
            category: categoryId,
            fingerprint,
            userAgent,
            reason: "Rate limit exceeded",
        });

        return new Response(
            JSON.stringify({ error: "Too many requests, please try later" }),
            { status: 429 }
        );
    }

    try {
        const existingVote = await Vote.findOne({
            category: categoryId,
            $or: [{ phone: e164Phone }, { fingerprint }, { ip, fingerprint }],
        });

        if (existingVote) {
            return new Response(
                JSON.stringify({
                    error: "You have already voted in this category",
                }),
                { status: 409 }
            );
        }

        const vote = new Vote({
            phone: e164Phone,
            category: categoryId,
            company: companyId,
            fingerprint,
            ip,
            userAgent,
            status: "verified",
        });

        await vote.save();

        return new Response(JSON.stringify({ success: true, voteId: vote._id }), {
            status: 200,
        });
    } catch (err) {
        console.error("Vote submission error:", err);

        if (err.code === 11000) {
            return new Response(
                JSON.stringify({ error: "You have already voted in this category" }),
                { status: 409 }
            );
        }

        return new Response(JSON.stringify({ error: "Something went wrong" }), {
            status: 500,
        });
    }
}
