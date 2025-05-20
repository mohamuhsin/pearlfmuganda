// /app/api/votes/route.js
import { NextResponse } from 'next/server';
import db from '@/lib/db'; // your DB connection util
import Vote from '@/models/Vote';
import Category from '@/models/Category';
import Company from '@/models/Company';

export async function POST(req) {
    await db();
    const { phone, companyId, categoryId } = await req.json();

    // 🛑 Basic validation
    if (!phone || !companyId || !categoryId) {
        return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // ✅ Enforce: one vote per category per phone
    const existingVote = await Vote.findOne({ phone, category: categoryId });
    if (existingVote) {
        return NextResponse.json({ error: 'You already voted in this category.' }, { status: 403 });
    }

    // 📝 Save vote as pending
    const vote = await Vote.create({
        phone,
        company: companyId,
        category: categoryId,
        status: 'pending',
        verified: false,
        otp: '123456', // 🔐 Replace this with a real OTP later
    });

    return NextResponse.json({
        message: 'OTP sent to phone (mocked)',
        voteId: vote._id,
    });
}
