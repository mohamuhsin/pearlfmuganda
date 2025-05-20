// seedCategories.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';

dotenv.config();

const categories = [
    { name: 'Travel Agency Excellence Award' },
    { name: 'Agri Based Products Excellence Award' },
    { name: 'Beverage Excellence Award' },
    { name: 'Halal Restaurants Excellence Award' },
    { name: 'Paints Excellence Award' },
    { name: 'Energy & Gas Supplier Excellence Award' },
    { name: 'Real Estate & Property Mgt Excellence Award' },
    { name: 'Recruitment Excellence Award' },
    { name: 'Agencies & FMCG Distributors Excellence Award' },
    { name: 'Muslim Fashion Excellence Award' },
    { name: 'Telecom Excellence Award' },
    { name: 'Herbal Researcher Excellence Award' },
    { name: 'Islamic Primary School Excellence Award' },
    { name: 'Islamic Secondary School Excellence Award' },


];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        for (const category of categories) {
            // Use upsert to avoid duplicates
            await Category.findOneAndUpdate(
                { name: category.name },
                category,
                { upsert: true, new: true }
            );
        }

        console.log('Seeding done!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
}

seed();
