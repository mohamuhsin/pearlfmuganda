import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String, // This will store the image path (e.g., "/images/categories/tourism.jpg")
        required: true, // Optional: remove `required` if some categories don't need images
    },
});

const Category =
    mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
