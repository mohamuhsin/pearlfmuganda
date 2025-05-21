import Navbar from "@/components/Navbar/Navbar";
import PageHeader from "@/components/Awards/Header";
import AwardsCategories from "@/components/Awards/Categories";

export const metadata = {
    title: "Ekkula Awards",
    description: "Celebrate Brand Excellence",
};

export default function AwardsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Navigation */}
            <header className="py-6">
                <Navbar />
            </header>

            {/* Hero Section */}
            <PageHeader title="Ekkula Awards 2025" />

            {/* Main Content */}
            <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <section className="py-14">
                    <AwardsCategories />
                </section>
            </main>
        </div>
    );
}
