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
        await fetchCategories(); // Refresh all categories after successful vote verification
    };

    // New handler to fetch fresh data for a single category when "See Results" clicked
    const handleToggleResults = async (index, categoryId) => {
        if (openIndex === index) {
            // Close the results if already open
            setOpenIndex(null);
            return;
        }

        try {
            const res = await fetch(`/api/categories/${categoryId}`);
            if (!res.ok) throw new Error("Failed to fetch category results");
            const data = await res.json();

            setCategories((prev) => {
                const newCats = [...prev];
                newCats[index] = data; // Replace the category at index with fresh data
                return newCats;
            });

            setOpenIndex(index);
        } catch (error) {
            console.error(error);
            // Optional: set error state to show user
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
                <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((cat, index) => (
                        <div
                            key={cat._id}
                            className="self-start rounded-3xl overflow-hidden shadow-xl bg-white flex flex-col hover:shadow-2xl transition duration-300"
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
                                <h3 className="text-xl font-semibold text-center text-gray-800 mb-6 min-h-[60px]">
                                    {cat.name}
                                </h3>

                                <div className="flex flex-col gap-4 mt-auto">
                                    <button
                                        onClick={() => setSelectedCategory(cat)}
                                        className="bg-[#ff7d1c] text-white text-sm font-medium py-2 rounded-lg hover:scale-[1.02] transition"
                                    >
                                        Vote Now
                                    </button>

                                    <div className="text-sm rounded-md border border-gray-200 px-4 py-2 bg-gray-50 transition-all">
                                        <button
                                            className="w-full text-left cursor-pointer text-[#ff7d1c] font-semibold"
                                            onClick={() => handleToggleResults(index, cat._id)}
                                        >
                                            See Results
                                        </button>
                                        {openIndex === index && (
                                            <ul className="mt-2 divide-y divide-gray-200">
                                                {cat.companies?.length > 0 ? (
                                                    cat.companies.map((company) => (
                                                        <li
                                                            key={company._id}
                                                            className="flex justify-between py-1 text-gray-700"
                                                        >
                                                            <span>{company.name}</span>
                                                            <span>{company.voteCount || 0} votes</span>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="text-gray-500 py-2">
                                                        No companies yet.
                                                    </li>
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <VoteModal
                isOpen={!!selectedCategory}
                onClose={() => setSelectedCategory(null)}
                category={selectedCategory}
                onVoteSuccess={handleVoteSuccess} // Trigger category refresh after vote
            />
        </section>
    );
}
