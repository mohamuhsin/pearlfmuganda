import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Company ||
    mongoose.model("Company", companySchema);
