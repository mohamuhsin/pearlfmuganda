// import mongoose from "mongoose";

// const voteSchema = new mongoose.Schema({
//     phone: {
//         type: String,
//         required: true,
//         match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"],
//     },
//     company: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Company",
//         required: true,
//     },
//     category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Category",
//         required: true,
//     },
//     status: {
//         type: String,
//         enum: ["pending", "verified"],
//         default: "pending",
//     },
//     otpCode: String,
//     otpExpiresAt: Date,
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// // Prevent multiple votes by same phone number per category
// voteSchema.index({ phone: 1, category: 1 }, { unique: true });

// export default mongoose.models.Vote || mongoose.model("Vote", voteSchema);

import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true, // Stored as raw E.164 phone number (e.g., +2567XXXXXXXX)
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        fingerprint: {
            type: String,
            required: false, // Stored as-is, no hashing
        },
        ip: {
            type: String,
            required: false,
        },
        userAgent: {
            type: String,
        },
        status: {
            type: String,
            enum: ["pending", "verified"],
            default: "verified",
        },
    },
    { timestamps: true }
);

// Prevent multiple votes from same phone number per category
voteSchema.index({ phone: 1, category: 1 }, { unique: true });

// Prevent multiple votes from same fingerprint per category
voteSchema.index(
    { fingerprint: 1, category: 1 },
    { unique: true, partialFilterExpression: { fingerprint: { $exists: true } } }
);

// Useful for detecting multiple votes from the same IP
voteSchema.index({ ip: 1, category: 1 });

export default mongoose.models.Vote || mongoose.model("Vote", voteSchema);
