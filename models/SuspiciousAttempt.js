import mongoose from "mongoose";

const suspiciousAttemptSchema = new mongoose.Schema({
    ip: String,
    phone: String,
    category: mongoose.Schema.Types.ObjectId,
    fingerprint: String,
    userAgent: String,
    reason: String,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.SuspiciousAttempt ||
    mongoose.model("SuspiciousAttempt", suspiciousAttemptSchema);
