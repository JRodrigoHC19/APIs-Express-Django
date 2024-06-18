require("dotenv").config();

const bodyParser = require("body-parser");
const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = require('socket.io')(
    server, {    
        cors: {
            origin: process.env.URL_BASE,
            methods: ["GET", "POST"],
            allowedHeaders: ['Content-Type, Authorization'],
            credentials: true
        }
    }
);

app.use(cors({
    origin: process.env.URL_BASE,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type, Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


io.on('connection', (socket) => {
    const idHandShake = socket.id;

    const { nameRoom } = socket.handshake.query;

    console.log(`Hola dispositivo ${idHandShake} -> ${nameRoom}`);

    socket.join(nameRoom);

    socket.on('event', (res) => {
        console.log(res);

        socket.to(nameRoom).emit('event', res);
    });

    socket.on('disconnect', () => {
        console.log("User disconnected");
    })
});


server.listen(process.env.PORT, () => {
    console.log("Servidor WebSocket Iniciado en el puerto: 5000");
});