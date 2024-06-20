import { Server as SocketIoServer } from 'socket.io';
import mqttService from './mqttService.js';

let io;

mqttService.onMessage((topic, message) => {
    emitToRoom(topic, message);
});

const initSocket = (server) => {
    io = new SocketIoServer(server, {
        cors: {
            origin: process.env.URL_BASE,
            methods: ["GET", "POST"],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        const idHandShake = socket.id;
        const { nameRoom } = socket.handshake.query;
        
        socket.join(nameRoom);
        mqttService.subscribeToTopic(nameRoom);

        console.log(`Device '${idHandShake}' connectedin '${nameRoom}'`);
        // socket.on('event', (res) => { console.log("mgs received!") });

        socket.on('disconnect', () => {
            console.log(`Device '${idHandShake}' disconnected.`);
            socket.leave(nameRoom);
        });
    });
};

const emitToRoom = (room, message) => {
    if (io) {
        io.to(room).emit('event', message);
    } else {
        console.error('Socket.io server not initialized');
    }
};

export default {
    initSocket,
    emitToRoom
};
