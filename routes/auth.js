const express = require("express");
const router = express.Router();
const { baseAuth } = require("../middleware/baseAuth");
const { authorize } = require("../middleware/authorize");
const jwtAuth = require("../middleware/jwtAuth");
const authController = require("../controllers/authController");

router.post("/signUp", baseAuth, authController.signUp);

router.get("/findAcc/:id", baseAuth, authController.findAcc);

router.post("/signUp/verifyCode/:id", baseAuth, authController.verifyCode);

router.post("/signIn", baseAuth, authController.signIn);

router.post("/signInGoogle", authController.signInGoogle);

router.post("/logout", jwtAuth, authController.logout);

router.post("/forgetPassword", baseAuth, authController.forgetPassword);

router.post("/resetPassword/:token", baseAuth, authController.resetPassword);

router.get("/staff", jwtAuth, authorize("Admin"), authController.getStaff);

router.get(
    "/customer",
    jwtAuth,
    authorize("Admin"),
    authController.getCustomer
);

router.patch(
    "/updateActive/:userName",
    jwtAuth,
    authorize("Admin"),
    authController.updateActiveAcc
);

router.patch(
    "/updateIsLogin/:userName",
    jwtAuth,
    authorize("Admin"),
    authController.updateIsLogin
);

module.exports = router;