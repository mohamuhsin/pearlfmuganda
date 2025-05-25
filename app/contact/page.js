import PageHeader from "@/components/Awards/Header";

export const metadata = {
    title: "Contact",
    description: "Get in touch with us for inquiries and support.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Navigation */}
            <header className="py-6">{/*<Navbar />*/}</header>

            {/* Hero Section */}
            <PageHeader
                title="Contact Us"
                description="Connect. Engage. Collaborate."
            />

            {/* Main Content */}
            <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <section className="py-14"></section>
            </main>
        </div>
    );
}
