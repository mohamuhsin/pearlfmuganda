import PageHeader from "@/components/Awards/Header";
import BusinessCategories from "@/components/Halal-Business/Categories";
import CategoriesHeader from "@/components/Halal-Business/CategoriesHeader";
import { prisma } from "@/lib/prisma"; // call DB directly (no fetch)

export const metadata = {
    title: "Halal Business Directory | Pearl FM",
    description: "Discover and support verified Halal businesses in Uganda.",
};

export default async function HalalBusinessPage() {
    // Fetch directly from the database on the server
    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
    });

    return (
        <div className="min-h-screen flex flex-col">
            <header className="py-6">{/* Optional Navbar */}</header>

            <PageHeader
                title="Halal Businesses"
                description="Discover and support verified Halal businesses across Uganda."
            />

            <main className="flex-grow px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
                <section className="py-12 sm:py-14">
                    <CategoriesHeader />
                    <div className="mt-16">
                        <BusinessCategories categories={categories} />
                    </div>
                </section>
            </main>

            <footer className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 pb-6" />
        </div>
    );
}
