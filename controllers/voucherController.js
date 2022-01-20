const ErrorResponse = require("../model/statusResponse/ErrorResponse");
const SuccessResponse = require("../model/statusResponse/SuccessResponse");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const Voucher = require("../model/database/Voucher");
const Product = require("../model/database/Product");
const { uploadSingleImageFirebase } = require("./firebaseController");
const {
    singleUploadMiddleware,
} = require("../middleware/multipleUploadMiddleware");

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

// All Vouchers
exports.getAllVouchers = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    try {
        const vouchers = await Voucher.find().select("-updatedAt -createdAt -__v");
        if (!vouchers.length) {
            return next(new ErrorResponse(404, "No vouchers"));
        }
        return res.status(200).json(new SuccessResponse(200, vouchers));
    } catch (error) {
        return next(new ErrorResponse(400, error));
    }
});

// All Vouchers SortByIsActive
exports.getAllVouchersSortByIsActive = asyncMiddleware(
    async(req, res, next) => {
        try {
            const isActive = getBoolean(req.query.isActive);
            if (
                isActive === null ||
                isActive === undefined ||
                typeof isActive !== "boolean"
            ) {
                return next(new ErrorResponse(404, "API invalid"));
            }

            const vouchers = await Voucher.find({ isActive }).select(
                "-updatedAt -createdAt -__v"
            );
            if (!vouchers.length) {
                return next(new ErrorResponse(404, "No vouchers"));
            }
            return res.status(200).json(new SuccessResponse(200, vouchers));
        } catch (error) {
            return next(new ErrorResponse(400, error));
        }
    }
);

// Find Vouchers
exports.getVoucher = asyncMiddleware(async(req, res, next) => {
    const { code } = req.params;
    if (!code.trim()) {
        return next(new ErrorResponse(400, "Code is empty"));
    }
    const res_voucher = await Voucher.findOne({ code, isActive: true }).select(
        "-updatedAt -createdAt -__v"
    );
    if (!res_voucher) {
        return next(new ErrorResponse(404, "No voucher"));
    }
    console.log("🚀🚀🚀🚀🚀🚀 ~ res_voucher", res_voucher);
    const convertStartDate = new Date(res_voucher.startDate);
    const convertEndDate = new Date(res_voucher.endDate);
    const date = new Date();
    if (date > convertEndDate || date < convertStartDate) {
        return next(
            new ErrorResponse(400, "The voucher code is not within the expiry date")
        );
    }
    return res.status(200).json(new SuccessResponse(200, res_voucher));
});

// Create Voucher
exports.createNewVoucher = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    const file = await uploadSingleImageFirebase(req, res, next);
    const { voucher_name, voucher_desc, discount, code, startDate, endDate } =
    req.body;
    req.checkBody("voucher_name", "Voucher Name is empty!!").notEmpty();
    req.checkBody("voucher_desc", "Voucher Description is empty!!").notEmpty();
    req.checkBody("discount", "Discount is empty!!").notEmpty();
    req.checkBody("code", "Type Voucher is empty!!").notEmpty();
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

    const convertStartDate = new Date(startDate);
    const convertEndDate = new Date(endDate);
    if (convertStartDate >= convertEndDate) {
        return next(new ErrorResponse(400, "Start date and End date invalid"));
    }

    let type;
    if (discount > 1) {
        type = "Money";
    }
    if (discount > 0 && discount <= 1) {
        type = "Percent";
    }

    const newVoucher = new Voucher({
        voucher_name,
        voucher_desc,
        discount,
        type,
        code,
        startDate: convertStartDate,
        endDate: convertEndDate,
        image: file,
    });
    const res_voucher = await newVoucher.save();
    if (!res_voucher) {
        return next(new ErrorResponse(400, "Voucher has not been created !!!"));
    }
    return res.status(200).json(new SuccessResponse(200, res_voucher));
});

// Update Voucher
exports.updateVoucher = asyncMiddleware(async(req, res, next) => {
    await singleUploadMiddleware(req, res);

    const { id } = req.params;
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    if (!id.trim()) {
        return next(new ErrorResponse(400, "Id is empty"));
    }

    const { voucher_name, voucher_desc, discount, code, startDate, endDate } =
    req.body;
    req.checkBody("voucher_name", "Voucher Name is empty!!").notEmpty();
    req.checkBody("voucher_desc", "Voucher Description is empty!!").notEmpty();
    req.checkBody("discount", "Discount is empty!!").notEmpty();
    req.checkBody("code", "Type Voucher is empty!!").notEmpty();
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

    let updatedVoucher;
    const checkCodeVoucher = await Voucher.findOne({ _id: id });
    if (!checkCodeVoucher) {
        return next(new ErrorResponse(404, "Voucher not found"));
    }
    if (!req.file && !checkCodeVoucher.image) {
        return next(new ErrorResponse(400, "No files found"));
    }

    let file;
    if (req.file) {
        file = await uploadSingleImageFirebase(req, res, next);
    }
    if (!req.file) {
        file = checkCodeVoucher.image;
    }

    const convertStartDate = new Date(startDate);
    const convertEndDate = new Date(endDate);
    if (convertStartDate >= convertEndDate) {
        return next(new ErrorResponse(400, "Start date and End date invalid"));
    }

    let type;
    if (discount > 1) {
        type = "Money";
    }
    if (discount > 0 && discount <= 1) {
        type = "Percent";
    }

    if (code === checkCodeVoucher.code) {
        updatedVoucher = await Voucher.findOneAndUpdate({ _id: id, isActive: true }, {
            voucher_name,
            voucher_desc,
            discount,
            type,
            startDate: convertStartDate,
            endDate: convertEndDate,
            image: file,
        }, { new: true });
    }
    if (code !== checkCodeVoucher.code) {
        updatedVoucher = await Voucher.findOneAndUpdate({ _id: id, isActive: true }, {
            voucher_name,
            voucher_desc,
            discount,
            type,
            code,
            startDate: convertStartDate,
            endDate: convertEndDate,
            image: file,
        }, { new: true });
    }

    if (!updatedVoucher) {
        return next(
            new ErrorResponse(400, "Can not updated. Active voucher is false!")
        );
    }
    return res.status(200).json(new SuccessResponse(200, updatedVoucher));
});

// Update isActive Voucher
exports.updateActiveVoucher = asyncMiddleware(async(req, res, next) => {
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
    const updatedVoucher = await Voucher.findOneAndUpdate({ _id: id }, { isActive }, { new: true });
    if (!updatedVoucher) {
        return next(new ErrorResponse(400, "Not found to updated"));
    }
    return res.status(200).json(new SuccessResponse(200, updatedVoucher));
});

// Delete Voucher
exports.deleteVoucher = asyncMiddleware(async(req, res, next) => {
    const { id } = req.params;
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    if (!id.trim()) {
        return next(new ErrorResponse(400, "Id is empty"));
    }
    const deleteVoucher = await Voucher.findByIdAndDelete(id);
    if (!deleteVoucher) {
        return next(new ErrorResponse(400, "Not found to delete"));
    }
    return res.status(204).json(new SuccessResponse(204, "Delete successfully"));
});