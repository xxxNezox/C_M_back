const express = require('express');
const router = express.Router();
const pool = require('../db');

// модуль для тестовых запросов (или смешных)

router.post('/breakingbad', (req, res) => {

    console.log(req.body);
    if (req.body.username == 'waltuh'){
        return res.send('you god damn right');
    }
    else {
        return res.status(400).send('say my name');
    }
});

module.exports = router;