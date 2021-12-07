const express = require('express');
const router = express.Router();
const jwtAuth = require('../middleware/jwtAuth');
const feedbackController = require('../controllers/feedbackController');
const { authorize } = require("../middleware/authorize");
const { baseAuth } = require('../middleware/baseAuth');

router.post("/:id", jwtAuth, feedbackController.feedback);

router.get("/form/:orderId", jwtAuth, feedbackController.getFormToFeedback);

router.get("/find/:sku", baseAuth, feedbackController.findFeedbackByProduct);

module.exports = router;