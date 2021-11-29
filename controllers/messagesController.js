const ErrorResponse = require("../model/statusResponse/ErrorResponse");
const SuccessResponse = require("../model/statusResponse/SuccessResponse");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const Conversation = require("../model/database/Conversation");
const Message = require("../model/database/Message");

// new Message
exports.newMessage = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    const newMessage = new Message(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.status(201).json(new SuccessResponse(201, savedMessage));
    } catch (err) {
        return next(new ErrorResponse(500, err));
    }
});

// get mess of a user
exports.getMessageByConversation = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(new SuccessResponse(200, messages));
    } catch (err) {
        return next(new ErrorResponse(500, err));
    }
});