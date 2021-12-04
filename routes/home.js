const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/bestSeller", homeController.bestSeller);

module.exports = router;