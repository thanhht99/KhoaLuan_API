const express = require("express");
const router = express.Router();
const mlController = require("../controllers/mlController");
const jwtAuth = require('../middleware/jwtAuth');
const { authorize } = require("../middleware/authorize");

router.get("/test", mlController.test);

router.post("/revenuePrediction", jwtAuth, authorize("Admin"), mlController.revenuePrediction);

module.exports = router;