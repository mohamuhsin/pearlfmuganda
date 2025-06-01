"use client";

import { useState, useEffect } from "react";

// Skeleton placeholder for loading state
function PageViewsSkeleton() {
    return (
        <div className="border-t pt-6 mt-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="inline-block h-5 w-32 rounded-md bg-gray-300 animate-pulse" />
        </div>
    );
}

export default function PageViews() {
    const [views, setViews] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/page-views", { method: "POST" })
            .then((res) => res.json())
            .then((data) => {
                if (data.views !== undefined) {
                    setViews(data.views);
                } else {
                    setError(true);
                }
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []); // Run only once on mount

    if (error) {
        return (
            <div className="border-t pt-6 mt-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <span className="text-sm text-red-500">⚠️ Failed to load views</span>
            </div>
        );
    }

    if (loading || views === null) {
        return <PageViewsSkeleton />;
    }

    return (
        <div className="border-t pt-6 mt-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <span className="text-sm text-gray-500">
                👁️ {views.toLocaleString()} page views
            </span>
        </div>
    );
}
