import Follow from "@/components/Footer/Footer";
import CampaignSection from "@/components/Charity/CampaignSection";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
    title: "Islamise Kyegegwa",
    description: "Bring Light to the people of Kyegegwa",
};

export default function Home() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main>
                <CampaignSection />
            </main>
            <Follow />
        </div>
    );
}
