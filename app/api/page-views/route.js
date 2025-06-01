import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import PageStats from "@/models/PageStats";

export async function POST() {
    try {
        await connectDB();

        const slug = "awards";
        let stat = await PageStats.findOne({ slug });

        if (!stat) {
            stat = await PageStats.create({ slug, views: 1 });
        } else {
            stat.views += 1;
            await stat.save();
        }

        return NextResponse.json({ views: stat.views });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
