const io = require("./server.js").io;

let conversations = [];

const addConversation = (conversationId, socketId) => {
    !conversations.some(
        (conversation) => conversation.conversationId === conversationId
    ) && conversations.push({ conversationId, socketId });
};

const removeConversation = (conversationId) => {
    conversations = conversations.filter(
        (conversation) => conversation.conversationId !== conversationId
    );
};

const getConversation = (conversationId) => {
    return conversations.find(
        (conversation) => conversation.conversationId === conversationId
    );
};

module.exports = function(socket) {
    console.log(`Client connected`.rainbow);

    //take userId and socketId from user    YES
    socket.on("waitingRoom", (get) => {
        const conversation = getConversation(get.conversationId);
        if (!conversation) {
            addConversation(get.conversationId, socket.id);
        }
        socket.join(get.conversationId);
        io.emit("getWaitingRoom", conversations);
    });

    // leave room   YES
    socket.on("leaveRoom", ({ conversationId, senderId, receiverId, text }) => {
        socket.leave(conversationId);
        socket.to(conversationId).emit("receive_message", {
            receiverId,
            senderId: "Waiting",
            text,
        });
    });

    // customer leave room   YES
    socket.on("customer_leaveRoom", ({ conversationId }) => {
        socket.leave(conversationId);
        io.socketsLeave(conversationId);
    });

    //send and get message              YES
    socket.on("sendMessage", ({ conversationId, senderId, receiverId, text }) => {
        socket.to(conversationId).emit("receive_message", {
            receiverId,
            senderId,
            text,
        });
    });

    //sp send and get message              YES
    socket.on(
        "spSendMessage",
        ({ conversationId, senderId, receiverId, text }) => {
            removeConversation(conversationId);
            io.emit("getWaitingRoom", conversations);
            io.emit("removeConversation", conversationId);

            socket.join(conversationId);
            socket.to(conversationId).emit("getMessageSP", {
                receiverId,
                senderId,
                text,
            });
        }
    );

    //when disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
    });
};