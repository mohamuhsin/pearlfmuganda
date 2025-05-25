// seedCategories.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/Category.js";

dotenv.config();

const categories = [
    {
        name: "Travel Agency Excellence Award",
        image: "/categories/ekkula-awards.jpeg",
    },
    {
        name: "Agri Based Products Excellence Award",
        image: "/categories/ekkula-awards.jpeg",
    },
    {
        name: "Beverage Excellence Award",
        image: "/categories/ekkula-awards.jpeg",
    },
    {
        name: "Halal Restaurants Excellence Award",
        image: "/categories/ekkula-awards.jpeg",
    },
    {
        name: "Paints Excellence Award",
        image: "/categories/ekkula-awards.jpeg",
    },
    {
        name: "Energy & Gas Supplier Excellence Award",
        image: "/categories/ekkula-awards.jpeg",
    },
    {
        name: "Real Estate & Property Mgt Excellence Award",
        image: "/categories/ekkula-awards.jpeg",
    },
    {
        name: "Recruitment Excellence Award",
        image: "/categories/ekkula-awards.jpeg",
    },
    {
        name: "Agencies & FMCG Distributors Excellence Award",
        image: "/categories/ekkula-awards.jpeg",
    },
    {
        name: "Muslim Fashion Excellence Award",
        image: "/categories/ekkula-awards.jpeg",
    },
    {
        name: "Telecom Excellence Award",
        image: "/categories/ekkula-awards.jpeg",
    },
    {
        name: "Herbal Researcher Excellence Award",
        image: "/categories/ekkula-awards.jpeg",
    },
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        for (const category of categories) {
            await Category.findOneAndUpdate({ name: category.name }, category, {
                upsert: true,
                new: true,
            });
        }

        console.log("Seeding done!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
}

seed();
