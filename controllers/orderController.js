const ErrorResponse = require("../model/statusResponse/ErrorResponse");
const SuccessResponse = require("../model/statusResponse/SuccessResponse");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const Order = require("../model/database/Order");
const Cart = require("../model/database/Cart");
const Voucher = require("../model/database/Voucher");
const Bill = require("../model/database/Bill");
const Product = require("../model/database/Product");

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
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

// All Order
exports.allOrder = asyncMiddleware(async (req, res, next) => {
  if (!req.session.account) {
    return next(new ErrorResponse(401, "End of login session"));
  }
  try {
    const order = await Order.find()
      .populate({
        path: "product_detail",
        select: "name price",
      })
      .select("-updatedAt -createdAt -__v");
    if (!order.length) {
      return next(new ErrorResponse(404, "No orders"));
    }
    return res.status(200).json(new SuccessResponse(200, order));
  } catch (error) {
    return next(new ErrorResponse(400, error));
  }
});

// Get Order of User
exports.orderOfUser = asyncMiddleware(async (req, res, next) => {
  if (!req.session.account) {
    return next(new ErrorResponse(401, "End of login session"));
  }
  const order = await Order.findOne({ userEmail: req.session.account.email });
  if (!order) {
    return next(new ErrorResponse(404, "No order"));
  }
  return res.status(200).json(new SuccessResponse(200, order));
});

// Create Order Postman
exports.createOrderPostman = asyncMiddleware(async (req, res, next) => {
  const { address, payments, phone, voucherCode } = req.body;

  req.checkBody("address", "Address is empty!!").notEmpty();
  req.checkBody("payments", "Payments is empty!!").notEmpty();
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

  let discount = 0;

  if (voucherCode) {
    const findVoucherCode = await Voucher.findOne({
      code: voucherCode,
      isActive: true,
    });
    if (!findVoucherCode) {
      return next(new ErrorResponse(404, "Voucher code not found"));
    }
    if (findVoucherCode.type === "Money") {
      discount = findVoucherCode.discount;
    }
    if (findVoucherCode.type === "Percent") {
      discount = findVoucherCode.discount;
    }
  }

  if (cart) {
    const newOrder = new Order({
      userEmail: req.session.account.email,
      address,
      phone,
      payments,
      voucherCode,
    });
    const date = new Date();
    const day = date.getUTCDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    // ordercode
    newOrder.orderCode =
      Math.floor(Math.random() * 10000) + `${day}${month}${year}`;
    let checkOrderCode = await Order.findOne({ orderCode: newOrder.orderCode });
    while (checkOrderCode) {
      newOrder.orderCode =
        Math.floor(Math.random() * 10000) + `${day}${month}${year}`;
      checkOrderCode = await Order.findOne({ orderCode: newOrder.orderCode });
    }

    newOrder.products = cart.products;
    newOrder.orderDate = date;
    newOrder.intendedArrivalDate = date.addDays(5);

    newOrder.temporaryMoney = Number.parseInt(cart.totalPayment);
    newOrder.transportFee = 1000; // AI ship
    newOrder.totalProduct = cart.totalProduct;
    if (discount === 0) {
      newOrder.totalPayment =
        Number.parseInt(newOrder.transportFee) +
        Number.parseInt(newOrder.temporaryMoney);
      newOrder.discount = 0;
    }
    if (discount > 0 && discount <= 1) {
      newOrder.totalPayment =
        Number.parseInt(newOrder.transportFee) +
        Number.parseInt(newOrder.temporaryMoney) -
        (Number.parseInt(newOrder.transportFee) +
          Number.parseInt(newOrder.temporaryMoney)) *
          discount;
      newOrder.discount = discount;
      newOrder.isVoucher = true;
    }
    if (discount > 1000) {
      newOrder.totalPayment =
        Number.parseInt(newOrder.transportFee) +
        Number.parseInt(newOrder.temporaryMoney) -
        discount;
      newOrder.discount = discount;
      newOrder.isVoucher = true;
    }
    console.log(
      "🚀 ~ file: orderController.js ~ line 106 ~ exports.createOrder=asyncMiddleware ~ newOrder",
      newOrder
    );

    const link = process.env.linkPayment;
    if (payments === "Momo") {
      for (let i = 0; i < newOrder.products.length; i++) {
        const product = await Product.findOne({
          _id: newOrder.products[i].productId,
        });
        if (product) {
          if (product.quantity >= newOrder.products[i].quantity) {
          } else {
            return next(
              new ErrorResponse(
                400,
                `Quantity don't enough. Please check ${product.name}`
              )
            );
          }
        }
      }
      if (newOrder.totalProduct > 0) {
        //   console.log(newOrder);
        const res_order = await newOrder.save();
        if (res_order) {
          for (let i = 0; i < newOrder.products.length; i++) {
            const product = await Product.findOne({
              _id: newOrder.products[i].productId,
            });
            if (product) {
              if (product.quantity >= newOrder.products[i].quantity) {
                product.quantity =
                  product.quantity - newOrder.products[i].quantity;
                await product.save();
              } else {
                return next(
                  new ErrorResponse(
                    400,
                    "BUG Website. Please connect admin to fix error. Thanks! (Error: Quantity don't enough.)"
                  )
                );
              }
            }
          }
          cart.products = [];
          cart.totalPayment = 0;
          cart.totalProduct = 0;
          const data = await cart.save();
          return res
            .status(201)
            .json(
              new SuccessResponse(
                201,
                `Order successfully. Please pay your order - ${link}`
              )
            );
        }
      } else {
        return next(new ErrorResponse(400, "Cart is empty"));
      }
    } else {
      return next(
        new ErrorResponse(400, "Currently only supports Momo payments")
      );
    }
  } else {
    return next(new ErrorResponse(400, "Cart is empty"));
  }
});

