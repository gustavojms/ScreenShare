import express from 'express';
import { Server, Socket } from 'socket.io';

interface User {
    username: string;
    id: string;
}

interface Messages {
    [room: string]: Messages[];
}

const app = express();
const server = app.listen(3001, () => {
    console.log('Chat server is running on port 3001');
});
const io = new Server(server, {
    cors: {
        origin: '*'
    },
});

const messages: Messages = {
    general: [],
    java: [],
    javascript: [],
    python: [],
    php: [],
    react: [],
};

let users: User[] = [];

io.on('connection', (socket: Socket) => {
    socket.on("join server", (username: string) => {
        const user: User = {
            username,
            id: socket.id,
        };
        users.push(user);
        io.emit("new user", users);
    });

    socket.on("join room", (roomName: string, cb) => {
        socket.join(roomName);
        cb(messages[roomName]);
    });

    socket.on("send message", ({ content, to, sender, chatName, isChannel }) => {
        if(isChannel) {
            const payload = {
                content,
                chatName,
                sender,
            };
            socket.to(to).emit("new message", payload);
        } else {
            const payload = {
                content,
                chatName: sender,
                sender,
            };
            socket.to(to).emit("new message", payload);
        }

        if(messages[chatName]) {
            messages[chatName].push({
                sender,
                content,
            });
        }
    });

    socket.on("disconnect", () => {
        users = users.filter((user) => user.id !== socket.id);
        io.emit("new user", users);
    });
});
