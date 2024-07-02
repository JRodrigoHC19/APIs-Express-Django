import { onMessage } from './services/mqttService.js';
import bodyParser from "body-parser";
import * as mongoose from 'mongoose'
import PlantStatus from "./database/schemas.js";
import express from 'express';
import http from 'http';
import cors from 'cors';
import myPlantStatusRoutes from './routes/plantStatusRoutes.js';

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


// Connection to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((error) => console.error("MongoDB connection error:", error));


// Config Routes
app.use("/status", myPlantStatusRoutes);


// Manejar mensajes MQTT
onMessage((topic, message) => {
  const dataObject = JSON.parse(message);

  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  const myPlantStatus = new PlantStatus();
  myPlantStatus.channelName = topic;
  myPlantStatus.published_in = formattedDate;
  myPlantStatus.humidity_atmosphere = dataObject.humidity_atmosphere;
  myPlantStatus.humidity_subsoil = dataObject.humidity_subsoil;
  myPlantStatus.temperature_atmosphere = dataObject.temperature_atmosphere;
  myPlantStatus.save();

  console.log(`Received message on topic ${topic}: ${message}`);
});


server.listen(process.env.PORT, () => {
    console.log(`WebSocket server started on port ${process.env.PORT}`);
});