// Create Order
exports.createOrder = asyncMiddleware(async (req, res, next) => {
  const {
    address,
    payments,
    phone,
    voucherCode,
    discount,
    email,
    fullName,
    note,
    orderDate,
    intendedArrivalDate,
    products,
    temporaryMoney,
    totalPayment,
    totalProduct,
    transportFee,
  } = req.body;

  req.checkBody("address", "Address is empty!!").notEmpty();
  req.checkBody("payments", "Address is empty!!").notEmpty();
  req.checkBody("phone", "Address is empty!!").notEmpty();
  req.checkBody("email", "Address is empty!!").notEmpty();
  req.checkBody("fullName", "Payments is empty!!").notEmpty();
  req.checkBody("intendedArrivalDate", "Phone is empty!!").notEmpty();
  req.checkBody("temporaryMoney", "Phone is empty!!").notEmpty();
  req.checkBody("totalPayment", "Phone is empty!!").notEmpty();
  req.checkBody("transportFee", "Phone is empty!!").notEmpty();
  req.checkBody("totalProduct", "Phone is empty!!").notEmpty();
  req
    .checkBody("phone", "Invalid phone!!")
    .custom((val) => /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(val));

  let errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    let array = [];
    errors.array().forEach((e) => array.push(e.msg));
    return next(new ErrorResponse(422, array));
  }

  if (totalProduct > 0) {
    const newOrder = new Order({
      email,
      fullName,
      products,
      orderDate,
      address,
      intendedArrivalDate,
      payments,
      phone,
      temporaryMoney,
      transportFee,
      totalProduct,
      totalPayment,
      voucherCode,
      discount,
      note,
    });
    const date = new Date();
    const day = date.getUTCDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    // ordercode
    newOrder.orderCode =
      Math.floor(Math.random() * 10000) + `${day}${month}${year}`;
    let checkOrderCode = await Order.findOne({ orderCode: newOrder.orderCode });
    while (checkOrderCode) {
      newOrder.orderCode =
        Math.floor(Math.random() * 10000) + `${day}${month}${year}`;
      checkOrderCode = await Order.findOne({ orderCode: newOrder.orderCode });
    }
    for (let i = 0; i < newOrder.products.length; i++) {
      const product = await Product.findOne({
        _id: newOrder.products[i].id,
        isActive: true,
      });
      if (product) {
        if (product.quantity >= newOrder.products[i].quantity) {
          newOrder.products[i].sku = product.sku;
        } else {
          return next(
            new ErrorResponse(
              400,
              `Quantity don't enough. Please check ${product.name}`
            )
          );
        }
      }
    }
    if (newOrder.totalProduct > 0) {
      // console.log(newOrder);
      const res_order = await newOrder.save();
      if (!res_order) {
        return next(
          new ErrorResponse(
            400,
            "BUG Website. Please connect admin to fix error. Thanks! (Error: Can't create an order.)"
          )
        );
      }
      for (let i = 0; i < newOrder.products.length; i++) {
        const product = await Product.findOne({
          _id: newOrder.products[i].id,
        });
        if (product) {
          if (product.quantity >= newOrder.products[i].quantity) {
            product.quantity = product.quantity - newOrder.products[i].quantity;
            product.sold += newOrder.products[i].quantity;
            await product.save();
          } else {
            return next(
              new ErrorResponse(
                400,
                "BUG Website. Please connect admin to fix error. Thanks! (Error: Quantity don't enough.)"
              )
            );
          }
        }
      }
      return res.status(201).json(new SuccessResponse(201, newOrder));
    } else {
      return next(new ErrorResponse(400, "Cart is empty"));
    }
  } else {
    return next(new ErrorResponse(400, "Cart is empty"));
  }
});

