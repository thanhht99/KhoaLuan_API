const ErrorResponse = require("../model/statusResponse/ErrorResponse");
const SuccessResponse = require("../model/statusResponse/SuccessResponse");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const Promotion = require("../model/database/Promotion");
const Product = require("../model/database/Product");

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

// All Promotion
exports.getAllPromotions = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    try {
        const promotions = await Promotion.find().select(
            "-updatedAt -createdAt -__v"
        );
        if (!promotions.length) {
            return next(new ErrorResponse(404, "No promotions"));
        }
        return res.status(200).json(new SuccessResponse(200, promotions));
    } catch (error) {
        return next(new ErrorResponse(400, error));
    }
});

// Create Promotion
exports.createNewPromotion = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    const {
        products,
        promotion_name,
        promotion_desc,
        discount,
        startDate,
        endDate,
    } = req.body;
    req.checkBody("products", "Products is empty!!").notEmpty();
    req.checkBody("promotion_name", "Promotion Name is empty!!").notEmpty();
    req
        .checkBody("promotion_desc", "Promotion Description is empty!!")
        .notEmpty();
    req.checkBody("discount", "Discount is empty!!").notEmpty();
    req.checkBody("startDate", "Start Date is empty!!").notEmpty();
    req.checkBody("endDate", "End Date is empty!!").notEmpty();
    req
        .checkBody(
            "startDate",
            "Start Date must be in correct format YYYY-MM-DDTHH:MM:SS.000Z !!"
        )
        .isISO8601()
        .toDate();
    req
        .checkBody(
            "endDate",
            "End Date must be in correct format YYYY-MM-DDTHH:MM:SS.00Z !!"
        )
        .isISO8601()
        .toDate();

    let errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
        let array = [];
        errors.array().forEach((e) => array.push(e.msg));
        return next(new ErrorResponse(422, array));
    }

    let type;
    if (discount > 1) {
        type = "Money";
    }
    if (discount > 0 && discount <= 1) {
        type = "Percent";
    }

    const objProducts = products.map((val) => {
        return { productSku: val };
    });
    const findProduct = await Promise.all(
        objProducts.map(async(val) => {
            const a = await Product.findOne({
                sku: val.productSku,
                isPromotion: false,
            });
            if (a) return { productSku: a.sku, name: a.name };
        })
    );
    if (objProducts.length !== findProduct.length) {
        return next(new ErrorResponse(400, "List products invalid !"));
    }

    const convertStartDate = new Date(startDate);
    const convertEndDate = new Date(endDate);
    if (convertStartDate >= convertEndDate) {
        return next(new ErrorResponse(400, "Start date and End date invalid"));
    }

    const promotion = new Promotion({
        products: findProduct,
        promotion_name,
        promotion_desc,
        discount,
        type,
        startDate: convertStartDate,
        endDate: convertEndDate,
    });
    const res_promotion = await promotion.save();
    if (res_promotion) {
        const a = await Promise.all(
            findProduct.map(async(val) => {
                const b = await Product.findOneAndUpdate({ sku: val.productSku }, { isPromotion: true, promotionId: res_promotion._id });
                return b.sku;
            })
        );
        if (!a) {
            await Promotion.findByIdAndDelete({ id: res_promotion._id });
            return next(
                new ErrorResponse(400, "Update isPromotion Promotion failed")
            );
        }
        return res.status(200).json(new SuccessResponse(200, res_promotion));
    }
});

// Update Promotion
exports.updatePromotion = asyncMiddleware(async(req, res, next) => {
    const { id } = req.params;
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    if (!id.trim()) {
        return next(new ErrorResponse(400, "Id is empty"));
    }

    const { discount, promotion_name, promotion_desc } = req.body;
    req.checkBody("discount", "Discount is empty!!").notEmpty();
    req.checkBody("promotion_name", "Promotion Name is empty!!").notEmpty();
    req
        .checkBody("promotion_desc", "Promotion Description is empty!!")
        .notEmpty();

    let errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
        let array = [];
        errors.array().forEach((e) => array.push(e.msg));
        return next(new ErrorResponse(422, array));
    }

    let type;
    if (discount > 1) {
        type = "Money";
    }
    if (discount > 0 && discount <= 1) {
        type = "Percent";
    }

    const updatedPromotion = await Promotion.findOneAndUpdate({ _id: id, isActive: true }, { promotion_name, promotion_desc, type, discount }, { new: true });
    if (!updatedPromotion) {
        return next(
            new ErrorResponse(
                400,
                "Can not updated. Not found promotion or Active promotion is false!"
            )
        );
    }
    return res.status(200).json(new SuccessResponse(200, updatedPromotion));
});

// Update isActive Promotion
exports.updateActivePromotion = asyncMiddleware(async(req, res, next) => {
    const { id } = req.params;
    const isActive = getBoolean(req.query.isActive);
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    if (!id.trim()) {
        return next(new ErrorResponse(400, "Id is empty"));
    }
    // console.log(isActive)
    if (
        isActive === null ||
        isActive === undefined ||
        typeof isActive !== "boolean"
    ) {
        return next(new ErrorResponse(404, "API invalid"));
    }

    const checkPromotion = await Promotion.findOne({ _id: id });
    if (!checkPromotion) {
        return next(new ErrorResponse(400, "Not promotion found"));
    }

    let updatedPromotion;
    if (isActive) {
        updatedPromotion = await Promotion.findOneAndUpdate({ _id: id }, { isActive }, { new: true });
        const a = await Promise.all(
            updatedPromotion.products.map(async(val) => {
                const b = await Product.findOneAndUpdate({ sku: val.productSku }, { isPromotion: true, promotionId: updatedPromotion._id });
                return b.sku;
            })
        );
        if (!a) {
            return next(new ErrorResponse(400, "Update isPromotion Product failed"));
        }
    }
    if (!isActive) {
        updatedPromotion = await Promotion.findOneAndUpdate({ _id: id }, { isActive }, { new: true });
        const a = await Promise.all(
            updatedPromotion.products.map(async(val) => {
                const b = await Product.findOneAndUpdate({ sku: val.productSku }, { isPromotion: false, promotionId: null });
                return b.sku;
            })
        );
        if (!a) {
            return next(new ErrorResponse(400, "Update isPromotion Product failed"));
        }
    }
    if (!updatedPromotion) {
        return next(new ErrorResponse(400, "Not found to updated"));
    }
    return res.status(200).json(new SuccessResponse(200, updatedPromotion));
});

// Delete Promotion
exports.deletePromotion = asyncMiddleware(async(req, res, next) => {
    const { id } = req.params;
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    if (!id.trim()) {
        return next(new ErrorResponse(400, "Id is empty"));
    }
    const deletePromotion = await Promotion.findByIdAndDelete(id);
    if (!deletePromotion) {
        return next(new ErrorResponse(400, "Not found to delete"));
    }
    return res.status(204).json(new SuccessResponse(204, "Delete successfully"));
});