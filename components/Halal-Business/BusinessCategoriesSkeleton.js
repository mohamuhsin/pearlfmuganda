"use client";

export default function BusinessCategoriesSkeleton() {
    const skeletons = Array.from({ length: 6 });

    return (
        <div className="-mx-2 sm:-mx-4 lg:-mx-6">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-4 lg:px-6">
                {skeletons.map((_, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col items-center justify-center bg-white rounded-3xl border border-gray-200 shadow-md py-6 px-4 min-h-[200px] animate-pulse"
                    >
                        {/* Outer ring (icon border) */}
                        <div className="flex items-center justify-center w-20 h-20 rounded-full border-4 border-gray-300 bg-white mb-4">
                            {/* Inner icon circle */}
                            <div className="w-16 h-16 rounded-full bg-gray-200" />
                        </div>

                        {/* Text block */}
                        <div className="w-24 h-4 bg-gray-200 rounded mt-2" />
                    </div>
                ))}
            </div>
        </div>
    );
}
