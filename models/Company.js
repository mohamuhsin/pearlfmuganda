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
        votes: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Company =
    mongoose.models.Company || mongoose.model("Company", companySchema);

export default Company;
