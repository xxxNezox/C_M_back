const express = require('express');
const router = express.Router();
const pool = require('../db');

const {validateLogin, validateRegistration} = require('../modules/validation');
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

    const selectQuery = `
        SELECT 
            CASE 
                WHEN EXISTS (SELECT 1 FROM Users WHERE email = $1) THEN 'Почта уже используется'
                WHEN EXISTS (SELECT 1 FROM Users WHERE username = $2) THEN 'Имя пользователя уже используется'
                ELSE 'OK'
            END AS status;
    `;

    const insertQuery = `INSERT INTO Users(email, username, password) VALUES ($1, $2, $3) RETURNING *`;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const checkResult = await client.query(selectQuery, [email, username]);
        const status = checkResult.rows[0].status;

        if (status !== 'OK') {
            return res.status(400).json({ error: status });
        }

        const result = await client.query(insertQuery, [email, username, password]);
        const insertedUser = result.rows[0];
        await client.query('COMMIT');

        const tokenHandler = new Token();
        const token = await tokenHandler.createToken(username);

        res.status(201).json({ token });

        console.log('Пользователь успешно зарегистрирован:', insertedUser);
      
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Ошибка при регистрации пользователя:', error.message);
        res.status(500).json({ error: error.message});
    }
});

//моя реализация логина:
router.post('/login', async (req, res) => {
    // Вход пользователя в систему выдачей токена или ошибки.
    // input:
    //     - username
    //     - password
    // output:
    //     ok:
    //         - status 200
    //         - token
    //     error:
    //         - status 400 / 401 / 500

    const { username, password } = req.body;

    if (!validateLogin(username, password)) {
        return res.status(400).json({ error: 'Ошибка валидации. Проверьте введенные данные.' });
    }

    const selectQuery = `
        SELECT 
            CASE 
                WHEN NOT EXISTS (SELECT 1 FROM Users WHERE username = $1) THEN 'Пользователь не найден'
                WHEN NOT EXISTS (SELECT 1 FROM Users WHERE username = $1 AND password = $2) THEN 'Неверный пароль'
                ELSE 'OK'
            END AS status, username
        FROM Users WHERE username = $1;
    `;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const checkResult = await client.query(selectQuery, [username, password]);
        const status = checkResult.rows[0].status;

        if (status !== 'OK') {
            return res.status(401).json({ error: status });
        }

        await client.query('COMMIT');

        const tokenHandler = new Token();
        const token = await tokenHandler.createToken(username);

        res.status(200).json({ token });

        console.log('Пользователь успешно вошел в систему:', username);

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Ошибка при попытке входа:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;