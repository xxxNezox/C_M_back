import requests

url = 'http://localhost:5001/auth/registration'

data = {
    'email': input('email: '),
    'username': input('username: '),
    'password': input('password: ')
}

response = requests.post(url, data=data)

print(response.text)

