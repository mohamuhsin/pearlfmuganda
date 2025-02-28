import Donation from "@/components/Donation/Donation";
import Navbar from "@/components/Navbar/Navbar"; // Ensure folder name consistency

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow"></main>
    </div>
  );
}
