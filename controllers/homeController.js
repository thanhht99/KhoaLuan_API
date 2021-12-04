const ErrorResponse = require("../model/statusResponse/ErrorResponse");
const SuccessResponse = require("../model/statusResponse/SuccessResponse");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const Product = require("../model/database/Product");

exports.bestSeller = asyncMiddleware(async(req, res, next) => {
    const products = await Product.find({ isActive: true }).select(
        "-updatedAt -createdAt -__v"
    );
    console.log("🚀🚀🚀🚀🚀 ~ products.length", products.length);

    const sortProducts = products.sort((a, b) => b.sold - a.sold);
    const bestSales = [
        sortProducts[0],
        sortProducts[1],
        sortProducts[2],
        sortProducts[3],
    ];
    res.status(200).json(new SuccessResponse(200, bestSales));
});