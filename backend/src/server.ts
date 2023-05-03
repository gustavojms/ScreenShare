import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { userRouter } from './routes/routes';

export const app = express();
const http = createServer();
const io = new Server(http, {
  cors: {
    origin: '*'
  }
});
let ids: string[] = [];

app.use(express.json());
app.use("/user", userRouter)

io.on('connection', (socket) => {
  
  console.log('user connected id: '+socket.id);
  ids.push(socket.id); 
  io.emit('ids', ids);

  socket.on('frame', (frame:any) => {
    // ids.forEach(id => {
    //   io.to(id).emit('frame', frame);
    // });
    socket.broadcast.emit('frame', frame);
  });

  socket.on('disconnect', function () {
    let index = ids.indexOf(socket.id);
    ids.splice(index, 1);
    io.emit('ids', ids);
    console.log('user disconnected id: '+socket.id);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})
