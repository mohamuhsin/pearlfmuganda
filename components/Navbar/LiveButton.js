import Link from "next/link";

export function LiveButton() {
    return (
        <Link
            href="https://www.youtube.com/@pearlfmnews8016/videos"
            target="_blank"
        >
            <button
                aria-label="Watch live stream"
                className="bg-[#ec2b2b] text-[#ffffff] py-2 px-5 rounded-full text-xs md:text-sm lg:text-base font-extrabold
                       relative overflow-hidden animate-pulseWave transform translate-x-0 flex justify-center items-center shrink-0 mx-4 my-2"
            >
                WATCH LIVE
            </button>
        </Link>
    );
}
