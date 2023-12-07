const express = require('express');
require('dotenv').config();
const sample_routes = require('./routes/sample');

const app = express();
const port = process.env.API_PORT;

// middleware
app.use(express.urlencoded({ extended: true }))

// подключаем раздел аунтефикации
app.use('/sample', sample_routes);

// прослушиваем
app.listen(port, () => {console.log(`Сервер запущен на порту ${port}`);});