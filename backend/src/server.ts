import { createServer } from 'http';
import { Server } from 'socket.io';

const http = createServer();
const io = new Server(http, {
  cors: {
    origin: '*'
  }
});
let ids: string[] = [];

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

http.listen(3000, () => {
  console.log('listening on *:3000');
});
