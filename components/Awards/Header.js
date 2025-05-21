export default function PageHeader({ title }) {
    return (
        <header className="relative bg-gradient-to-br from-[#2d2d30] to-[#180f4b] text-white min-h-[400px] flex items-center justify-center px-4 overflow-hidden shadow-xl">
            {/* Dark Elegant Crosshatch Pattern */}
            <svg
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin meet"
            >
                <defs>
                    <pattern
                        id="darkCrosshatch"
                        width="60"
                        height="60"
                        patternUnits="userSpaceOnUse"
                        patternTransform="rotate(45)"
                    >
                        <line
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="60"
                            stroke="rgba(255,255,255,0.03)"
                            strokeWidth="1"
                        />
                        <line
                            x1="30"
                            y1="0"
                            x2="30"
                            y2="60"
                            stroke="rgba(255,255,255,0.03)"
                            strokeWidth="1"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#darkCrosshatch)" />
            </svg>

            {/* Soft Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent)] pointer-events-none" />

            {/* Decorative SVG Wave */}
            <svg
                className="absolute bottom-0 left-0 w-full h-32 md:h-40 pointer-events-none"
                viewBox="0 0 1440 320"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <path
                    fill="#ffffff"
                    fillOpacity="0.03"
                    d="M0,160L60,154.7C120,149,240,139,360,144C480,149,600,171,720,165.3C840,160,960,128,1080,133.3C1200,139,1320,181,1380,202.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                />
            </svg>

            {/* Title Content */}
            <div className="relative z-10 text-center max-w-5xl px-4">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
                    {title}
                </h1>
                <p className="mt-4 text-base sm:text-lg md:text-xl text-white/70">
                    Celebrate brand excellence. Honor achievement. Inspire greatness.
                </p>
            </div>
        </header>
    );
}
