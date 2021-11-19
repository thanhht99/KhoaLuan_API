const express = require("express");
const router = express.Router();
const jwtAuth = require("../middleware/jwtAuth");
const productController = require("../controllers/productController");
const { authorize } = require("../middleware/authorize");
const { baseAuth } = require("../middleware/baseAuth");
const mongoUpload = require("../middleware/mongoUpload");

router.post(
    "/create",
    jwtAuth,
    authorize("Admin"),
    productController.createNewProduct
);

router.patch(
    "/listImage/:sku",
    jwtAuth,
    authorize("Admin"),
    productController.listImageProduct
);

// Get all products
router.get("/all", baseAuth, productController.getAllProducts);

router.get(
    "/allByActive",
    baseAuth,
    productController.getAllProductsSortByIsActive
);
/* *************************************************************** */

router.get("/:sku", baseAuth, productController.getProductBySku);

router.get("/image/:sku", jwtAuth, productController.getImageProductBySku);

router.patch(
    "/updateActive/:sku",
    jwtAuth,
    authorize("Admin"),
    productController.updateActiveProduct
);

// Update Product
router.patch(
    "/update/:sku",
    jwtAuth,
    authorize("Admin"),
    productController.updateProduct
);
router.patch(
    "/updateListImage/:sku",
    jwtAuth,
    authorize("Admin"),
    productController.updateListImageProduct
);

module.exports = router;