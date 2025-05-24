import { connectDB } from "@/lib/db";
import Vote from "@/models/Vote";
import { sendOtpSms } from "@/lib/twilio";

export async function POST(req) {
    await connectDB();

    const { voteId } = await req.json();

    if (!voteId) {
        return new Response(JSON.stringify({ error: "Missing vote ID" }), {
            status: 400,
        });
    }

    try {
        const vote = await Vote.findById(voteId);

        if (!vote) {
            return new Response(JSON.stringify({ error: "Vote not found" }), {
                status: 404,
            });
        }

        if (vote.status === "verified") {
            return new Response(JSON.stringify({ error: "Vote already verified" }), {
                status: 400,
            });
        }

        // Generate new OTP and expiry
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

        // Update vote with new OTP info
        vote.otpCode = otp;
        vote.otpExpiresAt = otpExpiresAt;
        await vote.save();

        // Send OTP SMS
        try {
            await sendOtpSms(vote.phone, otp);
        } catch (smsError) {
            console.error("Failed to resend OTP SMS:", smsError);
            return new Response(JSON.stringify({ error: "Failed to send OTP SMS" }), {
                status: 500,
            });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("Resend OTP error:", error);
        return new Response(JSON.stringify({ error: "Server error" }), {
            status: 500,
        });
    }
}
