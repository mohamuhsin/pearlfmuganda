import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <div className="h-16 flex items-center justify-center">
            <Link href="/">
                <Image
                    src="/pearlfmlogo.png"
                    alt="Pearl FM Logo"
                    width={100}
                    height={50}
                    priority
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 100px"
                    style={{ maxWidth: "100%", height: "auto" }} // Ensures full responsiveness
                />
            </Link>
        </div>
    );
}
