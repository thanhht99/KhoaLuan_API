const express = require("express");
require("dotenv").config();

const app = express();
const cors = require("cors");
const validator = require("express-validator");
const colors = require("colors");
const session = require("express-session");
const errorMiddleware = require("./middleware/errorMiddleware");
const { ConnectMongo } = require("./database/connectDB");
// const connectDB = require("./database/connectDB");
const MailService = require("./utility/mail");
const socketio = require("socket.io");
const http = require("http");

const auth = require("./routes/auth");
const user = require("./routes/user");
const category = require("./routes/category");
const promotion = require("./routes/promotion");
const product = require("./routes/product");
const order = require("./routes/order");
const cart = require("./routes/cart");
const voucher = require("./routes/voucher");
const bill = require("./routes/bill");
const feedback = require("./routes/feedback");
const data = require("./routes/data");
const firebase = require("./routes/firebase");
const conversation = require("./routes/conversation");
const messages = require("./routes/messages");
const ml = require("./routes/ml");
const home = require("./routes/home");

// using MongoDB
ConnectMongo.getConnect();

MailService.init();

// middleware parse body
app.use(express.json());
app.use(express.static("public"));
app.use("/image", express.static("image"));
app.use(
    cors({
        credentials: true, //Để bật cookie HTTP qua CORS
    })
);
// Cho phép lý dữ liệu từ form method POST
app.use(express.urlencoded({ extended: true }));

// DEV
// const morgan = require("morgan");
// app.use(morgan("tiny"));

app.use(validator());
app.use(
    session({
        cookie: { httpOnly: true, maxAge: 60 * 60 * 1000 },
        secret: "S3cret",
        saveUninitialized: false,
        resave: true,
    })
);

// routes
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/category", category);
app.use("/api/promotion", promotion);
app.use("/api/product", product);
app.use("/api/order", order);
app.use("/api/cart", cart);
app.use("/api/voucher", voucher);
app.use("/api/bill", bill);
app.use("/api/feedback", feedback);
app.use("/api/data", data);
app.use("/api/firebase", firebase);
app.use("/api/conversation", conversation);
app.use("/api/messages", messages);
app.use("/api/ml", ml);
app.use("/api/home", home);

app.get("/", (req, res) => {
    res.send(`Hello. *_* Alo Alo!`);
});

// middleware error
app.use(errorMiddleware);

//SET  Server  Port & Start Server
app.set("port", process.env.PORT || 5000);
const server = app.listen(app.get("port"), () => {
    console.log(`Hello QTD, I'm running at ${app.get("port")}`.red);
});

// chat real time
const io = (module.exports.io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
}));
const SocketManager = require("./SocketManager");
io.on("connection", SocketManager);