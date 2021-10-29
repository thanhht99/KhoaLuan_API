const express = require("express");
const router = express.Router();
const { baseAuth } = require("../middleware/baseAuth");
const multer = require("multer");
const firebaseController = require("../controllers/firebaseController");

const upload = multer({
    storage: multer.memoryStorage(),
});

router.post(
    "/upload/:id",
    upload.single("file"),
    baseAuth,
    firebaseController.upload
);

router.get("/getImage/:name", baseAuth, firebaseController.getImage);

module.exports = router;