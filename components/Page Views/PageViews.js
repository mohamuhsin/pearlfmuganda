"use client";

import useSWR from "swr";

const fetcher = (url) =>
    fetch(url, { method: "POST" }).then((res) => res.json());

// Skeleton placeholder for PageViews
function PageViewsSkeleton() {
    return (
        <div className="border-t pt-6 mt-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Gray rounded rectangle mimicking the text size */}
            <div className="inline-block h-5 w-32 rounded-md bg-gray-300 animate-pulse" />
        </div>
    );
}

export default function PageViews() {
    const { data, error, isLoading } = useSWR("/api/page-views", fetcher);

    return (
        <div className="border-t pt-6 mt-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {error ? (
                <span className="text-sm text-red-500">⚠️ Failed to load views</span>
            ) : isLoading || !data?.views ? (
                <PageViewsSkeleton />
            ) : (
                <span className="text-sm text-gray-500">
                    👁️ {data.views.toLocaleString()} page views
                </span>
            )}
        </div>
    );
}
