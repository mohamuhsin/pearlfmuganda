"use client";

import { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import VoteModal from "./VoteModal";

const fetcher = (url) => fetch(url).then((res) => res.json());

function SkeletonCard() {
    return (
        <article className="rounded-3xl overflow-hidden shadow-xl bg-white flex flex-col animate-pulse">
            <div className="relative w-full h-56 md:h-64 lg:h-72">
                <div className="absolute inset-0 bg-gray-300" />
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow">
                <div className="bg-gray-300 rounded w-3/4 mx-auto mb-6 h-[60px]" />
                <div className="flex flex-col gap-4 mt-auto">
                    <div className="bg-gray-300 h-10 rounded w-full" />
                    <div className="bg-gray-200 h-12 rounded w-full mt-2" />
                </div>
            </div>
        </article>
    );
}

export default function Categories() {
    const {
        data: categories,
        error,
        mutate,
    } = useSWR("/api/categories", fetcher);
    const [openIndex, setOpenIndex] = useState(null);
    const [loadingIndex, setLoadingIndex] = useState(null);
    const [resultsCache, setResultsCache] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);

    if (error) {
        return (
            <p className="text-center text-red-600 py-10">Error: {error.message}</p>
        );
    }

    const handleVoteSuccess = () => {
        mutate();
    };

    const handleToggleResults = async (index, categoryId) => {
        if (openIndex === index) {
            setOpenIndex(null);
            return;
        }

        if (resultsCache[categoryId]) {
            setOpenIndex(index);
            return;
        }

        try {
            setLoadingIndex(index);
            const res = await fetch(`/api/categories/${categoryId}`);
            if (!res.ok) throw new Error("Failed to fetch category results");
            const data = await res.json();

            setResultsCache((prev) => ({ ...prev, [categoryId]: data }));
            setOpenIndex(index);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingIndex(null);
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-14 text-gray-800">
                Explore Award Categories
            </h2>

            <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {!categories
                    ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
                    : categories.map((cat, index) => {
                        const categoryResults = resultsCache[cat._id] || cat;

                        return (
                            <article
                                key={cat._id}
                                className="self-start rounded-3xl overflow-hidden shadow-xl bg-white flex flex-col hover:shadow-2xl transition duration-300"
                                aria-labelledby={`category-title-${index}`}
                            >
                                <div className="relative w-full h-56 md:h-64 lg:h-72">
                                    <Image
                                        src={cat.image}
                                        alt={cat.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover"
                                        priority
                                    />
                                </div>

                                <div className="p-6 flex flex-col justify-between flex-grow">
                                    <h3
                                        id={`category-title-${index}`}
                                        className="text-xl font-semibold text-center text-gray-800 mb-6 min-h-[60px]"
                                    >
                                        {cat.name}
                                    </h3>

                                    <div className="flex flex-col gap-4 mt-auto">
                                        <button
                                            onClick={() => setSelectedCategory(cat)}
                                            className="bg-[#ff7d1c] text-white text-sm font-medium py-2 rounded-lg hover:scale-[1.02] transition"
                                        >
                                            Vote Now
                                        </button>

                                        <div
                                            className="text-sm rounded-md border border-gray-200 px-4 py-2 bg-gray-50 transition-all"
                                            aria-live="polite"
                                        >
                                            <button
                                                className="w-full flex items-center justify-between cursor-pointer text-[#ff7d1c] font-semibold"
                                                onClick={() => handleToggleResults(index, cat._id)}
                                                aria-expanded={openIndex === index}
                                                aria-controls={`results-list-${index}`}
                                            >
                                                <span>See Results</span>
                                                <svg
                                                    className={`w-5 h-5 transition-transform duration-300 ease-in-out ${openIndex === index ? "rotate-90" : "rotate-0"
                                                        }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </button>

                                            <div
                                                id={`results-list-${index}`}
                                                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index
                                                    ? "max-h-[400px] opacity-100 mt-4 overflow-y-auto"
                                                    : "max-h-0 opacity-0 mt-0 overflow-hidden"
                                                    }`}
                                                aria-hidden={openIndex !== index}
                                                role="region"
                                                aria-labelledby={`category-title-${index}`}
                                            >
                                                {loadingIndex === index ? (
                                                    <ul className="space-y-2 animate-pulse">
                                                        {[...Array(4)].map((_, i) => (
                                                            <li
                                                                key={i}
                                                                className="flex justify-between items-center py-2 px-2"
                                                            >
                                                                <div className="bg-gray-300 h-4 rounded w-3/4" />
                                                                <div className="bg-gray-300 h-4 rounded w-1/4" />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : categoryResults.companies?.length > 0 ? (
                                                    <>
                                                        <div className="flex justify-between px-2 text-xs text-gray-500 font-semibold uppercase border-b border-gray-200 pb-1 mb-3 tracking-wide">
                                                            <span className="w-3/4">Nominees</span>
                                                            <span className="w-1/4 text-right">Votes</span>
                                                        </div>
                                                        <ul className="space-y-0">
                                                            {categoryResults.companies
                                                                .slice()
                                                                .sort(
                                                                    (a, b) =>
                                                                        (b.voteCount || 0) - (a.voteCount || 0)
                                                                )
                                                                .map((company, idx) => (
                                                                    <li
                                                                        key={company._id}
                                                                        className={`flex justify-between items-center py-2 px-2 rounded hover:bg-gray-100 transition ${idx !==
                                                                            categoryResults.companies.length - 1
                                                                            ? "border-b border-gray-300"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        <div
                                                                            title={company.name}
                                                                            className="truncate font-medium text-gray-800 w-3/4"
                                                                        >
                                                                            {company.name}
                                                                        </div>
                                                                        <div className="text-right text-gray-700 font-semibold w-1/4">
                                                                            {company.voteCount || 0}
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                        </ul>
                                                    </>
                                                ) : (
                                                    <p className="text-gray-500 py-3 text-center">
                                                        No companies yet.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
            </div>

            <VoteModal
                isOpen={!!selectedCategory}
                onClose={() => setSelectedCategory(null)}
                category={selectedCategory}
                onVoteSuccess={handleVoteSuccess}
            />
        </section>
    );
}
