const querys = require('../database/mysql/querys');
const express = require('express');
const router = express.Router();


//! ~ TASK ~ READ
router.get("/search/:id", async (req, res) => {
    const query = await querys.getOneChannel(req.params.id);
    return res.status(200).json(query);
});

//! ~ TASK ~ SEARCH
router.post("/", async (req, res) => {
    const { user_id, nameChannel } = req.body;
    const query = await querys.postOneChanel(user_id, nameChannel);
    res.json(query);
});

module.exports = router;