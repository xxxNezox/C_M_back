const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/hello', (req, res) => {
    console.log(req.body);

    if (req.body.username == 'waltuh'){
        return res.status(200).send('you god damn right');
    }
    else {
        return res.status(400).send('say my name');
    }
});

module.exports = router;