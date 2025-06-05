"use client";

import Link from "next/link";
import {
    Briefcase,
    Plane,
    School,
    Shirt,
    Utensils,
    Stethoscope,
} from "lucide-react";

const icons = {
    Utensils,
    Plane,
    School,
    Shirt,
    Briefcase,
    Stethoscope,
};

export default function BusinessCategories({ categories = [] }) {
    if (!categories.length) {
        return (
            <div className="text-center text-gray-500 py-12 italic">
                No categories found.
            </div>
        );
    }

    return (
        <div className="-mx-2 sm:-mx-4 lg:-mx-6">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-4 lg:px-6">
                {categories.map(({ id, name, slug, icon }) => {
                    const IconComponent = icons[icon] || Briefcase;

                    return (
                        <Link
                            key={id}
                            href={`/halal-business/category/${slug}`}
                            className="group"
                            aria-label={`Navigate to ${name}`}
                        >
                            <div
                                className="
                  flex flex-col items-center justify-center
                  bg-white rounded-3xl
                  border border-gray-200
                  shadow-md
                  py-6 px-4
                  transition-transform duration-300
                  hover:shadow-xl hover:-translate-y-1
                  cursor-pointer
                  min-h-[200px]
                "
                            >
                                {/* Icon */}
                                <div
                                    className="
                    flex items-center justify-center
                    w-20 h-20
                    rounded-full
                    border-4 border-[#0c0076]
                    bg-white
                    mb-4
                    group-hover:border-[#ff7e1c]
                    transition-colors duration-300
                  "
                                >
                                    <div
                                        className="
                      flex items-center justify-center
                      w-16 h-16
                      rounded-full
                      bg-[#0c0076]
                      text-white
                      group-hover:bg-[#ff7e1c]
                      transition-colors duration-300
                    "
                                    >
                                        <IconComponent className="w-8 h-8" />
                                    </div>
                                </div>

                                {/* Title */}
                                <h3
                                    className="
                    text-gray-900 font-extrabold
                    text-lg
                    text-center
                    tracking-wide
                    select-none
                  "
                                >
                                    {name}
                                </h3>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
