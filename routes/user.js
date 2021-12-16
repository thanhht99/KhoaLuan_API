const express = require("express");
const router = express.Router();
const jwtAuth = require("../middleware/jwtAuth");
const userController = require("../controllers/userController");
const { authorize } = require("../middleware/authorize");
const mongoUpload = require("../middleware/mongoUpload");
const { ConnectMongo } = require("../database/connectDB");

router.get("/all", jwtAuth, authorize("Admin"), userController.getAllUsers);

// router.get("/avatar", jwtAuth, userController.avatarUser);
router.get("/avatar/:id", userController.avatarUser);

router.get("/:userName", jwtAuth, userController.findUserByUserName);

router.get("/detail/:userName", jwtAuth, authorize("Admin"), userController.getUserByUserName);

router.get("/", jwtAuth, userController.getUser);

router.get("/acc/info", jwtAuth, userController.getAcc);

router.get(
    "/acc/_id/:id",
    jwtAuth,
    authorize("Admin", "Saler"),
    userController.getAccById
);

router.patch("/updatePassword", jwtAuth, userController.updatePassword);

router.patch("/updateUser", jwtAuth, userController.updateUser);

router.patch(
    "/updateAvatar",
    jwtAuth,
    mongoUpload.single("image"),
    userController.updateAvatar
);

module.exports = router;