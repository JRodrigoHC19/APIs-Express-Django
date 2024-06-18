const querys = require('../database/mysql/querys');
const express = require('express');
const router = express.Router();


//! ~ TASK ~ READ
router.get("/", async (req, res) => {
    const query = await querys.getAllTasks();
    return res.status(200).json(query);
});

//! ~ TASK ~ SEARCH
router.get("/search/:id", async (req, res) => {
    const query = await querys.getOneTasks(req.params.id);
    res.json(query);
});

module.exports = router;