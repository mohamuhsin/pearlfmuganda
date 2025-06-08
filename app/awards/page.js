// import PageHeader from "@/components/Awards/Header";
// import AwardsCategories from "@/components/Awards/Categories";
// import PageViews from "@/components/Page Views/PageViews";

// export const metadata = {
//     title: "Ekkula Awards",
//     description: "Celebrate Brand Excellence",
// };

// export default function AwardsPage() {
//     return (
//         <div className="min-h-screen flex flex-col">
//             {/* Top Navigation */}
//             <header className="py-6">
//                 {/* Uncomment the line below when Navbar is ready */}
//                 {/* <Navbar /> */}
//             </header>

//             {/* Hero Section */}
//             <PageHeader
//                 title="Ekkula Awards 2025"
//                 description="Celebrate brand excellence. Honor achievement. Inspire greatness."
//             />

//             {/* Main Content */}
//             <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//                 <section className="py-14">
//                     <AwardsCategories />
//                 </section>
//             </main>

//             {/* Footer */}
//             <footer className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-6">
//                 <PageViews />
//             </footer>
//         </div>
//     );
// }

import Navbar from "@/components/Navbar/Navbar";
import PageHeader from "@/components/Awards/Header";
// import AwardsCategories from "@/components/Awards/Categories";
import PageViews from "@/components/Page Views/PageViews";

export const metadata = {
    title: "Ekkula Awards",
    description: "Celebrate Brand Excellence",
};

export default function AwardsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Navigation */}
            <header className="py-6">
                {/* Uncomment the line below when Navbar is ready */}
                {/* <Navbar /> */}
            </header>

            {/* Hero Section */}
            <PageHeader
                title="Ekkula Awards 2025"
                description="Celebrate brand excellence. Honor achievement. Inspire greatness."
            />

            {/* Main Content */}
            <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <section className="py-14">
                    {/* <AwardsCategories /> */}
                    <div className="text-center py-20">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            We’re Updating the System
                        </h2>
                        <p className="text-lg text-gray-600">
                            Please check back shortly. Voting will be available soon.
                        </p>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-6">
                <PageViews />
            </footer>
        </div>
    );
}
