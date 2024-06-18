const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    user_id: Number,
    receive_id: Number,
    type: Boolean,
    message: String,
    published_in: String
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;