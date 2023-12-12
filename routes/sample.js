const express = require('express');
const router = express.Router();
const pool = require('../db');

// модуль для тестовых запросов (или смешных)

router.post('/hello', (req, res) => {

    console.log(req.body);
    if (req.body.username == 'waltuh'){
        return res.send('you god damn right');
    }
    else {
        return res.status(400).send('say my name');
    }
});

router.post('/dbtest', async (req, res) => {
    console.log(req.body);
    const client = await pool.connect();
    const query = await client.query(
        `INSERT INTO users(email, username, password) 
        VALUES (
            '${req.body.userEmail}', 
            '${req.body.userUsername}', 
            '${req.body.userPassword}'
        )`);
    console.log(query);
    res.send('ok');
    pool.end();
});

module.exports = router;