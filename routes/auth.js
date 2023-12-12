const express = require('express');
const router = express.Router();
const pool = require('../db');
const validateRegistration = require('../modules/validateRegistration')
const Token = require('../modules/token')

// модуль для аунтефикации (логин, регистрация)

router.post('/registration', async (req, res) => {
    // Регистрирует нового пользователя на платформе выдвая токен или ошибку.
    // input:
    //     - email
    //     - username
    //     - password
    // output:
    //     ok:
    //         - status 201
    //         - token
    //     error:
    //         - status 400 / 500

    const {email, username, password} = req.body;

    if (!validateRegistration(email, username, password)){
        res.status(400).json({ error: 'Ошибка валидации. Проверьте введенные данные.' });
    }

    const insertQuery = `INSERT INTO Users(username, email, password) VALUES ($1, $2, $3) RETURNING *`;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(insertQuery, [username, email, password]);
        const insertedUser = result.rows[0];
        await client.query('COMMIT');
        // при работе с pool закрывать соединение не нужно

        const tokenHandler = new Token();
        const token = await tokenHandler.createToken(username);

        res.status(201).json({ token });

        console.log('Пользователь успешно зарегистрирован:', insertedUser);
      
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Ошибка при регистрации пользователя:', error.message);
        res.status(500).json({ error: 'Внутренняя ошибка сервера.' });
    }
});

module.exports = router;