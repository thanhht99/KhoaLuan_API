const express = require("express");
const router = express.Router();
const { baseAuth } = require("../middleware/baseAuth");
const jwtAuth = require("../middleware/jwtAuth");
const messagesController = require("../controllers/messagesController");

router.post("/", jwtAuth, messagesController.newMessage);

router.get("/:conversationId", jwtAuth, messagesController.getMessageByUser);

module.exports = router;