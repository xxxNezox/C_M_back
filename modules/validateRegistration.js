function validateRegistration(email, username, password) {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isLengthValid = password.length >= 6;
  const hasDigit = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);

  const isUsernameValid = usernameRegex.test(username);
  const isEmailValid = emailRegex.test(email);

  return isUsernameValid && isEmailValid && isLengthValid && hasDigit && hasUpperCase && hasLowerCase;
}

module.exports = validateRegistration;
