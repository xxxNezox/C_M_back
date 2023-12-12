const express = require('express');
const router = express.Router();
const pool = require('../db');
const validateRegistration = require('../modules/validateRegistration')
const validateLogin = require('../modules/validateLogin')
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
        return res.status(400).json({ error: 'Ошибка валидации. Проверьте введенные данные.' });
    }

    const checkQuery = `
        SELECT 
            CASE 
                WHEN EXISTS (SELECT 1 FROM Users WHERE email = $1) THEN 'Почта уже используется'
                WHEN EXISTS (SELECT 1 FROM Users WHERE username = $2) THEN 'Имя пользователя уже используется'
                ELSE 'OK'
            END AS status;
    `;

    const insertQuery = `INSERT INTO Users(username, email, password) VALUES ($1, $2, $3) RETURNING *`;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // проверка на существование в бд
        const checkResult = await client.query(checkQuery, [email, username]);
        const status = checkResult.rows[0].status;

        if (status !== 'OK') {
            res.status(400).json({ error: status });
            return;
        }

        const result = await client.query(insertQuery, [username, email, password]);
        const insertedUser = result.rows[0];
        await client.query('COMMIT');

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