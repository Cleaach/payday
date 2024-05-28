import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        user: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            required: true
        }
    },
    {
        // Automatically add two fields to documents: createdAt and updatedAt
        timestamps: true
    }
)


export const Transaction = mongoose.model('Transaction', transactionSchema);
