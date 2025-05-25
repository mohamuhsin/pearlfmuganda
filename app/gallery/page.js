import PageHeader from "@/components/Awards/Header";

export const metadata = {
    title: "Gallery",
    description:
        "A collection of photos and videos showcasing our work and moments.",
};

export default function GalleryPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Navigation */}
            <header className="py-6">{/*<Navbar />*/}</header>

            {/* Hero Section */}
            <PageHeader
                title="Gallery"
                description="Moments. Connection. Devotion."
            />

            {/* Main Content */}
            <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <section className="py-14"></section>
            </main>
        </div>
    );
}
