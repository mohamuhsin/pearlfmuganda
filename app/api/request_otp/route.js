import { connectDB } from "@/lib/db";
import Vote from "@/models/Vote";
import { sendOtpSms } from "@/lib/egosms"; // Using EgoSMS for OTPs

function isValidUgandanPhone(phone) {
    return /^(?:\+?2567\d{8})$/.test(phone); // Accepts +2567XXXXXXXX or 2567XXXXXXXX
}

export async function POST(req) {
    await connectDB();

    const { phone, categoryId, companyId } = await req.json();

    if (!phone || !categoryId || !companyId) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
            status: 400,
        });
    }

    if (!isValidUgandanPhone(phone)) {
        return new Response(
            JSON.stringify({
                error:
                    "Only valid Ugandan numbers are allowed (e.g. +2567XXXXXXXX or 2567XXXXXXXX)",
            }),
            { status: 400 }
        );
    }

    try {
        const existingVote = await Vote.findOne({
            phone,
            category: categoryId,
            status: "verified",
        });

        if (existingVote) {
            return new Response(
                JSON.stringify({ error: "You have already voted in this category" }),
                { status: 409 }
            );
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins from now

        const vote = await Vote.findOneAndUpdate(
            { phone, category: categoryId },
            {
                $set: {
                    phone,
                    category: categoryId,
                    company: companyId,
                    status: "pending",
                    otpCode: otp,
                    otpExpiresAt,
                },
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        try {
            await sendOtpSms(phone, otp); // sendOtpSms internally sanitizes the phone number
        } catch (smsError) {
            console.error("Failed to send OTP SMS via EgoSMS:", smsError);
            return new Response(
                JSON.stringify({ error: "Failed to send OTP SMS. Please try again!" }),
                {
                    status: 500,
                }
            );
        }

        return new Response(JSON.stringify({ success: true, voteId: vote._id }), {
            status: 200,
        });
    } catch (error) {
        console.error("Request OTP error:", error);
        return new Response(JSON.stringify({ error: "Something went wrong" }), {
            status: 500,
        });
    }
}
