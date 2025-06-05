import PageHeader from "@/components/Awards/Header";
import BusinessCategories from "@/components/Halal-Business/Categories";
import CategoriesHeader from "@/components/Halal-Business/CategoriesHeader";
import { getHalalCategories } from "@/lib/data";

export const metadata = {
    title: "Halal Business Directory | Pearl FM",
    description: "Discover and support verified Halal businesses in Uganda.",
};

export default async function HalalBusinessPage() {
    const categories = await getHalalCategories();

    return (
        <div className="min-h-screen flex flex-col">
            {/* Optional header space if Navbar returns */}
            <header className="py-6">{/* <Navbar /> */}</header>

            <PageHeader
                title="Halal Businesses"
                description="Discover and support verified Halal businesses across Uganda."
            />

            {/* Responsive paddings across breakpoints */}
            <main className="flex-grow px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
                <section className="py-12 sm:py-14">
                    <CategoriesHeader />
                    {/* Increased space between header and categories */}
                    <div className="mt-16">
                        <BusinessCategories categories={categories} />
                    </div>
                </section>
            </main>

            {/* Footer with matching responsive padding */}
            <footer className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 pb-6" />
        </div>
    );
}
