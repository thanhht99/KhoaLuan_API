const express = require("express");
const router = express.Router();
const { baseAuth } = require("../middleware/baseAuth");
const jwtAuth = require("../middleware/jwtAuth");
const conversationsController = require('../controllers/conversationsController');

router.post("/", jwtAuth, conversationsController.newConversation);

router.patch("/update/:id", jwtAuth, conversationsController.updateConversation);

router.get("/:userId", jwtAuth, conversationsController.getConversationByUser);

router.get("/_id/:id", jwtAuth, conversationsController.getConversationById);

router.get(
    "/find/:firstUserId/:secondUserId",
    jwtAuth,
    conversationsController.getConversationIncludesTwoUser
);

module.exports = router;