const ErrorResponse = require("../model/statusResponse/ErrorResponse");
const SuccessResponse = require("../model/statusResponse/SuccessResponse");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const Conversation = require("../model/database/Conversation");
const Message = require("../model/database/Message");
const Account = require("../model/database/Account");

// new Conversation
exports.newConversation = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    const newConversation = new Conversation({
        members: [
            req.body.senderId,
            req.body.receiverId ? req.body.receiverId : "Waiting",
        ],
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(201).json(new SuccessResponse(201, savedConversation));
    } catch (err) {
        return next(new ErrorResponse(500, err));
    }
});

// update Conversation
exports.updateConversation = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }

    try {
        const { id } = req.params;
        if (!id.trim()) {
            return next(new ErrorResponse(422, "Id is empty"));
        }
        const conversation = await Conversation.findOne({ _id: id });
        if (!conversation) {
            return next(new ErrorResponse(404, "Conversation not exist"));
        }
        if (conversation) {
            const updatedConversation = await Conversation.findOneAndUpdate({ _id: id }, { members: [req.body.senderId, req.body.receiverId] }, { new: true });
            res.status(200).json(new SuccessResponse(200, updatedConversation));
        }
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

// get conv of _id
exports.getConversationById = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    try {
        const { id } = req.params;
        if (!id.trim()) {
            return next(new ErrorResponse(422, "Id is empty"));
        }
        const conversation = await Conversation.findOne({ _id: id });
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

// get list user from objectId conv
exports.getListUserFromObjectIdConversation = asyncMiddleware(
    async(req, res, next) => {
        if (!req.session.account) {
            return next(new ErrorResponse(401, "End of login session"));
        }
        try {
            const listNeedSupport = req.body.listNeedSupport;
            const listAcc = await Promise.all(
                listNeedSupport.map(async(item) => {
                    const res = await Account.findOne({ _id: item }).select(
                        "-updatedAt -__v -password"
                    );
                    return res.userName;
                })
            );
            res.status(200).json(new SuccessResponse(200, listAcc));
        } catch (err) {
            return next(new ErrorResponse(500, err));
        }
    }
);

// get conv of _id
exports.getConversationById = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    try {
        const { id } = req.params;
        if (!id.trim()) {
            return next(new ErrorResponse(422, "Id is empty"));
        }
        const conversation = await Conversation.findOne({ _id: id });
        res.status(200).json(new SuccessResponse(200, conversation));
    } catch (err) {
        return next(new ErrorResponse(500, err));
    }
});

// get acc by conversationId
exports.getAccByConversationId = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    try {
        const { conversationId } = req.params;
        const conversation = await Conversation.findOne({
            _id: conversationId,
        });
        const acc = await Account.findOne({ _id: conversation.members[0] }).select(
            "-updatedAt -__v -password"
        );
        res.status(200).json(new SuccessResponse(200, acc));
    } catch (err) {
        return next(new ErrorResponse(500, err));
    }
});