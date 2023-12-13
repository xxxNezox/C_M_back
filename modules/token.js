const jwt = require('jsonwebtoken');
const pool = require('../db');
require('dotenv').config();

class Token {
    constructor() {
        this.secretKey = process.env.SECRET_KEY;
    }

    async _getUserIdByUsername(username) {
        const client = await pool.connect();
        const selectQuery = `SELECT user_id FROM Users WHERE username = $1`;
        const result = await client.query(selectQuery, [username]);

        if (result.rows.length > 0) {
            return result.rows[0].user_id;
        }

        return false;
    }

    async createToken(username) {
        const user_id = await this._getUserIdByUsername(username);

        if (!user_id) {
            return false;
        }

        const token = jwt.sign({ user_id }, this.secretKey, { expiresIn: '1h' });

        const insertQuery = `INSERT INTO Sessions(user_id, token, refresh_time) VALUES ($1, $2, NOW())`;
        const client = await pool.connect();
        await client.query(insertQuery, [user_id, token]);

        return token;
    }

    async isTokenValid(token) {
        const client = await pool.connect();
        const selectQuery = `SELECT refresh_time FROM Sessions WHERE token = $1`;
        const result = await client.query(selectQuery, [token]);
    
        if (result.rows.length > 0) {
            const refreshTime = new Date(result.rows[0].refresh_time); 
            const currentTime = new Date();
            const deltaTime = currentTime - refreshTime;
    
            // токен действителен не более 1 часа
            const maxTokenAge = 1 * 60 * 60 * 1000; 
    
            return deltaTime <= maxTokenAge;
        }
    
        return false;
    }
    
    async refreshToken(token) {
        const updateQuery = `UPDATE Sessions SET refresh_time = NOW() WHERE token = $1`;
        const client = await pool.connect();
        await client.query(updateQuery, [token]);
    
        return true;
    }
    
    async deleteToken(token) {
        const deleteQuery = `DELETE FROM Sessions WHERE token = $1`;
        const client = await pool.connect();
        await client.query(deleteQuery, [token]);
    }
}

module.exports = Token;
