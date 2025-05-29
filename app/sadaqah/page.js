import PageHeader from "@/components/Awards/Header";

export const metadata = {
    title: "Sadaqah",
    description: "Give with purpose. Support those in need. Earn lasting reward.",
};

export default function SadaqahPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Navigation */}
            <header className="py-6">{/*<Navbar />*/}</header>

            {/* Hero Section */}
            <PageHeader
                title="Doors of Sadaqah"
                description="Charity for the sake of Allah."
            />

            {/* Main Content */}
            <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <section className="py-14"></section>
            </main>
        </div>
    );
}
