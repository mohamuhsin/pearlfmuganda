import PageHeader from "@/components/Awards/Header";

export const metadata = {
    title: "Dawah",
    description: "Spreading Islamic teachings and inspiring faith.",
};

export default function DawahPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Navigation */}
            <header className="py-6">{/*<Navbar />*/}</header>

            {/* Hero Section */}
            <PageHeader title="Dawa" description="Faith. Guidance. Unity." />

            {/* Main Content */}
            <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <section className="py-14"></section>
            </main>
        </div>
    );
}
