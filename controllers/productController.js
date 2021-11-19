const ErrorResponse = require("../model/statusResponse/ErrorResponse");
const SuccessResponse = require("../model/statusResponse/SuccessResponse");
const Product = require("../model/database/Product");
const Category = require("../model/database/Category");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const { ConnectMongo } = require("../database/connectDB");
const removeUpload = require("../middleware/removeUpload");
const {
    uploadMultipleImageFirebase,
    uploadMultipleImageFirebasePRODUCTse,
    uploadMultipleImageFirebasePRODUCT,
    uploadSingleImageFirebase,
} = require("./firebaseController");
const {
    singleUploadMiddleware,
    multipleUploadMiddleware,
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

// Get All Products
exports.getAllProducts = asyncMiddleware(async(req, res, next) => {
    const products = await Product.find()
        .populate({
            path: "promotion_detail",
            select: "promotion_name discount",
        })
        .select("-updatedAt -createdAt -__v");
    if (!products.length) {
        return next(new ErrorResponse(404, "No products"));
    }
    return res.status(200).json(new SuccessResponse(200, products));
});

// Get All Products By IsActive
exports.getAllProductsSortByIsActive = asyncMiddleware(
    async(req, res, next) => {
        const isActive = getBoolean(req.query.isActive);
        const isPromotion = req.query.isPromotion;

        if (
            isActive === null ||
            isActive === undefined ||
            typeof isActive !== "boolean"
        ) {
            return next(new ErrorResponse(404, "API invalid"));
        }
        let products;

        if (isPromotion) {
            const isPromotion = getBoolean(req.query.isPromotion);
            if (
                isPromotion === null ||
                isPromotion === undefined ||
                typeof isPromotion !== "boolean"
            ) {
                return next(new ErrorResponse(404, "API invalid isPromotion"));
            }

            products = await Product.find({ isActive, isPromotion })
                .populate("promotion_detail")
                .select("-updatedAt -createdAt -__v");
        }
        if (!isPromotion) {
            products = await Product.find({ isActive })
                .populate({
                    path: "promotion_detail",
                    select: "promotion_name discount",
                })
                .select("-updatedAt -createdAt -__v");
        }

        if (!products.length) {
            return next(new ErrorResponse(404, "No products"));
        }
        return res.status(200).json(new SuccessResponse(200, products));
    }
);

// Find Product By SKU
exports.getProductBySku = asyncMiddleware(async(req, res, next) => {
    const { sku } = req.params;
    if (!sku.trim()) {
        return next(new ErrorResponse(400, "Sku is empty"));
    }
    const doc = await Product.findOne({ sku })
        .populate({
            path: "category_detail",
            select: "category_name category_desc",
        })
        .select("-updatedAt -createdAt -__v");
    if (!doc) {
        return next(new ErrorResponse(404, "Product is not found"));
    }
    res.status(200).json(new SuccessResponse(200, doc));
});

// Add Product
exports.createNewProduct = asyncMiddleware(async(req, res, next) => {
    const file = await uploadSingleImageFirebase(req, res, next);

    const { name, sku, price, category, quantity, description } = req.body;
    // console.log("🚀 🚀 🚀", req.body);

    // const file11 = req.file;
    // console.log("🚁 🚁 🚁 ~ file11", file11);
    // console.log("🚁 🚁 🚁 🚁 🚁 🚁 ~ file", file);

    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    req.checkBody("name", "Product Name is empty!!").notEmpty();
    req.checkBody("price", "Product price is empty!!").notEmpty();
    req.checkBody("price", "Product price must is number!").isNumeric();
    req.checkBody("quantity", "Product quantity is empty!!").notEmpty();
    req.checkBody("quantity", "Product quantity must is number!").isNumeric();
    req.checkBody("description", "Product description is empty!!").notEmpty();
    req.checkBody("category", "Product category is empty!!").notEmpty();
    req.checkBody("sku", "Product sku is empty!!").notEmpty();

    let errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
        let array = [];
        errors.array().forEach((e) => array.push(e.msg));
        return next(new ErrorResponse(422, array));
    }

    const categoryAll = await Category.find().select(
        "-updatedAt -createdAt -__v"
    );
    const categoryAll_Name = await Promise.all(
        categoryAll.map((category) => {
            return category.category_name;
        })
    );
    if (!categoryAll_Name.includes(category)) {
        return next(new ErrorResponse(422, "Category invalid !!!"));
    }
    const newProduct = new Product({
        name,
        price,
        quantity,
        description,
        category,
        sku,
        image: file,
    });

    const res_product = await newProduct.save();
    if (res_product) {
        return res.status(201).json(new SuccessResponse(201, res_product));
    }
});

// Add/Update List Image Product
exports.listImageProduct = asyncMiddleware(async(req, res, next) => {
    const listFile = await uploadMultipleImageFirebase(req, res, next);
    // const files22 = req.files;
    // console.log("🚒 🚒 🚒 ~ files", files22);
    // console.log("🚒 🚒 🚒 🚒 🚒 🚒 ~ files", listFile);

    const { sku } = req.params;
    if (!sku.trim()) {
        return next(new ErrorResponse(400, "Sku is empty"));
    }
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    const product = await Product.findOne({ sku });
    if (!product) {
        return next(new ErrorResponse(404, "Product not found"));
    }

    const updatedProduct = await Product.findOneAndUpdate({ sku }, {
        listImage: listFile,
    }, { new: true });
    if (!updatedProduct) {
        return next(new ErrorResponse(400, "Can not updated"));
    }
    return res.status(200).json(new SuccessResponse(200, updatedProduct));
});

