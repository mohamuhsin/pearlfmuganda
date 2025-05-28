import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import Company from "@/models/Company";
import Vote from "@/models/Vote";

export async function GET(req, context) {
    // Await the params object because in Next.js 13+ it's async
    const params = await context.params;
    const { id } = params;

    await connectDB();

    try {
        // Find the category by id
        const category = await Category.findById(id).lean();
        if (!category) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }

        // Find all companies under the category
        const companies = await Company.find({ category: id }).lean();

        // Aggregate verified votes count grouped by company
        const voteCounts = await Vote.aggregate([
            { $match: { category: category._id, status: "verified" } },
            { $group: { _id: "$company", count: { $sum: 1 } } },
        ]);

        // Create a map of companyId => voteCount
        const voteMap = {};
        voteCounts.forEach((vc) => {
            voteMap[vc._id.toString()] = vc.count;
        });

        // Add voteCount to each company object
        const companiesWithVotes = companies.map((company) => ({
            ...company,
            voteCount: voteMap[company._id.toString()] || 0,
        }));

        // Return combined category and companies with votes data
        return NextResponse.json({ ...category, companies: companiesWithVotes });
    } catch (error) {
        console.error("Fetch category error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
