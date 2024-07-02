import { Schema, model } from 'mongoose';

const PlantStatusSchema = new Schema({
    humidity_subsoil: String,
    temperature_atmosphere: String,
    humidity_atmosphere: String,
    published_in: String,
    channelName: String
});

const PlantStatus = model('PlantStatus', PlantStatusSchema);

export default PlantStatus;