// Get Image Product
exports.getImageProductBySku = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    const { sku } = req.params;
    if (!sku.trim()) {
        return next(new ErrorResponse(400, "Sku is empty"));
    }
    const doc = await Product.findOne({ sku })
        .populate({
            path: "category_detail",
            select: "category_name category_desc",
        })
        .select("-updatedAt -createdAt -__v");
    if (!doc) {
        return next(new ErrorResponse(404, "Product is not found"));
    }

    try {
        req.params.filename = doc.image;
        const { filename } = req.params;
        const file = ConnectMongo.gfs.find({ filename }).toArray((err, files) => {
            if (!files || !files.length) {
                return next(new ErrorResponse(404, "file not found"));
            }
            ConnectMongo.gfs.openDownloadStreamByName(filename).pipe(res);
        });
        // console.log(file);
    } catch (error) {
        return next(new ErrorResponse(500, error));
    }
});

// Update isActive Product
exports.updateActiveProduct = asyncMiddleware(async(req, res, next) => {
    const { sku } = req.params;
    const isActive = getBoolean(req.query.isActive);
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    if (!sku.trim()) {
        return next(new ErrorResponse(400, "Sku is empty"));
    }
    if (
        isActive === null ||
        isActive === undefined ||
        typeof isActive !== "boolean"
    ) {
        return next(new ErrorResponse(404, "API invalid"));
    }
    const updatedProduct = await Product.findOneAndUpdate({ sku }, { isActive }, { new: true });
    if (!updatedProduct) {
        return next(new ErrorResponse(400, "Not found to updated"));
    }
    return res.status(200).json(new SuccessResponse(200, updatedProduct));
});

// Update Product
exports.updateProduct = asyncMiddleware(async(req, res, next) => {
    await singleUploadMiddleware(req, res);

    const { name, price, quantity, description } = req.body;
    const { sku } = req.params;
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    if (!sku.trim()) {
        return next(new ErrorResponse(400, "Sku is empty"));
    }
    req.checkBody("name", "Product name is empty !!").notEmpty();
    req.checkBody("price", "Product price is empty !!").notEmpty();
    req.checkBody("price", "Product price must is number!").isNumeric();
    req.checkBody("quantity", "Product quantity is empty !!").notEmpty();
    req.checkBody("quantity", "Product quantity must is number!").isNumeric();
    req.checkBody("description", "Product description is empty !!").notEmpty();

    let errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
        let array = [];
        errors.array().forEach((e) => array.push(e.msg));
        return next(new ErrorResponse(422, array));
    }

    const product = await Product.findOne({ sku });
    if (!product) {
        return next(new ErrorResponse(404, "Product not found"));
    }
    if (!req.file && !product.image) {
        return next(new ErrorResponse(400, "No files found"));
    }

    let file;
    if (req.file) {
        file = await uploadSingleImageFirebase(req, res, next);
    }
    if (!req.file) {
        file = product.image;
    }

    const updatedProduct = await Product.findOneAndUpdate({ sku }, {
        name,
        price,
        quantity,
        description,
        image: file,
    }, { new: true });
    if (!updatedProduct) {
        return next(new ErrorResponse(400, "Can not updated"));
    }
    return res.status(200).json(new SuccessResponse(200, updatedProduct));
});

// Update ListImage Product
exports.updateListImageProduct = asyncMiddleware(async(req, res, next) => {
    const listFile = await uploadMultipleImageFirebasePRODUCT(req, res, next);

    const { listURL } = req.body;
    const { sku } = req.params;
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    if (!sku.trim()) {
        return next(new ErrorResponse(400, "Sku is empty"));
    }

    const product = await Product.findOne({ sku });
    if (!product) {
        return next(new ErrorResponse(404, "Product not found"));
    }

    // console.log("👿👿👿👿 convertListURL👿👿👿👿", typeof listURL);
    // console.log("👿👿👿👿 listURL", listURL);
    // console.log("🚀 ~  typeof listURL === string", typeof listURL === "string");
    // console.log("🚀 ~  typeof listURL === object", typeof listURL === "object");

    let convertListURL;
    if (typeof listURL === "string") {
        convertListURL = [listURL];
    }
    if (typeof listURL === "object") {
        convertListURL = listURL;
    }
    if (typeof listURL !== "object" && typeof listURL !== "string") {
        convertListURL = [];
    }
    // console.log("🚀🚀🚀🚀🚀~ listURL.length🚀🚀🚀🚀🚀", typeof convertListURL);
    // console.log("🚀🚀🚀🚀🚀~ listURL🚀🚀🚀🚀🚀", convertListURL);

    // console.log("🧡🧡🧡🧡🧡~ req.files🧡🧡🧡🧡🧡", req.files.length);
    // console.log("🧡🧡🧡🧡🧡listFile🧡🧡🧡🧡🧡", listFile);

    let updateFile;
    if (req.files.length > 0) {
        updateFile = [...convertListURL, ...listFile];
    }
    if (req.files.length === 0) {
        updateFile = [...convertListURL];
    }
    // console.log("🚀🚀🚀🚀🚀updateFile🚀🚀🚀🚀🚀", updateFile);

    const updatedProduct = await Product.findOneAndUpdate({ sku }, {
        listImage: updateFile,
    }, { new: true });
    if (!updatedProduct) {
        return next(new ErrorResponse(400, "Can not updated"));
    }
    return res.status(200).json(new SuccessResponse(200, updatedProduct));
});