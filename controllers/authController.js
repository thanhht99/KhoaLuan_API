const ErrorResponse = require("../model/statusResponse/ErrorResponse");
const SuccessResponse = require("../model/statusResponse/SuccessResponse");
const MailService = require("../utility/mail");
const Account = require("../model/database/Account");
const User = require("../model/database/User");
const Token = require("../model/database/Token");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");

Date.prototype.isDate = function() {
    return this !== "Invalid Date" && !isNaN(this) ? true : false;
};

function getBoolean(value) {
    switch (value) {
        case true:
        case "true":
        case 1:
        case "1":
            return true;
        case false:
        case "false":
        case 0:
        case "0":
            return false;
        default:
            return value;
    }
}

// Sign up
exports.signUp = asyncMiddleware(async(req, res, next) => {
    const {
        fullName,
        userName,
        email,
        phone,
        password,
        dayOfBirth,
        gender,
        role,
    } = req.body;
    req.checkBody("fullName", "Full Name is empty!!").notEmpty();
    req.checkBody("userName", "User Name is empty!!").notEmpty();
    req.checkBody("email", "Email is empty!!").notEmpty();
    req.checkBody("phone", "Phone is empty!!").notEmpty();
    req.checkBody("dayOfBirth", "Day Of Birth is empty!!").notEmpty();
    req.checkBody("gender", "Gender is empty!!").notEmpty();
    req.checkBody("password", "Password is empty!!").notEmpty();
    req.checkBody("email", "Invalid email!!").isEmail();
    req
        .checkBody("phone", "Invalid phone!!")
        .custom((val) => /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(val));
    req
        .checkBody("userName", "Invalid UserName!!")
        .custom((val) => /^[a-zA-Z0-9]+$/.test(val));

    let errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
        let array = [];
        errors.array().forEach((e) => array.push(e.msg));
        return next(new ErrorResponse(422, array));
    }
    let dayOfBirthD = new Date(dayOfBirth);
    // console.log("🚀 ~ Date(dayOfBirth)", dayOfBirthD);
    // console.log("🚀 ~ Date(dayOfBirth)", dayOfBirthD.isDate());
    if (!dayOfBirthD.isDate()) {
        return next(new ErrorResponse(400, "Day Of Birth invalid"));
    }

    const newAccount = new Account({
        userName,
        email,
        password,
        role,
    });
    newAccount.verifyCode = Math.floor(Math.random() * 1000000);
    const newUser = new User({
        fullName,
        email,
        phone,
        dayOfBirth: dayOfBirthD,
        gender,
        isAcc: true,
    });

    const res_acc = await newAccount.save();
    if (res_acc) {
        newUser.userAccount = res_acc._id;
        try {
            await newUser.save();
            await MailService.sendMail(
                `Clothes Store AT99<${process.env.USER_MAIL}>`,
                email,
                "Verify Code",
                `Hi ${fullName}.<br>Thank you for sign up an account on our website. ^-^.<br>` +
                `\n<b>User Name:</b> ${userName}.<br>` +
                `\n<b>Email:</b> ${email}.<br>` +
                `\n<b>Phone:</b> ${phone}.<br>` +
                `\n<b>Your Verify Code:</b> <span style="color:red"><b>${newAccount.verifyCode}</b></span>.<br>` +
                // `\nClick on the link to verify:http://localhost:3000/account/verify-code/${newAccount._id}.<br>`
                `\nClick on the link to verify:https://clothes-store-99.vercel.app/account/verify-code/${newAccount._id}.<br>`
            );
            return res
                .status(201)
                .json(
                    new SuccessResponse(
                        201,
                        `Sign up successfully. Please check your email - ${email}`
                    )
                );
        } catch (err) {
            await Account.findByIdAndDelete(res_acc._id);
            await User.findByIdAndDelete(res_user._id);
            return next(new ErrorResponse(500, err));
        }
        // if (res_user) {
        // }
    }
});

