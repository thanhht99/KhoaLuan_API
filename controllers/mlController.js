const ErrorResponse = require("../model/statusResponse/ErrorResponse");
const SuccessResponse = require("../model/statusResponse/SuccessResponse");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const Product = require("../model/database/Product");
const Order = require("../model/database/Order");
const SimpleLinearRegression = require("ml-regression-simple-linear");

exports.test = asyncMiddleware(async(req, res, next) => {
    const orders = await Order.find({ isActive: true }).select("-updatedAt -__v");
    if (!orders) {
        return next(new ErrorResponse(404, "Orders is not available"));
    }

    const sortOrders = orders.sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
    );
    let x = [];
    let y = [];
    sortOrders.forEach((item) => {
        x.push(item.totalProduct);
        y.push(item.temporaryMoney);
    });
    console.log("🧧🧧🧧🧧🧧🧧", x, y);

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

    console.log("👻👻👻👻👻👻", h, g);

    res.status(200).json(new SuccessResponse(200, t));
});

exports.revenuePrediction = asyncMiddleware(async(req, res, next) => {
    const orders = await Order.find({ isActive: true }).select("-updatedAt -__v");
    if (!orders) {
        return next(new ErrorResponse(404, "Orders is not available"));
    }
    const { quantity } = req.body;

    const sortOrders = orders.sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
    );
    let x = [];
    let y = [];
    let dateSort = [];
    let updateDate = sortOrders.map((item) => {
        const date = item.orderDate.getDate();
        const month = item.orderDate.getMonth() + 1;
        const year = item.orderDate.getFullYear();
        const data = date + "/" + month + "/" + year;
        dateSort.push(data);
        return item;
    });

    dateSort.forEach((item) => {
        const index = dateSort.indexOf(item);
        const checkIndex = dateSort.indexOf(item, index + 1);
        if (checkIndex !== -1) {
            updateDate[index].totalProduct += updateDate[checkIndex].totalProduct;
            updateDate[index].temporaryMoney += updateDate[checkIndex].temporaryMoney;
            updateDate.splice(checkIndex, 1);
            dateSort.splice(checkIndex, 1);
        }
    });

    // console.log("🧧🧧🧧🧧🧧🧧", updateDate);

    updateDate.forEach((item) => {
        x.push(item.totalProduct);
        y.push(item.temporaryMoney);
    });

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
    const t = loaded.predict(quantity);

    res.status(200).json(new SuccessResponse(200, t.toFixed(2)));
});

exports.chartOrder = asyncMiddleware(async(req, res, next) => {
    const orders = await Order.find({ isActive: true }).select("-updatedAt -__v");
    if (!orders) {
        return next(new ErrorResponse(404, "Orders is not available"));
    }
    const { quantity } = req.body;

    const sortOrders = orders.sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
    );

    let dateSort = [];
    let updateDate = sortOrders.map((item) => {
        const date = item.orderDate.getDate();
        const month = item.orderDate.getMonth() + 1;
        const year = item.orderDate.getFullYear();
        const data = date + "/" + month + "/" + year;
        dateSort.push(data);
        return item;
    });

    dateSort.forEach((item) => {
        const index = dateSort.indexOf(item);
        const checkIndex = dateSort.indexOf(item, index + 1);
        if (checkIndex !== -1) {
            updateDate[index].totalProduct += updateDate[checkIndex].totalProduct;
            updateDate[index].temporaryMoney += updateDate[checkIndex].temporaryMoney;
            updateDate.splice(checkIndex, 1);
            dateSort.splice(checkIndex, 1);
        }
    });

    const result = updateDate.map((item) => {
        const date = item.orderDate.getDate();
        const month = item.orderDate.getMonth() + 1;
        const year = item.orderDate.getFullYear();
        const ddmmyyyy = date + "/" + month + "/" + year;
        const statistical = {
            date: ddmmyyyy,
            sold: item.totalProduct,
            money: item.temporaryMoney,
        };
        return statistical;
    });
    res.status(200).json(new SuccessResponse(200, result));
});