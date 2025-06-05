import { prisma } from "@/lib/prisma";

// Optional: force dynamic rendering if you need always-fresh data
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: "asc" },
        });

        return new Response(JSON.stringify(categories), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=60", // cache for 1 minute
            },
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch categories" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