// Verify Code
exports.verifyCode = asyncMiddleware(async(req, res, next) => {
    const { id } = req.params;
    if (!id.trim()) {
        return next(new ErrorResponse(422, "Id is empty"));
    }
    const { verifyCode } = req.body;
    req.checkBody("verifyCode", "Verify Code is empty!!").notEmpty();

    let errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
        let array = [];
        errors.array().forEach((e) => array.push(e.msg));
        return next(new ErrorResponse(422, array));
    }
    const acc = await Account.findOne({ _id: id });
    if (acc) {
        if (!acc.isActive) {
            if (verifyCode.toString() === acc.verifyCode.toString()) {
                const updatedActiveAccount = await Account.findOneAndUpdate({ email: acc.email }, { isActive: true }, { new: true });
                // console.log(updatedActiveAccount);
                return res
                    .status(200)
                    .json(new SuccessResponse(200, "Verify successful"));
            }
            return next(new ErrorResponse(406, "Verify code incorrect"));
        }
        return next(new ErrorResponse(403, "Account already verified"));
    }
    return next(new ErrorResponse(404, "Account not exist"));
});

// Sign In
exports.signIn = asyncMiddleware(async(req, res, next) => {
    const { userNameOrEmail, password } = req.body;
    // console.log("🚀 ~ file: authController.js ~ line 106 ~ exports.signIn=asyncMiddleware ~ req.body", req.body)
    req.checkBody("userNameOrEmail", "User Name Or Email is empty!!").notEmpty();
    req.checkBody("password", "Password is empty!!").notEmpty();

    let errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
        let array = [];
        errors.array().forEach((e) => array.push(e.msg));
        return next(new ErrorResponse(422, array)).send(array);
    }
    const checkExistAccountByUserName = await Account.findOne({
        userName: userNameOrEmail,
    });
    const checkExistAccountByEmail = await Account.findOne({
        email: userNameOrEmail,
    });

    if (checkExistAccountByUserName || checkExistAccountByEmail) {
        const account =
            checkExistAccountByUserName || !checkExistAccountByEmail ?
            checkExistAccountByUserName :
            checkExistAccountByEmail;
        if (account.isActive) {
            const isMatchPassword = await Account.comparePassword(
                password,
                account.password
            );
            if (isMatchPassword) {
                if (account.isLogin) {
                    return next(
                        new ErrorResponse(403, "Account is logged in somewhere else")
                    );
                }
                const token = jwt.sign({
                        userName: account.userName,
                        email: account.email,
                        role: account.role,
                    },
                    process.env.SECRETKEY, { expiresIn: "2d" }
                );
                res.cookie("token", token, {
                    maxAge: 365 * 24 * 60 * 60 * 100,
                    httpOnly: true,
                    // secure: true;
                });
                const updatedIsLogin = await Account.findOneAndUpdate({ email: account.email }, { isLogin: true }, { new: true });
                setTimeout(async function() {
                    await Account.findOneAndUpdate({ email: jwt.decode(token).email }, { isLogin: false }, { new: true });
                    console.log(
                        "Run setTimeout() Account update isLogin(false) success !!! !!! !!!"
                    );
                }, 1000 * 60 * 60 * 20);
                return res.status(200).json(new SuccessResponse(200, token));
            }
            return next(new ErrorResponse(403, "Password is not match"));
        }
        return next(new ErrorResponse(403, "Account locked"));
    }
    return next(new ErrorResponse(404, "User Name Or Email not exist"));
});

// Sign In Google
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
exports.signInGoogle = asyncMiddleware(async(req, res, next) => {
    const { tokenGoogle } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: tokenGoogle,
        audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();

    const checkUser = await User.findOne({
        email,
        isAcc: true,
    });
    if (checkUser) {
        return next(
            new ErrorResponse(
                400,
                "You already have an account in our store, please login with that account"
            )
        );
    }
    if (!checkUser) {
        const checkAccount = await Account.findOne({
            email,
        });
        const login = async(check) => {
            if (check.isLogin) {
                return next(
                    new ErrorResponse(403, "Account is logged in somewhere else")
                );
            }
            const token = jwt.sign({
                    userName: check.userName,
                    email: check.email,
                    role: check.role,
                },
                process.env.SECRETKEY, { expiresIn: "2d" }
            );
            res.cookie("token", token, {
                maxAge: 365 * 24 * 60 * 60 * 100,
                httpOnly: true,
                // secure: true;
            });
            await Account.findOneAndUpdate({ email }, { isLogin: true }, { new: true });
            setTimeout(async function() {
                await Account.findOneAndUpdate({ email: jwt.decode(token).email }, { isLogin: false }, { new: true });
                console.log(
                    "Run setTimeout() Account update isLogin(false) success !!! !!! !!!"
                );
            }, 1000 * 60 * 60 * 20);
            return res.status(200).json(new SuccessResponse(200, token));
        };
        if (checkAccount) {
            login(checkAccount);
        }
        if (!checkAccount) {
            const accountCreate = new Account({
                userName: email.slice(0, email.indexOf("@gmail.com")),
                email,
                password: "123456789",
                isActive: true,
            });
            const userCreate = new User({
                userAccount: accountCreate._id,
                fullName: name,
                email,
                phone: "0345678900",
                isAcc: false,
                dayOfBirth: "01-01-2021",
                gender: "Male",
            });
            await accountCreate.save();
            await userCreate.save();
            const checkAccountAgain = await Account.findOne({
                email,
            });
            login(checkAccountAgain);
        }
    }
});

