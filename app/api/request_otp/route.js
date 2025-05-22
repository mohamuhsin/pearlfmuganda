import { connectDB } from "@/lib/db";
import Vote from "@/models/Vote";
import { sendOtpSms } from "@/lib/twilio";
import { storeOtp } from "@/lib/otpStore";

export async function POST(req) {
    await connectDB();

    const { phone, categoryId, companyId } = await req.json();

    if (!phone || !categoryId || !companyId) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
            status: 400,
        });
    }

    try {
        // Save the vote as pending
        const vote = await Vote.create({
            phone,
            category: categoryId,
            company: companyId,
            status: "pending",
        });

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        storeOtp(phone, otp);

        // Send OTP via Twilio SMS
        await sendOtpSms(phone, otp);

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
        console.error("Vote creation error:", error.message);
        return new Response(JSON.stringify({ error: "Something went wrong" }), {
            status: 500,
        });
    }
}
