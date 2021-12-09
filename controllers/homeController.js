const ErrorResponse = require("../model/statusResponse/ErrorResponse");
const SuccessResponse = require("../model/statusResponse/SuccessResponse");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const Product = require("../model/database/Product");
const Voucher = require("../model/database/Voucher");

exports.bestSeller = asyncMiddleware(async(req, res, next) => {
    try {
        const products = await Product.find({ isActive: true }).select(
            "-updatedAt -__v"
        );

        const sortProducts = products.sort((a, b) => b.sold - a.sold);
        const bestSales = [
            sortProducts[0],
            sortProducts[1],
            sortProducts[2],
            sortProducts[3],
        ];
        res.status(200).json(new SuccessResponse(200, bestSales));
    } catch (err) {
        return next(new ErrorResponse(500, err));
    }
});

exports.newProducts = asyncMiddleware(async(req, res, next) => {
    try {
        const products = await Product.find({ isActive: true }).select(
            "-updatedAt -__v"
        );

        const sortProducts = products.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const newProducts = [
            sortProducts[0],
            sortProducts[1],
            sortProducts[2],
            sortProducts[3],
        ];
        res.status(200).json(new SuccessResponse(200, newProducts));
    } catch (err) {
        return next(new ErrorResponse(500, err));
    }
});

exports.vouchers = asyncMiddleware(async(req, res, next) => {
    try {
        const vouchers = await Voucher.find({ isActive: true }).select(
            "-updatedAt -__v"
        );

        const sortVouchers = vouchers.sort(
            (a, b) => new Date(b.startDate) - new Date(a.startDate)
        );
        const newVouchers = [
            sortVouchers[0],
            sortVouchers[1],
            sortVouchers[2],
            sortVouchers[3],
        ];
        res.status(200).json(new SuccessResponse(200, newVouchers));
    } catch (err) {
        return next(new ErrorResponse(500, err));
    }
});