// Logout
exports.logout = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    const checkExistAccount = await Account.findOne({
        userName: req.session.account.userName,
    });
    if (!checkExistAccount) {
        return next(new ErrorResponse(404, "User Name not exist"));
    }
    await Account.findOneAndUpdate({ userName: req.session.account.userName }, { isLogin: false }, { new: true });
    res
        .status(200)
        .json(new SuccessResponse(200, "Update isLogin successful =_="));
});

// Forget password
exports.forgetPassword = asyncMiddleware(async(req, res, next) => {
    const { userNameOrEmail } = req.body;
    req.checkBody("userNameOrEmail", "User Name Or Email is empty!!").notEmpty();

    let errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
        let array = [];
        errors.array().forEach((e) => array.push(e.msg));
        return next(new ErrorResponse(422, array));
    }
    const checkExistAccountByUserName = await Account.findOne({
        userName: userNameOrEmail,
    });
    const checkExistAccountByEmail = await Account.findOne({
        email: userNameOrEmail,
    });
    const verifyCode = Math.floor(Math.random() * 1000000);

    if (checkExistAccountByUserName || checkExistAccountByEmail) {
        const account =
            checkExistAccountByUserName || !checkExistAccountByEmail ?
            checkExistAccountByUserName :
            checkExistAccountByEmail;
        if (account.isActive) {
            const token = crypto.randomBytes(30).toString("hex");
            const hashedToken = crypto
                .createHash("sha256")
                .update(token)
                .digest("hex");

            const newToken = await Token.findOneAndUpdate({ email: account.email }, {
                email: account.email,
                verifyCode,
                token: hashedToken,
                expired: Date.now() + 1000 * 60 * process.env.RESETPASSWORD_TOKEN_EXPIRED,
                userName: account.userName,
                accId: account._id,
            }, { upsert: true, new: true });

            if (newToken) {
                try {
                    await MailService.sendMail(
                        `Clothes Store AT99<${process.env.USER_MAIL}>`,
                        newToken.email,
                        "Verify you forgot your login information",
                        `Hi ${newToken.userName}.<br>` +
                        `\nYou have 5 minutes to reset your password.<br>` +
                        `\n<b>Your Verify Code:</b> <span style="color:red"><b>${newToken.verifyCode}</b></span>.<br>` +
                        `\nClick on the link to reset password:http://localhost:${process.env.PORT}/api/auth/resetPassword/${token}.<br>`
                    );
                    return res
                        .status(200)
                        .json(
                            new SuccessResponse(
                                200,
                                `Please check your email ${newToken.email} to reset password`
                            )
                        );
                } catch (err) {
                    return next(new ErrorResponse(500, err));
                }
            }
        }
        return next(new ErrorResponse(403, "Account locked"));
    }
    return next(new ErrorResponse(404, "User Name Or Email not exist"));
});

