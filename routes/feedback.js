const express = require("express");
const router = express.Router();
const jwtAuth = require("../middleware/jwtAuth");
const feedbackController = require("../controllers/feedbackController");
const { authorize } = require("../middleware/authorize");
const { baseAuth } = require("../middleware/baseAuth");

router.post("/:id", jwtAuth, feedbackController.feedback);

router.get("/form/:orderId", jwtAuth, feedbackController.getFormToFeedback);

router.get("/show/:orderCode", jwtAuth, feedbackController.getFeedback);

router.get("/find/:sku", baseAuth, feedbackController.findFeedbackByProduct);

router.get(
    "/all",
    jwtAuth,
    authorize("Admin"),
    feedbackController.getAllFeedback
);

router.patch(
    "/updateActive/:_id",
    jwtAuth,
    authorize("Admin"),
    feedbackController.updateActive
);

module.exports = router;