const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const mongoUpload = require("../middleware/mongoUpload");

router.get("/sync", dataController.data);

// router.get("/sync/user", dataController.user);

// router.get("/sync/categories", dataController.categories);

router.get(
    "/sync/products",
    dataController.products
);

module.exports = router;