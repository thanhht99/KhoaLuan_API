const express = require("express");
const router = express.Router();
const { baseAuth } = require("../middleware/baseAuth");
const jwtAuth = require("../middleware/jwtAuth");
const conversationsController = require("../controllers/conversationsController");
const { authorize } = require("../middleware/authorize");

router.post("/", jwtAuth, conversationsController.newConversation);

router.patch(
    "/update/:id",
    jwtAuth,
    conversationsController.updateConversation
);

router.get("/:userId", jwtAuth, conversationsController.getConversationByUser);

router.get("/_id/:id", jwtAuth, conversationsController.getConversationById);

router.get("/acc/:conversationId", jwtAuth, conversationsController.getAccByConversationId);

router.get(
    "/find/:firstUserId/:secondUserId",
    jwtAuth,
    conversationsController.getConversationIncludesTwoUser
);

router.post(
    "/getListUserFromObjectIdConversation",
    jwtAuth,
    authorize("Admin", "Saler"),
    conversationsController.getListUserFromObjectIdConversation
);

module.exports = router;