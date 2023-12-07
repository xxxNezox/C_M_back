import requests

url = 'http://localhost:5001/sample/hello'

# Данные формы
form_data = {
    "username": "waltuh"
}

# Отправка POST-запроса с данными формы
response = requests.post(url, data=form_data)

# Печать статус-кода и тела ответа
print(f"Status Code: {response.status_code}")
print("Response Body:")
print(response.text)
