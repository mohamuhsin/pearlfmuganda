import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import Company from "@/models/Company";

export async function GET(req, context) {
    const { id } = await context.params;

    await connectDB();

    try {
        const category = await Category.findById(id).lean();
        if (!category) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }

        const companies = await Company.find({ category: id }).lean();

        // Add voteCount field for frontend display
        const companiesWithVotes = companies.map((company) => ({
            ...company,
            voteCount: company.votes || 0,
        }));

        return NextResponse.json({ ...category, companies: companiesWithVotes });
    } catch (error) {
        console.error("Fetch category error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
