import express from "express";
import { Server } from "socket.io";
import { userRouter } from "./routes/routes";

const cors = require("cors");

const app = express();
app.use(cors());
const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let ids: string[] = [];

app.use(express.json());
app.use("/user", userRouter);

io.on("connection", (socket) => {
  socket.on("join room", (roomName: string) => {
    socket.join(roomName);
    console.log("user joined room: " + roomName);
    socket.on("frame", (frame: any) => {
      io.to(roomName).emit("frame", frame);
    });
  });
  
  console.log("user connected id: " + socket.id);
  // ids.push(socket.id);
  // io.emit('ids', ids);

  socket.on("message", (message: any) => {
    io.emit("message", message, socket.id);
  });

  socket.on("disconnect", function () {
    let index = ids.indexOf(socket.id);
    ids.splice(index, 1);
    // io.emit('ids', ids);
    console.log("user disconnected id: " + socket.id);
  });
});
