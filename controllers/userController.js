const ErrorResponse = require("../model/statusResponse/ErrorResponse");
const SuccessResponse = require("../model/statusResponse/SuccessResponse");
const Account = require("../model/database/Account");
const User = require("../model/database/User");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const { ConnectMongo } = require("../database/connectDB");
const removeUpload = require("../middleware/removeUpload");

// Get All Users
exports.getAllUsers = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    const users = await User.find().select("-updatedAt -createdAt -__v");
    const userAndAccount = await Promise.all(
        users.map(async(user) => {
            if (user.isAcc) {
                const account = await Account.findOne({ email: user.email }).select(
                    "-password -updatedAt -createdAt -__v"
                );
                user.account = account;
                return user;
            }
            return user;
        })
    );
    if (!userAndAccount) {
        return next(new ErrorResponse(404, "User and Account are not found"));
    }
    return res.status(200).json(new SuccessResponse(200, userAndAccount));
});

// Get User
exports.getUser = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    const user = await User.findOne({ email: req.session.account.email }).select(
        "-updatedAt -createdAt -__v"
    );
    if (!user) {
        return next(new ErrorResponse(404, "User is not found"));
    }
    return res.status(200).json(new SuccessResponse(200, user));
});

// Get Account
exports.getAcc = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    const acc = await Account.findOne({
        email: req.session.account.email,
    }).select("-password -updatedAt -createdAt -__v");
    if (!acc) {
        return next(new ErrorResponse(404, "Account is not found"));
    }
    return res.status(200).json(new SuccessResponse(200, acc));
});

// Get Account By Id
exports.getAccById = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    try {
        const { id } = req.params;
        if (!id.trim()) {
            return next(new ErrorResponse(422, "Id is empty"));
        }

        const acc = await Account.findOne({ _id: id })
            .populate({
                path: "user_detail",
            })
            .select(" -updatedAt -createdAt -__v");
        if (!acc) {
            return next(new ErrorResponse(404, "Account is not found"));
        }
        res.status(200).json(new SuccessResponse(200, acc));
    } catch (err) {
        return next(new ErrorResponse(500, err));
    }
});

// Find User By UserName
exports.findUserByUserName = asyncMiddleware(async(req, res, next) => {
    const { userName } = req.params;
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    if (userName !== req.session.account.userName) {
        return next(new ErrorResponse(403, "Forbidden !!!. What are you doing???"));
    }
    try {
        const user = await User.findOne({
            email: req.session.account.email,
        }).select("-updatedAt -createdAt -__v");
        if (user.isAcc) {
            const account = await Account.findOne({ email: user.email }).select(
                "-password -updatedAt -createdAt -__v"
            );
            user.account = account;
        }
        return res.status(200).json(new SuccessResponse(200, user));
    } catch (error) {
        return next(new ErrorResponse(400, error));
    }
});

// Avatar User
exports.avatarUser = asyncMiddleware(async(req, res, next) => {
    // if (!req.session.account) {
    //     return next(new ErrorResponse(401, "End of login session"));
    // }
    // const checkExistAccount = await Account.findOne({
    //     userName: req.session.account.userName,
    // });
    const checkExistAccount = await Account.findOne({
        _id: req.params.id,
    });
    if (!checkExistAccount) {
        return next(new ErrorResponse(404, "Account is not found"));
    }
    if (!checkExistAccount.isActive) {
        return next(new ErrorResponse(403, "Account locked"));
    }

    try {
        const findUser = await User.findOne({ email: checkExistAccount.email });
        req.params.filename = findUser.image;

        const { filename } = req.params;

        const file = ConnectMongo.gfs.find({ filename }).toArray((err, files) => {
            if (!files || !files.length) {
                return next(new ErrorResponse(404, "file not found"));
            }
            ConnectMongo.gfs.openDownloadStreamByName(filename).pipe(res);
        });
    } catch (error) {
        return next(new ErrorResponse(500, "Can't open the image"));
    }
});

