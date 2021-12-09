const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const { baseAuth } = require("../middleware/baseAuth");

router.get("/bestSeller", baseAuth, homeController.bestSeller);

router.get("/newProducts", baseAuth, homeController.newProducts);

router.get("/vouchers", baseAuth, homeController.vouchers);

module.exports = router;