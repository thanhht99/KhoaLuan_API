const ErrorResponse = require("../model/statusResponse/ErrorResponse");
const SuccessResponse = require("../model/statusResponse/SuccessResponse");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const Order = require("../model/database/Order");
const Product = require("../model/database/Product");
const Feedback = require("../model/database/Feedback");
const User = require("../model/database/User");

function getBoolean(value) {
    switch (value) {
        case true:
        case "true":
        case 1:
        case "1":
            return true;
        case false:
        case "false":
        case 0:
        case "0":
            return false;
        default:
            return value;
    }
}

// Feedback
exports.feedback = asyncMiddleware(async(req, res, next) => {
    const { id } = req.params;
    if (!id.trim()) {
        return next(new ErrorResponse(400, "Id is empty"));
    }
    try {
        const order = await Order.findOne({
            _id: id,
            isActive: true,
        }).select("-updatedAt -createdAt -__v");
        if (!order) {
            return next(new ErrorResponse(404, "Order is not available"));
        }
        if (order) {
            if (order.email !== req.session.account.email) {
                return next(
                    new ErrorResponse(400, "Are you a hacker? Get out of here now")
                );
            }
            if (order.isFeedback) {
                return next(new ErrorResponse(403, "Feedback already"));
            }
            if (order.orderStatus !== "Has received the goods") {
                return next(new ErrorResponse(403, "The order has not been delivered"));
            }

            const products = req.body.products;
            if (products.length !== order.products.length) {
                return next(
                    new ErrorResponse(
                        403,
                        "Products are not the same as ordered products"
                    )
                );
            }

            products.forEach(async(item) => {
                const findProduct = await Product.findOne({ _id: item.productId });
                const updateNumberRating = findProduct.numRating + 1;
                const updateRating =
                    (parseFloat(findProduct.rating) * findProduct.numRating +
                        item.rating) /
                    parseFloat(updateNumberRating);
                await Product.findOneAndUpdate({ _id: item.productId }, {
                    numRating: updateNumberRating,
                    rating: updateRating.toFixed(5),
                });
                const feedback = new Feedback({
                    orderCode: order.orderCode,
                    sku: item.sku,
                    rating: item.rating,
                    contentFeedback: item.contentFeedback,
                });
                await feedback.save();
            });
            await Order.findOneAndUpdate({ _id: order._id }, { isFeedback: true }, { new: true });
            return res.status(201).json(new SuccessResponse(201, "Successfully"));
        }
    } catch (err) {
        return next(new ErrorResponse(500, err));
    }
});

// Get form to Feedback
exports.getFormToFeedback = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    try {
        const id = req.params.orderId;
        if (!id.trim()) {
            return next(new ErrorResponse(422, "Id is empty"));
        }
        const order = await Order.findOne({
            _id: id,
            isActive: true,
        }).select("email products");
        if (!order) {
            return next(new ErrorResponse(404, "Order is not available"));
        }
        if (order) {
            if (order.email !== req.session.account.email) {
                return next(
                    new ErrorResponse(400, "Are you a hacker? Get out of here now")
                );
            }

            let getProducts = [];
            order.products.forEach(async(product) => {
                const find = await Product.findOne({
                    sku: product.sku,
                    isActive: true,
                }).select(" name price sku image category");

                if (find) {
                    getProducts.push(find);
                }
                if (order.products.length === getProducts.length) {
                    res.status(200).json(new SuccessResponse(200, getProducts));
                }
            });
        }
    } catch (err) {
        return next(new ErrorResponse(500, err));
    }
});

// Get Feedback
exports.getFeedback = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    try {
        const orderCode = req.params.orderCode;
        const feedback = await Feedback.find({
            orderCode,
        });
        if (!feedback) {
            return next(new ErrorResponse(404, "Feedback is not available"));
        }
        if (feedback) {
            res.status(200).json(new SuccessResponse(200, feedback));
        }
    } catch (err) {
        return next(new ErrorResponse(500, err));
    }
});

// Find Feedback
exports.findFeedbackByProduct = asyncMiddleware(async(req, res, next) => {
    try {
        const sku = req.params.sku;
        if (!sku.trim()) {
            return next(new ErrorResponse(422, "Sku is empty"));
        }

        const feedback = await Feedback.find({ sku, isActive: true })
            .populate({
                path: "order_detail",
                select: "_id email",
            })
            .select("-updatedAt -__v");

        let result = [];
        feedback.forEach(async(item) => {
            const findUser = await User.findOne({ email: item.order_detail.email });

            if (findUser) {
                const data = {
                    fullName: findUser.fullName,
                    image: findUser.image,
                    orderCode: item.orderCode,
                    sku: item.sku,
                    rating: item.rating,
                    contentFeedback: item.contentFeedback,
                    createdAt: item.createdAt,
                };
                result.push(data);
            }
            if (feedback.length === result.length) {
                res.status(200).json(new SuccessResponse(200, result));
            }
        });
    } catch (err) {
        return next(new ErrorResponse(500, err));
    }
});

// Get all Feedback
exports.getAllFeedback = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    const feedback = await Feedback.find().select("-updatedAt -__v");
    if (!feedback) {
        return next(new ErrorResponse(404, "Feedback is not found"));
    }
    return res.status(200).json(new SuccessResponse(200, feedback));
});

// Update isActive
exports.updateActive = asyncMiddleware(async(req, res, next) => {
    const { _id } = req.params;
    const isActive = getBoolean(req.query.isActive);
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    if (!_id.trim()) {
        return next(new ErrorResponse(400, "Id is empty"));
    }
    if (
        isActive === null ||
        isActive === undefined ||
        typeof isActive !== "boolean"
    ) {
        return next(new ErrorResponse(404, "API invalid"));
    }
    const feedback = await Feedback.findOneAndUpdate({ _id }, { isActive }, { new: true });
    if (!feedback) {
        return next(new ErrorResponse(400, "Feedback update failed"));
    }
    if (feedback) {
        return res
            .status(200)
            .json(new SuccessResponse(200, "Updated successfully"));
    }
});