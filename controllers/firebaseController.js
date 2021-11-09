const ErrorResponse = require("../model/statusResponse/ErrorResponse");
const SuccessResponse = require("../model/statusResponse/SuccessResponse");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const {
    singleUploadMiddleware,
    multipleUploadMiddleware,
} = require("../middleware/multipleUploadMiddleware");
const firebase = require("../database/connectFirebase");
const path = require("path");
const crypto = require("crypto");
const Order = require("../model/database/Order");
const Product = require("../model/database/Product");
const multer = require("multer");

// Upload image
exports.upload = asyncMiddleware(async(req, res, next) => {
    try {
        await singleUploadMiddleware(req, res);
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
            return next(new ErrorResponse(400, err));
        });
        blobWriter.on("finish", async() => {
            blob
                .getSignedUrl({
                    action: "read",
                    expires: "03-09-2491",
                })
                .then(async(signedUrls) => {
                    await Order.findOneAndUpdate({ orderCode: id }, { imagePayment: signedUrls[0] }, { new: true });
                    return res
                        .status(201)
                        .json(new SuccessResponse(201, "Image upload successful"));
                    // signedUrls[0] contains the file's public URL
                })
                .catch((err) => {
                    return next(
                        new ErrorResponse(400, `Error get image firebase: ${err}`)
                    );
                });
        });
        blobWriter.end(req.file.buffer);
    } catch (err) {
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return next(
                new ErrorResponse(400, `Exceeds the number of files allowed to upload.`)
            );
        }
        return next(new ErrorResponse(400, err));
    }
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

// Create
// Upload image Product
exports.uploadImageProduct = asyncMiddleware(async(req, res, next) => {
    try {
        let flag = true;
        let listImage = [];

        await multipleUploadMiddleware(req, res);
        const { id } = req.params;
        const product = await Product.findOne({
            sku: id,
            isActive: true,
        }).select("-updatedAt -createdAt -__v");
        if (!product) {
            flag = false;
            return next(new ErrorResponse(404, "Invalid id of product"));
        }
        if (!req.files) {
            flag = false;
            return next(new ErrorResponse(400, "No files found"));
        }
        req.files.forEach((file) => {
            if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                flag = false;
                return next(new ErrorResponse(400, "This is not an image"));
            }
        });
        console.log("🚀 🚀 🚀 🚀 🚀", req.files.length);

        if (flag) {
            req.files.forEach((file) => {
                const date = Date.now();
                const name = crypto.randomBytes(16).toString("hex");
                file.originalname = `${name}-${date}${path.extname(file.originalname)}`;
                const blob = firebase.bucket.file(file.originalname);
                listImage.push(file.originalname);

                const blobWriter = blob.createWriteStream({
                    metadata: {
                        contentType: file.mimetype,
                    },
                });
                blobWriter.on("error", (err) => {
                    console.log(err);
                    return next(new ErrorResponse(400, err));
                });
                blobWriter.on("finish", async() => {
                    console.log("Write done.");
                });
                blobWriter.end(file.buffer);
            });
            const listImageURL = await Promise.all(
                listImage.map(async(item) => {
                    const blob = firebase.bucket.file(item);
                    const url = await blob
                        .getSignedUrl({
                            action: "read",
                            expires: "03-09-2491",
                        })
                        .then(async(signedUrls) => {
                            return signedUrls[0];
                        })
                        .catch((err) => {
                            return next(
                                new ErrorResponse(400, `Error get image firebase: ${err}`)
                            );
                        });
                    return url;
                })
            );

            console.log("🚀 🚀 🚀 🚀 🚀 🚀 listImageURL", listImageURL);
            return res.status(201).json(new SuccessResponse(201, listImageURL));
        }
    } catch (err) {
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return next(
                new ErrorResponse(400, `Exceeds the number of files allowed to upload.`)
            );
        }
        return next(new ErrorResponse(400, err));
    }
});

