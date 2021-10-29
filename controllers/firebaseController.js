const ErrorResponse = require("../model/statusResponse/ErrorResponse");
const SuccessResponse = require("../model/statusResponse/SuccessResponse");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const firebase = require("../database/connectFirebase");
const path = require("path");
const crypto = require("crypto");
const Order = require("../model/database/Order");

// Upload image
exports.upload = asyncMiddleware(async(req, res, next) => {
    const { id } = req.params;
    const order = await Order.findOne({
        orderCode: id,
        isActive: true,
    }).select("-updatedAt -createdAt -__v");
    if (!order) {
        return next(new ErrorResponse(404, "Invalid order code"));
    }
    if (!req.file) {
        return next(new ErrorResponse(400, "No files found"));
    }
    if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        return next(new ErrorResponse(400, "This is not an image"));
    }
    const date = Date.now();
    const name = crypto.randomBytes(16).toString("hex");
    req.file.originalname = `${name}-${date}${path.extname(
    req.file.originalname
  )}`;

    const blob = firebase.bucket.file(req.file.originalname);

    const blobWriter = blob.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
    });
    blobWriter.on("error", (err) => {
        console.log(err);
    });
    blobWriter.on("finish", async() => {
        await Order.findOneAndUpdate({ orderCode: id }, { imagePayment: req.file.originalname }, { new: true });
        return res
            .status(201)
            .json(new SuccessResponse(201, "Image upload successful"));
    });
    blobWriter.end(req.file.buffer);
});

// Get image
exports.getImage = asyncMiddleware(async(req, res, next) => {
    const name = req.params.name;
    console.log(
        "🚀 ~ file: firebaseController.js ~ line 45 ~ exports.getImage=asyncMiddleware ~ name",
        name
    );
    const blob = firebase.bucket.file(name);
    blob
        .getSignedUrl({
            action: "read",
            expires: "03-09-2491",
        })
        .then((signedUrls) => {
            return res.status(200).json(new SuccessResponse(200, signedUrls[0]));
            // signedUrls[0] contains the file's public URL
        })
        .catch((err) => {
            return next(new ErrorResponse(400, `Error get image firebase: ${err}`));
        });
});