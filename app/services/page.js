import PageHeader from "@/components/Awards/Header";

export const metadata = {
    title: "Services",
    description: "Explore the range of services we offer to meet your needs.",
};

export default function ServicesPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Navigation */}
            <header className="py-6">{/*<Navbar />*/}</header>

            {/* Hero Section */}
            <PageHeader
                title="Our Services"
                description="Advertising. Broadcasting. Education."
            />

            {/* Main Content */}
            <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <section className="py-14"></section>
            </main>
        </div>
    );
}
