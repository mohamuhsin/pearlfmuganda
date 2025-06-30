"use client";

import { useState, useCallback } from "react";
import useSWR from "swr";
import Image from "next/image";
import VoteModal from "./VoteModal";
import CategoriesHeader from "./CategoriesHeader";

/* -------------------------------------------------------------------------- */
/*                               Data fetcher                                 */
/* -------------------------------------------------------------------------- */
const fetcher = (url) => fetch(url).then((res) => res.json());

/* -------------------------------------------------------------------------- */
/*                           Loading skeleton card                            */
/* -------------------------------------------------------------------------- */
function SkeletonCard() {
    return (
        <article className="rounded-3xl overflow-hidden shadow-xl bg-white flex flex-col">
            <div className="relative w-full h-56 md:h-64 lg:h-72">
                <div className="absolute inset-0 bg-gray-300 animate-pulse" />
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow">
                <div className="bg-gray-300 rounded w-3/4 mx-auto mb-6 h-[60px] animate-pulse" />
                <div className="flex flex-col gap-4 mt-auto">
                    <div className="bg-gray-300 h-10 rounded w-full animate-pulse" />
                    <div className="bg-gray-200 h-12 rounded w-full mt-2 animate-pulse" />
                </div>
            </div>
        </article>
    );
}

/* -------------------------------------------------------------------------- */
/*                           Results list (accordion)                         */
/* -------------------------------------------------------------------------- */
function ResultsList({ companies, loading }) {
    if (loading) {
        return (
            <ul className="space-y-2" aria-busy="true">
                {[...Array(4)].map((_, i) => (
                    <li key={i} className="flex justify-between items-center py-2 px-2">
                        <div className="bg-gray-300 h-4 rounded w-3/4 animate-pulse" />
                        <div className="bg-gray-300 h-4 rounded w-1/4 animate-pulse" />
                    </li>
                ))}
            </ul>
        );
    }

    if (!companies?.length) {
        return <p className="text-gray-500 py-3 text-center">No companies yet.</p>;
    }

    return (
        <>
            <div className="flex justify-between px-2 text-xs text-gray-500 font-semibold uppercase border-b border-gray-200 pb-1 mb-3 tracking-wide">
                <span className="w-3/4">Nominees</span>
                <span className="w-1/4 text-right">Votes</span>
            </div>
            <ul className="space-y-0">
                {companies
                    .slice()
                    .sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0))
                    .map((company, idx, arr) => (
                        <li
                            key={company._id}
                            className={`flex justify-between items-center py-2 px-2 rounded hover:bg-gray-100 transition ${idx !== arr.length - 1 ? "border-b border-gray-300" : ""
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
    );
}

/* -------------------------------------------------------------------------- */
/*                              Main component                                */
/* -------------------------------------------------------------------------- */
export default function Categories() {
    const {
        data: categories,
        error,
        mutate,
    } = useSWR("/api/categories", fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 1000 * 60 * 5,
    });

    const [openIndex, setOpenIndex] = useState(null);
    const [loadingIndex, setLoadingIndex] = useState(null);
    const [resultsCache, setResultsCache] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleVoteSuccess = () => {
        mutate();
    };

    const handleToggleResults = useCallback(
        async (index, categoryId) => {
            if (openIndex === index) {
                setOpenIndex(null);
                return;
            }

            if (resultsCache[categoryId]) {
                setOpenIndex(index);
                return;
            }

            setLoadingIndex(index);
            try {
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
        },
        [openIndex, resultsCache]
    );

    if (error) {
        return (
            <p className="text-center text-red-600 py-10">Error: {error.message}</p>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4">
            <CategoriesHeader />

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
                                            className="bg-[#ff7d1c] text-white text-sm font-medium py-2 rounded-lg hover:scale-[1.02] transition" disabled
                                        >
                                            Voting Ended
                                        </button>

                                        <div
                                            className="text-sm rounded-md border border-gray-200 px-4 py-2 bg-gray-50 transition-all"
                                            aria-live="polite"
                                        >
                                            <button
                                                className="w-full flex items-center justify-between cursor-pointer text-[#ff7d1c] font-semibold disabled:opacity-50"
                                                onClick={() => handleToggleResults(index, cat._id)}
                                                aria-expanded={openIndex === index}
                                                aria-controls={`results-list-${index}`}
                                                disabled={loadingIndex === index}
                                            >
                                                <span>
                                                    {loadingIndex === index
                                                        ? "Loading..."
                                                        : "See Results"}
                                                </span>
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
                                                aria-busy={loadingIndex === index}
                                            >
                                                <ResultsList
                                                    companies={categoryResults.companies}
                                                    loading={loadingIndex === index}
                                                />
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
