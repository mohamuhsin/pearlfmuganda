// /app/api/verify-otp/route.js

import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/otpStore";
import Vote from "@/models/Vote";
import { connectDB } from "@/lib/db";

export async function POST(req) {
    await connectDB();

    const { voteId, otp } = await req.json();

    if (!voteId || !otp) {
        return NextResponse.json(
            { error: "voteId and OTP are required" },
            { status: 400 }
        );
    }

    try {
        const vote = await Vote.findById(voteId);
        if (!vote || vote.status !== "pending") {
            return NextResponse.json(
                { error: "Vote not found or already verified" },
                { status: 404 }
            );
        }

        const isValid = verifyOtp(vote.phone, otp);

        if (!isValid) {
            return NextResponse.json(
                { error: "Invalid or expired OTP" },
                { status: 401 }
            );
        }

        vote.status = "successful";
        await vote.save();

        return NextResponse.json({
            success: true,
            message: "Vote verified successfully!",
        });
    } catch (error) {
        console.error("OTP Verification Error:", error);
        return NextResponse.json(
            { error: "Server error during verification" },
            { status: 500 }
        );
    }
}
