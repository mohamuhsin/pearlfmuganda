import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Vote from "@/models/Vote";
import Company from "@/models/Company";

export async function POST(req) {
    await connectDB();

    try {
        const { voteId, otpCode } = await req.json();

        if (!voteId || !otpCode) {
            return NextResponse.json(
                { error: "Missing vote ID or OTP code" },
                { status: 400 }
            );
        }

        const vote = await Vote.findById(voteId);

        if (!vote) {
            return NextResponse.json({ error: "Vote not found" }, { status: 404 });
        }

        if (vote.status === "verified") {
            return NextResponse.json(
                { error: "This vote has already been verified" },
                { status: 400 }
            );
        }

        if (vote.otpCode !== otpCode) {
            return NextResponse.json({ error: "Invalid OTP code" }, { status: 400 });
        }

        if (vote.otpExpiresAt < new Date()) {
            return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
        }

        vote.status = "verified";
        await vote.save();

        await Company.findByIdAndUpdate(vote.company, {
            $inc: { votes: 1 },
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("OTP verification error:", err);
        return NextResponse.json(
            { error: "Server error during OTP verification" },
            { status: 500 }
        );
    }
}
