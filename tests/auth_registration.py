import requests

# Замените на актуальный URL вашего API
API_URL = 'http://localhost:5001/auth/registration'

def test_registration():
    # Замените на актуальные данные для регистрации
    data = {
        'email': 't823@example.com',
        'username': 'test32user123',
        'password': 'testprdFasdf138'
    }

    # Отправляем запрос на регистрацию
    response = requests.post(API_URL, data=data)

    print(response.text)

# Запускаем тест
test_registration()
