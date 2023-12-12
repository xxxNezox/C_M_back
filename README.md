# setup project
```
npm install express cors pg dotenv jsonwebtoken
node server.js
```
# setup database
```
-- Таблица пользователей
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL
);

-- Таблица сессий
CREATE TABLE Sessions (
    user_id INT REFERENCES Users(user_id),
    token TEXT UNIQUE NOT NULL,
    refresh_time TIMESTAMP NOT NULL
);

-- Таблица постов
CREATE TABLE Posts (
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    post_text TEXT,
    post_time TIMESTAMP NOT NULL
);

-- Таблица лайков
CREATE TABLE Likes (
    like_id SERIAL PRIMARY KEY,
    post_id INT REFERENCES Posts(post_id),
    user_id INT REFERENCES Users(user_id)
);

-- Таблица подписок
CREATE TABLE Subscriptions (
    subscription_id SERIAL PRIMARY KEY,
    follower_id INT REFERENCES Users(user_id),
    followed_id INT REFERENCES Users(user_id)
);

```
