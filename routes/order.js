const express = require('express');
const router = express.Router();
const jwtAuth = require('../middleware/jwtAuth');
const orderController = require('../controllers/orderController');
const { authorize } = require("../middleware/authorize");
const mongoUpload = require("../middleware/mongoUpload");
const { baseAuth } = require('../middleware/baseAuth');

router.get("/allOrder", jwtAuth, authorize("Admin", "Saler"), orderController.allOrder);

router.get("/", jwtAuth, orderController.orderOfUser);

router.post("/", baseAuth, orderController.createOrder);

router.get("/search/:orderCode", baseAuth, orderController.searchOrder);

router.post("/changeOrderStatus/:id", jwtAuth, authorize("Admin", "Saler"),
    orderController.changeOrderStatus
);

router.patch("/updateActive/:id", jwtAuth, authorize("Admin", "Saler"), orderController.updateActiveOrder);

router.patch("/cancel/:id", jwtAuth, orderController.cancelOrder);

// Confirmation of receipt of goods
router.post("/confirmationOfReceiptOfGoods/:id", jwtAuth, orderController.confirmationOfReceiptOfGoods);

module.exports = router;