const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();

const options = {
  key: fs.readFileSync('file.pem'),
  cert: fs.readFileSync('file.crt')
};

const server = https.createServer(options, app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
});

app.use(express.static('public'));

app.get('/server', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/client', (req, res) => {
    res.sendFile(__dirname + '/public/client.html');
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

server.listen(3000, () => {
  console.log('listening on *:3000');
});