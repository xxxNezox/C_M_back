const jwt = require('jsonwebtoken');
const pool = require('../db');
require('dotenv').config();

class Token {
    constructor() {
        this.secretKey = process.env.SECRET_KEY;
    }

    // Получение user_id по username
    async getUserIdByUsername(username) {
        const client = await pool.connect();
        const selectQuery = 'SELECT user_id FROM Users WHERE username = $1';
        const result = await client.query(selectQuery, [username]);

        if (result.rows.length > 0) {
            return result.rows[0].user_id;
        }

        return null; // Возвращаем null, если пользователь не найден
    }

    // Создание токена по username
    async createToken(username) {
        const user_id = await this.getUserIdByUsername(username);

        if (!user_id) {
            return null; // Возвращаем null, если пользователь не найден
        }

        const token = jwt.sign({ user_id }, this.secretKey, { expiresIn: '1h' });

        const sessionInsertQuery = 'INSERT INTO Sessions(user_id, token, refresh_time) VALUES ($1, $2, NOW())';
        const client = await pool.connect();
        await client.query(sessionInsertQuery, [user_id, token]);

        return token;
    }

    // Обновление токена по username
    async refreshToken(username) {
        const user_id = await this.getUserIdByUsername(username);

        if (!user_id) {
            return null; // Возвращаем null, если пользователь не найден
        }

        const token = jwt.sign({ user_id }, this.secretKey, { expiresIn: '1h' });

        const updateQuery = 'UPDATE Sessions SET refresh_time = NOW() WHERE user_id = $1';
        const client = await pool.connect();
        await client.query(updateQuery, [user_id]);

        return token;
    }

    // Удаление токена по username (выход из системы)
    async deleteToken(username) {
        const user_id = await this.getUserIdByUsername(username);

        if (user_id) {
            const deleteQuery = 'DELETE FROM Sessions WHERE user_id = $1';
            const client = await pool.connect();
            await client.query(deleteQuery, [user_id]);
        }
    }
}

module.exports = Token;
