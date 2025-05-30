"use client";

import { useEffect, useState } from "react";

export default function PageViews() {
    const [views, setViews] = useState(null);

    useEffect(() => {
        const fetchViews = async () => {
            try {
                const res = await fetch("/api/page-views", { method: "POST" });
                const data = await res.json();
                setViews(data.views);
            } catch (err) {
                console.error("Error fetching page views:", err);
            }
        };

        fetchViews();
    }, []);

    return (
        <div className="border-t pt-6 mt-6 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {views !== null ? (
                <span className="text-sm text-gray-500">
                    👁️ {views.toLocaleString()} page views
                </span>
            ) : (
                "Loading views..."
            )}
        </div>
    );
}