// Reset Password
exports.resetPassword = asyncMiddleware(async(req, res, next) => {
    const { token } = req.params;
    const { verifyCode, password } = req.body;
    req.checkBody("verifyCode", "Verify Code is empty!!").notEmpty();
    req.checkBody("password", "Password is empty!!").notEmpty();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // check token  in db
    const checkToken = await Token.findOne({
        token: hashedToken,
        expired: { $gt: Date.now() },
    });
    if (!checkToken) {
        return next(new ErrorResponse(400, "Invalid Token or expired"));
    }
    let errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
        let array = [];
        errors.array().forEach((e) => array.push(e.msg));
        return next(new ErrorResponse(422, array));
    }
    if (verifyCode === checkToken.verifyCode) {
        const account = await Account.findById(checkToken.accId);
        if (!account) {
            return next(new ErrorResponse(404, "Account is not found"));
        }
        account.password = password;
        const res_acc = await account.save();
        if (res_acc) {
            try {
                await Token.findOneAndUpdate({ email: res_acc.email }, {
                    token: null,
                }, { upsert: true, new: true });
                return res
                    .status(200)
                    .json(new SuccessResponse(200, "Your password is updated"));
            } catch (err) {
                return next(new ErrorResponse(500, err));
            }
        }
    }
    return next(new ErrorResponse(406, "Verify code incorrect"));
});

// Find account
exports.findAcc = asyncMiddleware(async(req, res, next) => {
    try {
        const { id } = req.params;
        if (!id.trim()) {
            return next(new ErrorResponse(422, "Id is empty"));
        }

        const acc = await Account.findOne({ _id: id, isActive: false }).select(
            "-updatedAt -__v"
        );
        if (!acc) {
            return next(new ErrorResponse(404, "Account not exist"));
        }
        res.status(200).json(new SuccessResponse(200, acc));
    } catch (err) {
        return next(new ErrorResponse(500, err));
    }
});

// Get Staffs
exports.getStaff = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    const acc = await Account.find({ role: "Saler" }).select(
        "-updatedAt -password -__v"
    );
    if (!acc) {
        return next(new ErrorResponse(404, "Acc is not found"));
    }
    return res.status(200).json(new SuccessResponse(200, acc));
});

// Get customer
exports.getCustomer = asyncMiddleware(async(req, res, next) => {
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    const acc = await Account.find({ role: "Customer" }).select(
        "-updatedAt -password -__v"
    );
    if (!acc) {
        return next(new ErrorResponse(404, "Acc is not found"));
    }
    return res.status(200).json(new SuccessResponse(200, acc));
});

// Update isActive Acc
exports.updateActiveAcc = asyncMiddleware(async(req, res, next) => {
    const { userName } = req.params;
    const isActive = getBoolean(req.query.isActive);
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    if (!userName.trim()) {
        return next(new ErrorResponse(400, "Username is empty"));
    }
    if (
        isActive === null ||
        isActive === undefined ||
        typeof isActive !== "boolean"
    ) {
        return next(new ErrorResponse(404, "API invalid"));
    }
    const updatedAcc = await Account.findOneAndUpdate({ userName }, { isActive }, { new: true });
    if (!updatedAcc) {
        return next(new ErrorResponse(400, "Acc update failed"));
    }
    if (updatedAcc) {
        const updatedUser = await User.findOneAndUpdate({ email: updatedAcc.email }, { isActive }, { new: true });
        if (!updatedUser) {
            return next(new ErrorResponse(400, "User update failed"));
        }
        if (updatedUser) {
            return res
                .status(200)
                .json(new SuccessResponse(200, "Updated successfully"));
        }
    }
});

// Update IsLogin Acc
exports.updateIsLogin = asyncMiddleware(async(req, res, next) => {
    const { userName } = req.params;
    const isLogin = getBoolean(req.query.isLogin);
    if (!req.session.account) {
        return next(new ErrorResponse(401, "End of login session"));
    }
    if (!userName.trim()) {
        return next(new ErrorResponse(400, "Username is empty"));
    }
    if (
        isLogin === null ||
        isLogin === undefined ||
        typeof isLogin !== "boolean"
    ) {
        return next(new ErrorResponse(404, "API invalid"));
    }
    const updatedAcc = await Account.findOneAndUpdate({ userName }, { isLogin }, { new: true });
    if (!updatedAcc) {
        return next(new ErrorResponse(400, "Acc update isLogin failed"));
    }
    if (updatedAcc) {
        return res
            .status(200)
            .json(new SuccessResponse(200, "Updated successfully"));
    }
});