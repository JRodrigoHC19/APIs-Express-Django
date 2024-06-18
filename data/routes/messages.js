const express = require('express');
const Message = require('../database/mongodb/schemas');
const router = express.Router();


//* CRUD ~ READ
router.get('/', async (req, res) => {
    const messages = await Message.find();
    res.json(messages);
});

//* CRUD ~ CREATE
router.post('/', async (req, res) => {
    const message = new Message(req.body);
    await message.save();
    res.json(message);
});

//* SEARCH
router.get('/:id', async (req, res) => {
    const message = await Message.find(
        { user_id: req.params.id }
    );
    res.json(message);
});


module.exports = router;