import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import Company from "@/models/Company";

export async function GET() {
    await connectDB();

    try {
        const categories = await Category.find({}).lean();

        const categoriesWithCompanies = await Promise.all(
            categories.map(async (cat) => {
                const companies = await Company.find({ category: cat._id }).lean();

                const companiesWithVotes = companies.map((company) => ({
                    ...company,
                    voteCount: company.votes || 0,
                }));

                return { ...cat, companies: companiesWithVotes };
            })
        );

        return new Response(JSON.stringify(categoriesWithCompanies), {
            status: 200,
        });
    } catch (error) {
        console.error("Fetch categories error:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch categories" }),
            { status: 500 }
        );
    }
}
