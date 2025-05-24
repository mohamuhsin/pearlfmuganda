import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Define virtual field for companies
CategorySchema.virtual("companies", {
    ref: "Company",
    localField: "_id",
    foreignField: "category",
});

const Category =
    mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
