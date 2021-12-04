const ErrorResponse = require("../model/statusResponse/ErrorResponse");
const SuccessResponse = require("../model/statusResponse/SuccessResponse");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const Product = require("../model/database/Product");
const SimpleLinearRegression = require("ml-regression-simple-linear");

exports.test = asyncMiddleware(async(req, res, next) => {
    const a = [5, 4, 3, 4, 1];
    const b = [15, 10, 15, 21, 5];
    let x = [];
    b.map((val, index) => {
        x.push(val / a[index]);
    });
    const y = [79.51, 71.51, 131.88, 331.18, 40];

    const regression = new SimpleLinearRegression(x, y);

    regression.slope; // 2 (độ dốc)
    regression.intercept; // -1 (bị chắn)
    regression.coefficients; // [-1, 2] (hệ số)

    regression.predict(3); // 5 (dự đoán)
    const f = regression.computeX(3.5); // 2.25 'f(3.5) = 2 * x - 1'

    const g = regression.toString(); // 'f(x) = 2 * x - 1'

    const h = regression.score(x, y); // { r: 1, r2: 1, chi2: 0, rmsd: 0 }

    const json = regression.toJSON();
    // { name: 'simpleLinearRegression', slope: 2, intercept: -1 }
    const loaded = SimpleLinearRegression.load(json);
    const t = loaded.predict(15); // 9

    console.log("👻👻👻👻👻👻", x, h, g);

    res.status(200).json(new SuccessResponse(200, t));
});

exports.bestSeller = asyncMiddleware(async(req, res, next) => {
    const products = await Product.find().select("-updatedAt -createdAt -__v");
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