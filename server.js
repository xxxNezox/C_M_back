const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sample_routes = require('./routes/sample');

const app = express();
const port = process.env.API_PORT;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors);

// подключаем раздел аунтефикации
app.use('/sample', sample_routes);

// прослушиваем
app.listen(port, () => {console.log(`Сервер запущен на порту ${port}`);});