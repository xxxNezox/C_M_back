import requests

# Замените на актуальный URL вашего API
API_URL = 'http://localhost:5001/auth/registration'

def test_registration():
    # Замените на актуальные данные для регистрации
    data = {
        'email': '12385daksdh@fhskjfd.ru',
        'username': '1235asdaskjdka',
        'password': 'sdaAKJS34289'
    }

    # Отправляем запрос на регистрацию
    response = requests.post(API_URL, data=data)

    print(response.text)

# Запускаем тест
test_registration()
