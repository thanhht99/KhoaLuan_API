const ErrorResponse = require("../model/statusResponse/ErrorResponse");
const SuccessResponse = require("../model/statusResponse/SuccessResponse");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const Conversation = require("../model/database/Conversation");
const Message = require("../model/database/Message");

// new Conversation
exports.newConversation = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(201).json(new SuccessResponse(201, savedConversation));
    } catch (err) {
        return next(new ErrorResponse(500, err));
    }
});

// get conv of a user
exports.getConversationByUser = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(new SuccessResponse(200, conversation));
    } catch (err) {
        return next(new ErrorResponse(500, err));
    }
});

// get conv includes two userId
exports.getConversationIncludesTwoUser = asyncMiddleware(
    async(req, res, next) => {
        if (!req.session.account) {
            return next(new ErrorResponse(401, "End of login session"));
        }
        try {
            const conversation = await Conversation.findOne({
                members: { $all: [req.params.firstUserId, req.params.secondUserId] },
            });
            res.status(200).json(new SuccessResponse(200, conversation));
        } catch (err) {
            return next(new ErrorResponse(500, err));
        }
    }
);