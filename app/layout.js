import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar/Navbar";
import Follow from "@/components/Footer/Footer";
import AudioPlayer from "@/components/Live/Player";

// Load Google Fonts
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for SEO
export const metadata = {
  title: "Pearl Fm Uganda",
  description: "Ekkula Ly'omuntu W'abulijjo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${montserrat.className} ${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <div className="flex flex-col min-h-screen">
          {/* Global Navigation */}
          <Navbar />

          {/* Main Page Content */}
          <main className="flex-grow">{children}</main>

          {/* Global Footer */}
          <Follow />

          {/* Audio Player (sticky or global) */}
          <AudioPlayer />
        </div>

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
