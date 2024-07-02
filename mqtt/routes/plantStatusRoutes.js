
import express from 'express';
import { subscribeToTopic, unsubscribeFromTopic } from '../services/mqttService.js';
import PlantStatus from '../database/schemas.js';

const router = express.Router();

router.get('/subscribe/:topic', (req, res) => {
    const topic = req.params.topic;
    if (!topic) {
        res.status(400).send('Topic is required');
        return;
    }
    try {
        subscribeToTopic(topic);
        res.send(`Subscribed to topic: ${topic}`);
    } catch (err) {
        res.status(500).send(`Failed to subscribe to ${topic}: ${err.message}`);
    }
});


router.get('/unsubscribe/:topic', (req, res) => {
    const topic = req.params.topic;
    if (!topic) {
        res.status(400).send('Topic is required');
        return;
    }
    try {
        unsubscribeFromTopic(topic);
        res.send(`Unsubscribed from topic: ${topic}`);
    } catch (err) {
        res.status(500).send(`Failed to unsubscribe from ${topic}: ${err.message}`);
    }
});


//* SEARCH
router.get('/:channel/:date', async (req, res) => {
    const myPlantStatus = await PlantStatus.find(
        { channelName: req.params.channel, published_in: req.params.date }
    );
    res.json(myPlantStatus);
});


export default router;