// Update Password
exports.updatePassword = asyncMiddleware(async(req, res, next) => {
    const { password } = req.body;
    req.checkBody("password", "Password is empty!!").notEmpty();

    let errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
        let array = [];
        errors.array().forEach((e) => array.push(e.msg));
        return next(new ErrorResponse(422, array));
    }

    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    const checkExistAccount = await Account.findOne({
        userName: req.session.account.userName,
    });
    if (!checkExistAccount) {
        return next(new ErrorResponse(404, "Account is not found"));
    }
    if (checkExistAccount.isActive) {
        checkExistAccount.password = password;
        const updatedPassword = await checkExistAccount.save();
        // console.log(updatedPassword);
        if (!updatedPassword) {
            return next(new ErrorResponse(400, "Update Password Failure"));
        }
        return res.status(200).json(new SuccessResponse(200, "Updated success"));
    }
    return next(new ErrorResponse(403, "Account locked"));
});

// Update User
exports.updateUser = asyncMiddleware(async(req, res, next) => {
    const { address, phone } = req.body;
    console.log(
        "🚀 ~ file: userController.js ~ line 157 ~ exports.updateUser=asyncMiddleware ~ address, phone",
        req.body
    );
    req.checkBody("address", "Address is empty!!").notEmpty();
    req.checkBody("phone", "Phone is empty!!").notEmpty();
    req
        .checkBody("phone", "Invalid phone!!")
        .custom((val) => /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(val));

    let errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
        let array = [];
        errors.array().forEach((e) => array.push(e.msg));
        return next(new ErrorResponse(422, array));
    }

    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    const checkExistAccount = await Account.findOne({
        userName: req.session.account.userName,
    });
    if (!checkExistAccount) {
        return next(new ErrorResponse(404, "Account is not found"));
    }
    if (!checkExistAccount.isActive) {
        return next(new ErrorResponse(403, "Account locked"));
    }

    const user = await User.findOne({ email: req.session.account.email });
    if (!user) {
        return next(new ErrorResponse(404, "User not found"));
    }

    const updateUser = await User.findOneAndUpdate({ email: req.session.account.email }, { address, phone }, { new: true });
    if (!updateUser) {
        return next(
            new ErrorResponse(
                400,
                "Update Failure. Please contact the administrator to get the problem resolved. Thanks!!!"
            )
        );
    }
    return res.status(200).json(new SuccessResponse(200, updateUser));
});

// Update Avatar
exports.updateAvatar = asyncMiddleware(async(req, res, next) => {
    const image = req.file.filename;

    if (!req.session.account) {
        removeUpload(req.file.filename);
        return next(new ErrorResponse(401, "End of login session"));
    }
    const checkExistAccount = await Account.findOne({
        userName: req.session.account.userName,
    });
    if (!checkExistAccount) {
        removeUpload(req.file.filename);
        return next(new ErrorResponse(404, "Account is not found"));
    }
    if (!checkExistAccount.isActive) {
        removeUpload(req.file.filename);
        return next(new ErrorResponse(403, "Account locked"));
    }

    if (!req.file.filename.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        removeUpload(req.file.filename);
        return next(new ErrorResponse(400, "This is not an image file"));
    }

    const user = await User.findOne({ email: req.session.account.email });
    if (!user) {
        return next(new ErrorResponse(404, "User not found"));
    }
    if (user.image) {
        removeUpload(user.image);
    }

    const updateUser = await User.findOneAndUpdate({ email: req.session.account.email }, { image }, { new: true });
    if (!updateUser) {
        removeUpload(req.file.filename);
        return next(
            new ErrorResponse(
                400,
                "Update Failure. Please contact the administrator to get the problem resolved. Thanks!!!"
            )
        );
    }
    return res.status(200).json(new SuccessResponse(200, updateUser));
});