import Link from "next/link";
import { FaFacebookF, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";

export default function Follow() {
    const currentYear = new Date().getFullYear();

    return (
        <section
            className="bg-gray-900 py-12 text-white"
            aria-labelledby="follow-section"
        >
            <div className="max-w-screen-lg mx-auto px-6 text-center">
                {/* Heading */}
                <h2
                    id="follow-section"
                    className="text-4xl sm:text-5xl font-extrabold leading-snug mb-8"
                >
                    Let&apos;s Connect
                </h2>

                {/* Short Description */}
                <p className="text-lg sm:text-xl text-gray-400 mb-8">
                    Connect with us on social media for the latest updates and content
                    from Pearl FM.
                </p>

                {/* Social Media Icons */}
                <div className="mt-12 flex justify-center gap-8 sm:gap-12">
                    <SocialIcon
                        href="https://x.com/pearlfm"
                        icon={<FaXTwitter />}
                        label="Follow on X"
                        color="hover:text-[#1DA1F2]"
                    />
                    <SocialIcon
                        href="https://www.facebook.com/pearlfm/"
                        icon={<FaFacebookF />}
                        label="Follow on Facebook"
                        color="hover:text-[#1877F2]"
                    />
                    <SocialIcon
                        href="https://www.tiktok.com/@pearlfm"
                        icon={<FaTiktok />}
                        label="Follow on TikTok"
                        color="hover:text-[#69C9D0]"
                    />
                    <SocialIcon
                        href="https://www.youtube.com/@pearlfm"
                        icon={<FaYoutube />}
                        label="Subscribe on YouTube"
                        color="hover:text-[#FF0000]"
                    />
                </div>
            </div>

            {/* Copyright Section */}
            <footer className="mt-12 text-center border-t border-gray-700 pt-6 px-6 sm:px-8">
                <p className="text-gray-400 text-base sm:text-lg">
                    © {currentYear} Pearl Of Africa Radio. All rights reserved. | Site
                    managed by{" "}
                    <Link
                        href="https://iventics.com"
                        className="font-semibold hover:text-white hover:underline transition-colors"
                    >
                        Iventics Technologies
                    </Link>
                </p>
            </footer>
        </section>
    );
}

function SocialIcon({ href, icon, label, color }) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-white text-5xl transition-transform transform hover:scale-125 ${color} drop-shadow-md hover:drop-shadow-xl`}
            aria-label={label}
        >
            {icon}
        </Link>
    );
}
