import PageHeader from "@/components/Awards/Header";

export const metadata = {
    title: "Events",
    description: "Upcoming and past events we organize and participate in.",
};

export default function EventsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Navigation */}
            <header className="py-6">{/*<Navbar />*/}</header>

            {/* Hero Section */}
            <PageHeader title="Events" description="Inspiration. Faith. Learning." />

            {/* Main Content */}
            <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <section className="py-14"></section>
            </main>
        </div>
    );
}
