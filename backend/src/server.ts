import { createServer } from 'http';
import { Server } from 'socket.io';

const http = createServer();
const io = new Server(http, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('offer', (offer: any) => {
    socket.broadcast.emit('offer', offer);
  });

  socket.on('answer', (answer: any) => {
    socket.broadcast.emit('answer', answer);
  });

  socket.on('candidate', (candidate: any) => {
    socket.broadcast.emit('candidate', candidate);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
