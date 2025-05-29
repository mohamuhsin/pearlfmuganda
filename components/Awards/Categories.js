"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import VoteModal from "./VoteModal";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openIndex, setOpenIndex] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/categories");
            if (!res.ok) throw new Error("Failed to fetch categories");
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleVoteSuccess = async () => {
        await fetchCategories();
    };

    const handleToggleResults = async (index, categoryId) => {
        if (openIndex === index) {
            setOpenIndex(null);
            return;
        }

        try {
            const res = await fetch(`/api/categories/${categoryId}`);
            if (!res.ok) throw new Error("Failed to fetch category results");
            const data = await res.json();

            setCategories((prev) => {
                const newCats = [...prev];
                newCats[index] = data;
                return newCats;
            });

            setOpenIndex(index);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-14 text-gray-800">
                Explore Award Categories
            </h2>

            {loading && (
                <p className="text-center text-gray-600 py-10">Loading categories...</p>
            )}
            {error && (
                <p className="text-center text-red-600 py-10">Error: {error}</p>
            )}

            {!loading && !error && (
                <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {categories.map((cat, index) => (
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
                                                ></path>
                                            </svg>
                                        </button>

                                        <div
                                            className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index
                                                ? "max-h-[400px] opacity-100 mt-4 overflow-y-auto"
                                                : "max-h-0 opacity-0 mt-0 overflow-hidden"
                                                }`}
                                            aria-hidden={openIndex !== index}
                                        >
                                            {cat.companies?.length > 0 ? (
                                                <>
                                                    <div className="flex justify-between px-2 text-xs text-gray-500 font-semibold uppercase border-b border-gray-200 pb-1 mb-3 tracking-wide">
                                                        <span className="w-3/4">Nominees</span>
                                                        <span className="w-1/4 text-right">Votes</span>
                                                    </div>
                                                    <ul className="space-y-0">
                                                        {cat.companies
                                                            .slice()
                                                            .sort(
                                                                (a, b) =>
                                                                    (b.voteCount || 0) - (a.voteCount || 0)
                                                            )
                                                            .map((company, idx) => (
                                                                <li
                                                                    key={company._id}
                                                                    className={`flex justify-between items-center py-2 px-2 rounded hover:bg-gray-100 transition ${idx !== cat.companies.length - 1
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
                    ))}
                </div>
            )}

            <VoteModal
                isOpen={!!selectedCategory}
                onClose={() => setSelectedCategory(null)}
                category={selectedCategory}
                onVoteSuccess={handleVoteSuccess}
            />
        </section>
    );
}
