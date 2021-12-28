const express = require("express");
const app = express();
const router = express.Router();
const jwtAuth = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const mongoUpload = require("../middleware/mongoUpload");
const { baseAuth } = require("../middleware/baseAuth");
const Order = require("../model/database/Order");
const Product = require("../model/database/Product");

const paypal = require("paypal-rest-sdk");

paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id: "AXeZGumWUdIjKxz4oZPuXpl6EY0b21fxX5iNKhGhGK5zUCzjlAzF1o3Q-CC92aGWDA4lRqlCNkXnhmYx",
    client_secret: "EFstekfrvBk_MCfEhr9TT9qGtZ7hGrsO54655Wy5mWP6GJL4CySEfe2Oi7TC3KPKuGz3mAzv6GuwNwZo",
});

router.get("/pay/:orderCode", async(req, res) => {
    const { orderCode } = req.params;
    const order = await Order.findOne({ orderCode });

    const list_items = order ?
        await Promise.all(
            order.products.map(async(item) => {
                const find = await Product.findOne({
                    sku: item.sku,
                    isActive: true,
                }).select(" name price sku image category");

                return {
                    name: find.name,
                    sku: item.sku,
                    price: item.discount ?
                        item.discount.discount > 1 ?
                        `${parseFloat(item.price - item.discount.discount).toFixed(
                    2
                  )}` :
                        `${parseFloat(
                    item.price - item.price * item.discount.discount
                  ).toFixed(2)}` : `${item.price}`,
                    currency: "USD",
                    quantity: `${item.quantity}`,
                };
            })
        ) : {
            name: "1",
            sku: "1",
            price: "0",
            currency: "USD",
            quantity: "0",
        };
    // console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 ~ list_items", list_items);

    const create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal",
        },
        redirect_urls: {
            return_url: `${process.env.API_URL}/api/payment/success/${orderCode}`,
            cancel_url: `${process.env.API_URL}/api/payment/cancel`,
        },
        transactions: [{
            item_list: {
                items: list_items,
                shipping_address: {
                    recipient_name: order ? order.fullName : "Betsy Buyer",
                    line1: order ? order.address : "111 First Street",
                    city: "Saratoga",
                    country_code: "VN",
                },
            },
            amount: {
                currency: "USD",
                total: order ? `${order.totalPayment}` : "0",
                details: {
                    shipping: order ? `${order.transportFee}` : "0",
                    subtotal: order ? `${order.temporaryMoney}` : "0",
                },
            },
            description: order ? order.note : "0",
        }, ],
    };

    paypal.payment.create(create_payment_json, function(error, payment) {
        if (!order) {
            res.render("error");
        }
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === "approval_url") {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
});

router.get("/success/:orderCode", async(req, res) => {
    const { orderCode } = req.params;
    const order = await Order.findOne({ orderCode });

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        payer_id: payerId,
        transactions: [{
            amount: {
                currency: "USD",
                total: order ? `${order.totalPayment}` : "0",
                details: {
                    shipping: order ? `${order.transportFee}` : "0",
                    subtotal: order ? `${order.temporaryMoney}` : "0",
                },
            },
        }, ],
    };

    // Obtains the transaction details from paypal
    paypal.payment.execute(
        paymentId,
        execute_payment_json,
        function(error, payment) {
            if (!order) {
                res.render("error");
            }
            //When error occurs when due to non-existent transaction, throw an error else log the transaction details in the console then send a Success string reposponse to the user.
            if (error) {
                // console.log(error.response);
                throw error;
            } else {
                // console.log(JSON.stringify(payment));
                res.render("success");
            }
        }
    );
});

router.get("/cancel", (req, res) => {
    res.render("error");
});

module.exports = router;

// if (res_order) {
//     if (res_order.payments === "Paypal") {
//         console.log("💯💯💯💯💯💯 💯💯💯💯💯💯");
//         const create_payment_json = {
//             intent: "sale",
//             payer: {
//                 payment_method: "paypal",
//             },
//             redirect_urls: {
//                 return_url: "http://localhost:4200/api/payment/success",
//                 cancel_url: "http://localhost:4200/api/payment/cancel",
//             },
//             transactions: [{
//                 item_list: {
//                     items: res_order.products.map(async(item) => {
//                         const find = await Product.findOne({
//                             sku: item.sku,
//                             isActive: true,
//                         }).select(" name price sku image category");
//                         return {
//                             name: find.name,
//                             sku: item.sku,
//                             price: item.price,
//                             currency: "USD",
//                             quantity: item.quantity,
//                         };
//                     }),
//                 },
//                 amount: {
//                     currency: "USD",
//                     total: res_order.totalPayment,
//                 },
//                 description: res_order.note,
//             }, ],
//         };

//         paypal.payment.create(create_payment_json, function(error, payment) {
//             if (error) {
//                 throw error;
//             } else {
//                 for (let i = 0; i < payment.links.length; i++) {
//                     if (payment.links[i].rel === "approval_url") {
//                         res.redirect(payment.links[i].href);
//                     }
//                 }
//             }
//         });
//     }
// }