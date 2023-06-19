import express from "express";
import { Server } from "socket.io";
import { userRouter } from "./routes/routes";




const cors = require("cors");
cors({ credentials: true, origin: true });

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

// achei melhor criar uma classe pra isso
class User {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  // se a gente for usar parametro privado...
  // get getId() {
  //   return this.id;
  // }
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



// se não quiser usar o User, coloca any mesmo que funciona
let roomUsers = new Map<string, User[]>();


// não queria ficar repetindo emit, mas não consegui fazer funcionar com proxy
// let roomUsers = new Proxy(new Map<string, User[]>(), {
//   set(target, prop, val) {  
//     Reflect.set(target, prop, val)
//     io.emit("room users", roomUsers);
//     return true;
//   },
//   deleteProperty(target, prop) {
//     Reflect.deleteProperty(target, prop)
//     io.emit("room users", roomUsers);
//     return true;
//   }
// });

  

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
    const users = roomUsers.get(roomName) || [];
    const user = new User(socket.id, name);
    users.push(user);
    socket.join(roomName);
    
    io.to(roomName).emit("users", users);
    
    console.log(roomUsers.get(roomName));
    console.log("user joined room: " + roomName);

    socket.on("frame", (frame: any) => {
      socket.broadcast.to(roomName).volatile.emit('frame', frame)
    });

    socket.on("message", (message: any) => {
      io.to(roomName).emit("message", message, user.id);
    });

    socket.on("leave room", () => {
      const users = roomUsers.get(roomName) || [];
      socket.leave(roomName);
      
      if (socket.id == users[0].id) {
        activeStreams.splice(activeStreams.indexOf(roomName), 1);
        roomUsers.delete(roomName);
        console.log("deletou sala")
      }else {
        const index = users.indexOf(user);
        users.splice(index, 1);
      }

      io.to(roomName).emit("users", users);
      console.log(roomUsers.get(roomName));
    });
 
    console.log("user connected id: " + socket.id);

    socket.on("disconnect", () => {
      let index = ids.indexOf(socket.id);
      ids.splice(index, 1);
      console.log("user disconnected id: " + socket.id);
    });
  });
});
