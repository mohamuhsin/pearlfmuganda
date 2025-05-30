import mongoose from "mongoose";

const PageStatSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    views: { type: Number, default: 0 },
});

export default mongoose.models.PageStat || mongoose.model("PageStat", PageStatSchema);
