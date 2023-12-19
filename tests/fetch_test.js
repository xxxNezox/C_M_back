const apiUrl = 'http://localhost:5001/auth/login'; // замените "ваш_домен" на фактический домен вашего сервера

const requestBody = {
  username: 'test32user123',
  password: 'testprdFasdf138',
};

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(requestBody),
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Обработка успешного ответа
    console.log('Успешный вход:', data);
  })
  .catch(error => {
    // Обработка ошибок
    console.error('Ошибка при входе:', error.message);
  });