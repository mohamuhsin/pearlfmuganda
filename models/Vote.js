// models/Vote.js
import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number.'],
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'verified'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Prevent multiple votes by same phone number per category
voteSchema.index({ phone: 1, category: 1 }, { unique: true });

export default mongoose.models.Vote || mongoose.model('Vote', voteSchema);