// Upload multiple image Firebase
exports.uploadMultipleImageFirebase = async(req, res, next) => {
    try {
        let flag = true;
        let listImage = [];
        let listImageURL;

        await multipleUploadMiddleware(req, res);
        // console.log("files 🧡 🧡 🧡 🧡 🧡 🧡:", req.files);
        if (!req.files || req.files.length <= 0) {
            flag = false;
            return next(new ErrorResponse(400, "No files found"));
        }
        req.files.forEach((file) => {
            if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                flag = false;
                return next(new ErrorResponse(400, "This is not an image"));
            }
        });

        if (flag) {
            req.files.forEach((file) => {
                const date = Date.now();
                const name = crypto.randomBytes(16).toString("hex");
                file.originalname = `${name}-${date}${path.extname(file.originalname)}`;
                const blob = firebase.bucket.file(file.originalname);
                listImage.push(file.originalname);

                const blobWriter = blob.createWriteStream({
                    metadata: {
                        contentType: file.mimetype,
                    },
                });
                blobWriter.on("error", (err) => {
                    console.log(err);
                    return next(new ErrorResponse(400, err));
                });
                blobWriter.on("finish", async() => {
                    console.log("Write done.");
                });
                blobWriter.end(file.buffer);
            });
            listImageURL = await Promise.all(
                listImage.map(async(item) => {
                    const blob = firebase.bucket.file(item);
                    const url = await blob
                        .getSignedUrl({
                            action: "read",
                            expires: "03-09-2491",
                        })
                        .then(async(signedUrls) => {
                            return signedUrls[0];
                        })
                        .catch((err) => {
                            return next(
                                new ErrorResponse(400, `Error get image firebase: ${err}`)
                            );
                        });
                    return url;
                })
            );
        }
        return listImageURL;
    } catch (err) {
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return next(
                new ErrorResponse(400, `Exceeds the number of files allowed to upload.`)
            );
        }
        return next(new ErrorResponse(400, err));
    }
};

// Upload multiple image Firebase ************************** PRODUCT *****************************
exports.uploadMultipleImageFirebasePRODUCT = async(req, res, next) => {
    try {
        let flag = true;
        let listImage = [];
        let listImageURL;

        await multipleUploadMiddleware(req, res);
        // console.log("files 🧡 🧡 🧡 🧡 🧡 🧡:", req.files);
        req.files.forEach((file) => {
            if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                flag = false;
                return next(new ErrorResponse(400, "This is not an image"));
            }
        });

        if (flag) {
            req.files.forEach((file) => {
                const date = Date.now();
                const name = crypto.randomBytes(16).toString("hex");
                file.originalname = `${name}-${date}${path.extname(file.originalname)}`;
                const blob = firebase.bucket.file(file.originalname);
                listImage.push(file.originalname);

                const blobWriter = blob.createWriteStream({
                    metadata: {
                        contentType: file.mimetype,
                    },
                });
                blobWriter.on("error", (err) => {
                    console.log(err);
                    return next(new ErrorResponse(400, err));
                });
                blobWriter.on("finish", async() => {
                    console.log("Write done.");
                });
                blobWriter.end(file.buffer);
            });
            listImageURL = await Promise.all(
                listImage.map(async(item) => {
                    const blob = firebase.bucket.file(item);
                    const url = await blob
                        .getSignedUrl({
                            action: "read",
                            expires: "03-09-2491",
                        })
                        .then(async(signedUrls) => {
                            return signedUrls[0];
                        })
                        .catch((err) => {
                            return next(
                                new ErrorResponse(400, `Error get image firebase: ${err}`)
                            );
                        });
                    return url;
                })
            );
        }
        return listImageURL;
    } catch (err) {
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return next(
                new ErrorResponse(400, `Exceeds the number of files allowed to upload.`)
            );
        }
        return next(new ErrorResponse(400, err));
    }
};

// Upload single image Firebase
exports.uploadSingleImageFirebase = async(req, res, next) => {
    try {
        await singleUploadMiddleware(req, res);

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
            return next(new ErrorResponse(400, err));
        });
        blobWriter.on("finish", async() => {
            console.log("Write done.");
        });
        blobWriter.end(req.file.buffer);
        const url = await blob
            .getSignedUrl({
                action: "read",
                expires: "03-09-2491",
            })
            .then(async(signedUrls) => {
                return signedUrls[0];
            })
            .catch((err) => {
                return next(new ErrorResponse(400, `Error get image firebase: ${err}`));
            });
        return url;
    } catch (err) {
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return next(
                new ErrorResponse(400, `Exceeds the number of files allowed to upload.`)
            );
        }
        return next(new ErrorResponse(400, err));
    }
};