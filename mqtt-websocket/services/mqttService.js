import mqtt from 'mqtt';


const config = {
    url: process.env.MQTT_URL,
    clientId: process.env.MQTT_CLIENT_ID,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    connectTimeout: 5000,
    qos: "0"
};

const mqttClient = mqtt.connect(config.url, {
    clientId: config.clientId,
    username: config.username,
    password: config.password,
    connectTimeout: config.connectTimeout
});

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
});

mqttClient.on('error', (err) => {
    console.error('Failed to connect to MQTT broker:', err);
});

const subscribeToTopic = (topic) => {
    mqttClient.subscribe(topic, { qos: parseInt(config.qos) }, (err) => {
        if (err) {
            console.error(`Failed to subscribe to ${topic}:`, err);
        }
    });
};

const onMessage = (callback) => {
    mqttClient.on('message', (topic, message) => {
        callback(topic, message.toString());
    });
};

export default {
    subscribeToTopic,
    onMessage
};
