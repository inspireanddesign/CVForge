import mongoose, { Schema, model, models } from 'mongoose';

// User Schema
const cvSchema = new Schema({
    personalInfo: {
        firstName: String,
        lastName: String,
        title: String,
        email: String,
        phone: String,
        address: String,
        photo: String,
        additionalFields: [],
    },
    profile: String,
    education: Array,
    experiences: Array,
    skills: Array,
    languages: Array,
    interests: Array,
    // email: String,
    // message: String,
    createdAt: { type: Date, default: Date.now }
});

export const Cv = models.Cv || model('Cv', cvSchema);