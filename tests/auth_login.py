import requests

url = 'http://localhost:5001/auth/login'

data = {
    'username': input('username: '),
    'password': input('password: ')
}

response = requests.post(url, data=data)

print(response.status_code)
print(response.text)

