const express = require("express");
const router = express.Router();
const { baseAuth } = require("../middleware/baseAuth");
const firebaseController = require("../controllers/firebaseController");

router.post(
    "/upload/:id",
    baseAuth,
    firebaseController.upload
);

router.post(
    "/uploadProduct/:id",
    baseAuth,
    firebaseController.uploadImageProduct
);

router.get("/getImage/:name", baseAuth, firebaseController.getImage);

module.exports = router;