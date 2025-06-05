import { PrismaClient } from "../lib/generated/prisma/index.js"; // Adjust path if needed

const prisma = new PrismaClient();

async function main() {
    const categories = [
        {
            name: "Halal Food",
            slug: "halal-food",
            icon: "Utensils",
            description: "Discover verified Halal restaurants and food suppliers.",
        },
        {
            name: "Travel",
            slug: "travel",
            icon: "Plane",
            description: "Explore Muslim-friendly travel and tour agencies.",
        },
        {
            name: "Muslim Schools",
            slug: "muslim-schools",
            icon: "School",
            description: "Find Islamic primary, secondary, and tertiary schools.",
        },
        {
            name: "Muslim Fashion",
            slug: "muslim-fashion",
            icon: "Shirt",
            description: "Explore modest clothing and Islamic wear.",
        },
        {
            name: "Services",
            slug: "services",
            icon: "Briefcase",
            description: "Directory for Muslim-owned service-based businesses.",
        },
        {
            name: "Herbal Clinics",
            slug: "herbal Clinics",
            icon: "Stethoscope",
            description: "Directory for Herbal Researcher businesses.",
        },
    ];

    await Promise.all(
        categories.map((category) =>
            prisma.category.upsert({
                where: { slug: category.slug },
                update: {},
                create: category,
            })
        )
    );

    console.log("✅ Categories seeded successfully.");
}

main()
    .catch((e) => {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
