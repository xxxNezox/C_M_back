import requests

url = 'http://localhost:5001/sample/dbtest'

# Данные формы
form_data = {
    "userUsername":input('userUsername: '),
    "userPassword":input('userPassword: '),
    "userEmail":input('userEmail: '),
}

# Отправка POST-запроса с данными формы
response = requests.post(url, data=form_data)

# Печать статус-кода и тела ответа
print(f"Status Code: {response.status_code}")
print("Response Body:")
print(response.text)
