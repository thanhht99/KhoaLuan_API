const mongoose = require("mongoose");
const { Schema } = mongoose;

const FeedbackSchema = new Schema({
    orderCode: {
        type: String,
    },
    sku: {
        type: String,
        required: [true, "Sku is required"],
        unique: true,
    },
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: [true, "Rating is required"],
    },
    contentFeedback: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    toJSON: { virtuals: true },
    timestamps: true,
});

FeedbackSchema.virtual("order_detail", {
    ref: "Order",
    foreignField: "orderCode",
    localField: "orderCode",
    justOne: true,
});

module.exports = mongoose.model("Feedback", FeedbackSchema);