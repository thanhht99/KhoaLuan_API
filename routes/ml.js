const express = require("express");
const router = express.Router();
const mlController = require("../controllers/mlController");
const jwtAuth = require('../middleware/jwtAuth');
const { authorize } = require("../middleware/authorize");

router.get("/test", mlController.test);

router.post("/revenuePrediction", jwtAuth, authorize("Admin"), mlController.revenuePrediction);

router.get("/chartOrder", jwtAuth, authorize("Admin"), mlController.chartOrder);

module.exports = router;