import express from "express";
import { Server } from "socket.io";
import { userRouter } from "./routes/routes";
import cors from 'cors';
import path from "path";


const app = express();

// Para rodar o build do frontend, descomentar a linha abaixo, e copiar o worker.js para a pasta dist e acessar localhost:3000
//app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use(cors());

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// achei melhor criar uma classe pra isso
class User {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

let ids: string[] = [];

let activeStreams: string[] = new Proxy([], {
  set(target, prop, val) {
    Reflect.set(target, prop, val)
    io.emit("active", activeStreams);
    return true;
  },
  deleteProperty(target, prop) {
    Reflect.deleteProperty(target, prop)
    io.emit("active", activeStreams);
    return true;
  }
}); 

let roomUsers = new Map<string, User[]>();

function getRoomNameFromSocket(socket: any) {
  const room = Array.from(socket.rooms.values()).find((room) => room !== socket.id);
  return room || "";
}

function getUserFromSocket(socket: any, roomName: any) {
  const users = roomUsers.get(roomName);
  const user = users!.find((user) => user.id === socket.id);
  return user || null;
}

app.use(express.json());
app.use("/user", userRouter); 

// TODO: Novo evento de transmit, evento de activeStreams na conexão, no transmit e no disconnect

io.on("connection", (socket) => {
  io.emit("active", activeStreams);

  socket.on('create room', (roomName: string, callback: Function) => {
    
    roomUsers.set(roomName, []);

    if(activeStreams.indexOf(roomName) == -1) {
      activeStreams.push(roomName)
      callback(true)
      console.log(activeStreams)
    } else {
      console.log("sala existente")
      callback(false)
    }
    console.log("criar sala", roomName)
  })
  
  //evento transmit
  socket.on("join room", (roomName: string, name:string) => {
    let users = roomUsers.get(roomName);

    if (!users) {
      users = [];
      roomUsers.set(roomName, users);
    }
    const user = new User(socket.id, name);
    users.push(user);
    socket.join(roomName);
    
    io.to(roomName).emit("users", users);
    
    console.log(roomUsers.get(roomName));
    console.log("user joined room: " + roomName);

    socket.on("frame", (frame: any) => {
      socket.broadcast.to(roomName).volatile.emit('frame', frame)
    });

    socket.on("leave room", () => {
      const users = roomUsers.get(roomName) || [];
      socket.leave(roomName);
      console.log("saiu")
    
      if (users.length > 0) {
        if (socket.id === users[0].id) {
          activeStreams.splice(activeStreams.indexOf(roomName), 1);
          roomUsers.delete(roomName);
          console.log("deletou sala");
        } else {
          const userIndex = users.findIndex((user) => user.id === socket.id);
          if (userIndex !== -1) {
            users.splice(userIndex, 1);
          }
        }
        
      } else {
        activeStreams.splice(activeStreams.indexOf(roomName), 1);
        roomUsers.delete(roomName);
        console.log("deletou sala");
      }

      io.to(roomName).emit("users", users);
      console.log(roomUsers.get(roomName));
    });

    console.log("user connected id: " + socket.id);

    socket.on("disconnect", () => {
      let index = ids.findIndex((id) => id == socket.id);
      ids.splice(index, 1);
      console.log("user disconnected id: " + socket.id);
    });
  });

  socket.on("message", (message: any) => {
    const roomName: any = getRoomNameFromSocket(socket);
    const user = getUserFromSocket(socket, roomName);
    io.to(roomName).emit("message", message, user!.id, user!.name);
  });
});
