import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    },
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {};   // {key, value} => {userId: socketId}  => userId coming from database & socketId = socket.id

io.on("connection", (socket) => { 
    console.log("A user connected", socket.id);

    // after user connected we will update userSocketMap 
    const userId = socket.handshake.query.userId;   // query.userId in useAuthStore
    if(userId){
        userSocketMap[userId] = socket.id;
    }

    // io.emit() broadcasts that user is disconnected (offline) then go in the socket.on and broadcast it
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        // user just became offline
        delete userSocketMap[userId];   // deleting key from userSocketMap
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export {io, app, server};