import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import Company from "@/models/Company";

export async function GET() {
    await connectDB();

    try {
        // Fetch categories with their companies embedded or separately fetched
        const categories = await Category.find({}).lean();

        // For each category, fetch related companies (assuming you have a ref)
        const categoriesWithCompanies = await Promise.all(
            categories.map(async (cat) => {
                const companies = await Company.find({ category: cat._id }).lean();
                return { ...cat, companies };
            })
        );

        return new Response(JSON.stringify(categoriesWithCompanies), {
            status: 200,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to fetch categories" }),
            { status: 500 }
        );
    }
}
