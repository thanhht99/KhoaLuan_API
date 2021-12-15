const express = require('express');
const router = express.Router();
const { baseAuth } = require('../middleware/baseAuth');
const jwtAuth = require('../middleware/jwtAuth');
const authController = require('../controllers/authController');

router.post("/signUp", baseAuth, authController.signUp);

router.get("/findAcc/:id", baseAuth, authController.findAcc);

router.post("/signUp/verifyCode/:id", baseAuth, authController.verifyCode);

router.post("/signIn", baseAuth, authController.signIn);

router.post("/logout", jwtAuth, authController.logout);

router.post("/forgetPassword", baseAuth, authController.forgetPassword);

router.post("/resetPassword/:token", baseAuth, authController.resetPassword);

module.exports = router;