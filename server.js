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
const morgan = require("morgan");

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
app.use(morgan("tiny"));

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

console.log(`server`, `http://localhost:${app.get("port")}`.blue);

// chat real time
// const io = socketio(server, {
//     cors: {
//         // origin: "http://localhost:3000",
//         origin: "https://clothes-store-99.vercel.app/",
//     },
// });

// let users = [];
// let conversations = [];


// const addConversation = (conversationId, socketId) => {
//     !conversations.some(
//         (conversation) => conversation.conversationId === conversationId
//     ) && conversations.push({ conversationId, socketId });
// };

// const removeUser = (socketId) => {
//     users = users.filter((user) => user.socketId !== socketId);
// };

// const removeConversation = (conversationId) => {
//     conversations = conversations.filter(
//         (conversation) => conversation.conversationId !== conversationId
//     );
// };

// const getConversation = (conversationId) => {
//     return conversations.find(
//         (conversation) => conversation.conversationId === conversationId
//     );
// };

// io.on("connection", (socket) => {
//     console.log(`Client connected`.rainbow);

//     //take userId and socketId from user    YES
//     socket.on("waitingRoom", (get) => {
//         const conversation = getConversation(get.conversationId);
//         if (!conversation) {
//             addConversation(get.conversationId, socket.id);
//         }
//         socket.join(get.conversationId);
//         io.emit("getWaitingRoom", conversations);
//     });

//     // leave room   YES
//     socket.on("leaveRoom", ({ conversationId, senderId, receiverId, text }) => {
//         socket.leave(conversationId);
//         socket.to(conversationId).emit("receive_message", {
//             receiverId,
//             senderId: "Waiting",
//             text,
//         });
//     });

//     // customer leave room   YES
//     socket.on("customer_leaveRoom", ({ conversationId }) => {
//         socket.leave(conversationId);
//         io.socketsLeave(conversationId);
//     });

//     //send and get message              YES
//     socket.on("sendMessage", ({ conversationId, senderId, receiverId, text }) => {
//         socket.to(conversationId).emit("receive_message", {
//             receiverId,
//             senderId,
//             text,
//         });
//     });

//     //sp send and get message              YES
//     socket.on(
//         "spSendMessage",
//         ({ conversationId, senderId, receiverId, text }) => {
//             removeConversation(conversationId);
//             io.emit("getWaitingRoom", conversations);
//             io.emit("removeConversation", conversationId);

//             socket.join(conversationId);
//             socket.to(conversationId).emit("getMessageSP", {
//                 receiverId,
//                 senderId,
//                 text,
//             });
//         }
//     );

//     //when disconnect
//     socket.on("disconnect", () => {
//         console.log("a user disconnected!");
//         removeUser(socket.id);
//     });
// });