// Change Order Status
exports.changeOrderStatus = asyncMiddleware(async (req, res, next) => {
  if (!req.session.account) {
    return next(new ErrorResponse(401, "End of login session"));
  }
  const { id } = req.params;
  const { orderStatus } = req.body;
  req.checkBody("orderStatus", "Order Status is empty!!").notEmpty();

  let errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    let array = [];
    errors.array().forEach((e) => array.push(e.msg));
    return next(new ErrorResponse(422, array));
  }

  if (!id.trim()) {
    return next(new ErrorResponse(400, "Id is empty"));
  }
  const listOrderStatus = [
    "Waiting for confirmation",
    "Waiting for the goods",
    "Delivered to the carrier",
    "Delivering",
    "Successful delivery",
    "Has received the goods",
    "Cancel order",
    "Return the goods/ Refund",
  ];
  if (!listOrderStatus.includes(orderStatus)) {
    return next(
      new ErrorResponse(
        400,
        "Invalid order status, list order status: " + listOrderStatus
      )
    );
  }

  const order = await Order.findOne({
    _id: id,
    isActive: true,
  }).select("-updatedAt -createdAt -__v");
  // console.log(order);
  if (!order) {
    return next(
      new ErrorResponse(404, "Update order status failed ! Invalid order")
    );
  }
  const updatedOrderStatus = await Order.findOneAndUpdate(
    { _id: id },
    { orderStatus },
    { new: true }
  );
  if (!updatedOrderStatus) {
    return next(new ErrorResponse(400, "Update failed !!!"));
  }
  return res.status(200).json(new SuccessResponse(200, updatedOrderStatus));
});

// Update isActive Order
exports.updateActiveOrder = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  const isActive = getBoolean(req.query.isActive);
  if (!req.session.account) {
    return next(new ErrorResponse(401, "End of login session"));
  }
  if (!id.trim()) {
    return next(new ErrorResponse(400, "Id is empty"));
  }
  // console.log(isActive)
  if (
    isActive === null ||
    isActive === undefined ||
    typeof isActive !== "boolean"
  ) {
    return next(new ErrorResponse(404, "API invalid"));
  }
  const updatedOrder = await Order.findOneAndUpdate(
    { _id: id },
    { isActive },
    { new: true }
  );
  if (!updatedOrder) {
    return next(new ErrorResponse(400, "Not found to updated"));
  }
  return res.status(200).json(new SuccessResponse(200, updatedOrder));
});

// Confirmation of receipt of goods
exports.confirmationOfReceiptOfGoods = asyncMiddleware(
  async (req, res, next) => {
    const { id } = req.params;
    if (!req.session.account) {
      return next(new ErrorResponse(401, "End of login session"));
    }
    if (!id.trim()) {
      return next(new ErrorResponse(400, "Id is empty"));
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: id, userEmail: req.session.account.email, isActive: true },
      { orderStatus: "Has received the goods" },
      { new: true }
    );
    if (!updatedOrder) {
      return next(
        new ErrorResponse(400, "Not found to updated, order status.!")
      );
    }
    return res.status(200).json(new SuccessResponse(200, updatedOrder));
  }
);
