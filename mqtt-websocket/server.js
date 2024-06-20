import bodyParser from "body-parser";
import express from 'express';
import http from 'http';
import cors from 'cors';
import socketService from './services/socketService.js';

const app = express();
const server = http.createServer(app);

// Config Middwares
app.use(cors({
    origin: process.env.URL_BASE,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


socketService.initSocket(server);

server.listen(process.env.PORT, () => {
    console.log(process.env.URL);
    console.log(`WebSocket server started on port ${process.env.PORT}`);
});