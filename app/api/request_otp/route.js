// app/api/request_otp/route.js
import { connectDB } from "@/lib/db";
import Vote from "@/models/Vote";
import { sendOtpSms } from "@/lib/twilio";

function isValidE164(phone) {
    return /^\+[1-9]\d{1,14}$/.test(phone); // Validates international numbers like +2567xxxxxxx
}

export async function POST(req) {
    await connectDB();

    const { phone, categoryId, companyId } = await req.json();

    if (!phone || !categoryId || !companyId) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
            status: 400,
        });
    }

    // Check phone format
    if (!isValidE164(phone)) {
        return new Response(
            JSON.stringify({ error: "Invalid phone number format" }),
            { status: 400 }
        );
    }

    try {
        // Check for existing verified vote
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

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

        // Upsert vote with OTP
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

        // Send OTP SMS
        try {
            await sendOtpSms(phone, otp);
        } catch (smsError) {
            console.error("Failed to send OTP SMS:", smsError);
            return new Response(
                JSON.stringify({ error: "Failed to send OTP SMS, Try Again!" }),
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
