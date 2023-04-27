const http = require('http').createServer();
const io = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('offer', (offer) => {
    socket.broadcast.emit('offer', offer);
  });

  socket.on('answer', (answer) => {
    socket.broadcast.emit('answer', answer);
  });

  socket.on('candidate', (candidate) => {
    socket.broadcast.emit('candidate', candidate);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});