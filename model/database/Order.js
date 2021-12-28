const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("mongoose-validator");

const OrderSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        validate: [
            validator({
                validator: "isEmail",
                message: "Oops..please enter valid email",
            }),
        ],
    },
    orderCode: {
        type: String,
        required: [true, "Order code is required"],
        unique: true,
    },
    fullName: {
        type: String,
        required: [true, "Full Name is required"],
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    products: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity can not be less then 1."],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },
        sku: {
            type: String,
            required: [true, "Sku is required"],
        },
        discount: {
            type: Object,
        },
        total: {
            type: Number,
        },
    }, ],
    orderDate: {
        type: Date,
    },
    intendedArrivalDate: {
        type: String,
    },
    payments: {
        type: String,
        enum: ["Momo", "COD", "Bank account", "Paypal"],
    },
    imagePayment: {
        type: String,
        default: null,
    },
    temporaryMoney: {
        type: Number,
        required: [true, "Temporary money is required"],
    },
    transportFee: {
        type: Number,
        required: [true, "Transport fee is required"],
    },
    totalProduct: {
        default: 0,
        type: Number,
    },
    totalPayment: {
        default: 0,
        type: Number,
    },
    orderStatus: {
        type: String,
        enum: [
            "Waiting for confirmation",
            "Waiting for the goods",
            "Delivered to the carrier",
            "Delivering",
            "Successful delivery",
            "Has received the goods",
            "Cancel order",
            "Return the goods/ Refund",
        ],
        default: "Waiting for confirmation",
    },
    voucherCode: {
        type: String,
        trim: true,
        default: null,
    },
    discount: {
        type: Number,
    },
    note: {
        type: String,
    },
    isBill: {
        type: Boolean,
        default: false,
    },
    isFeedback: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

OrderSchema.virtual("product_detail", {
    ref: "Product",
    foreignField: "_id",
    localField: "products.id",
    justOne: true,
});

module.exports = mongoose.model("Order", OrderSchema);