import PageHeader from "@/components/Awards/Header";

export const metadata = {
    title: "About Us",
    description: "Who We Are — Our story, mission, and values.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Navigation */}
            <header className="py-6">{/*<Navbar />*/}</header>

            {/* Hero Section */}
            <PageHeader
                title="About Us"
                description="Knowledge. Faith. Empowerment."
            />

            {/* Main Content */}
            <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <section className="py-14"></section>
            </main>
        </div>
    );
}
