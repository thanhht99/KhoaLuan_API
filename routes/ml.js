const express = require("express");
const router = express.Router();
const mlController = require("../controllers/mlController");

router.get("/test", mlController.test);

module.exports = router;