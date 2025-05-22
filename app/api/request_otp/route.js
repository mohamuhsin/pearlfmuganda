import { connectDB } from "@/lib/db";
import Vote from "@/models/Vote";
import { sendOtpSms } from "@/lib/twilio";

export async function POST(req) {
    await connectDB();

    const { phone, categoryId, companyId } = await req.json();

    if (!phone || !categoryId || !companyId) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
            status: 400,
        });
    }

    try {
        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // expires in 5 mins

        // Upsert vote with OTP info
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

        // Send OTP SMS with error handling
        try {
            await sendOtpSms(phone, otp);
        } catch (smsError) {
            console.error("Failed to send OTP SMS:", smsError);
            return new Response(JSON.stringify({ error: "Failed to send OTP SMS" }), {
                status: 500,
            });
        }

        return new Response(JSON.stringify({ success: true, voteId: vote._id }), {
            status: 200,
        });
    } catch (error) {
        if (error.code === 11000) {
            return new Response(
                JSON.stringify({ error: "You have already voted in this category" }),
                { status: 409 }
            );
        }
        console.error("Request OTP error:", error);
        return new Response(JSON.stringify({ error: "Something went wrong" }), {
            status: 500,
        });
    }
}
