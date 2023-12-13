Вот некоторые из общепринятых HTTP статус-кодов:

- **1xx (Информационные):**
  - 100 Continue
  - 101 Switching Protocols
  - 102 Processing
  - 103 Early Hints

- **2xx (Успешные):**
  - 200 OK
  - 201 Created
  - 202 Accepted
  - 204 No Content
  - 206 Partial Content

- **3xx (Перенаправления):**
  - 300 Multiple Choices
  - 301 Moved Permanently
  - 302 Found
  - 303 See Other
  - 304 Not Modified
  - 307 Temporary Redirect
  - 308 Permanent Redirect

- **4xx (Клиентские ошибки):**
  - 400 Bad Request
  - 401 Unauthorized
  - 403 Forbidden
  - 404 Not Found
  - 405 Method Not Allowed
  - 409 Conflict
  - 410 Gone
  - 429 Too Many Requests

- **5xx (Серверные ошибки):**
  - 500 Internal Server Error
  - 501 Not Implemented
  - 502 Bad Gateway
  - 503 Service Unavailable
  - 504 Gateway Timeout
  - 505 HTTP Version Not Supported

Эти коды состояния позволяют серверам и клиентам обмениваться информацией о том, как прошел запрос, и предоставляют полезные сведения для обработки ответа.
Таблица "Users":

|Поле|Тип|Описание|
|---|---|---|
|user_id|SERIAL|Уникальный идентификатор пользователя|
|username|VARCHAR(30)|Имя пользователя (не более 30 символов)|
|email|TEXT|Адрес электронной почты пользователя|
|password|VARCHAR(30)|Пароль пользователя|

Таблица "Sessions":

|Поле|Тип|Описание|
|---|---|---|
|user_id|INT REFERENCES|Идентификатор пользователя, внешний ключ|
|token|TEXT UNIQUE|Уникальный токен сессии|
|refresh_time|TIMESTAMP|Время обновления сессии|

Таблица "Posts":

|Поле|Тип|Описание|
|---|---|---|
|post_id|SERIAL|Уникальный идентификатор поста|
|user_id|INT REFERENCES|Идентификатор пользователя, внешний ключ|
|post_text|TEXT|Текст поста|
|post_time|TIMESTAMP|Время публикации поста|

Таблица "Likes":

|Поле|Тип|Описание|
|---|---|---|
|like_id|SERIAL|Уникальный идентификатор лайка|
|post_id|INT REFERENCES|Идентификатор поста, на который поставлен лайк|
|user_id|INT REFERENCES|Идентификатор пользователя, поставившего лайк|

Таблица "Subscriptions":

|Поле|Тип|Описание|
|---|---|---|
|subscription_id|SERIAL|Уникальный идентификатор подписки|
|follower_id|INT REFERENCES|Идентификатор пользователя-подписчика, внешний ключ|
|followed_id|INT REFERENCES|Идентификатор пользователя-подписанного, внешний ключ|