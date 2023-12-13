function validateLogin(username, password) {
  
    const isUsernameValid = /^[a-zA-Z0-9_-]{3,16}$/.test(username);
    const isPasswordValid = (
        password.length >= 6 &&
         /\d/.test(password) &&
         /[A-Z]/.test(password) &&
         /[a-z]/.test(password)
    );
  
    return isUsernameValid && isPasswordValid;
}
  
function validateRegistration(email, username, password) {
  
    const isUsernameValid = /^[a-zA-Z0-9_-]{3,16}$/.test(username);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = (
        password.length >= 6 &&
         /\d/.test(password) &&
         /[A-Z]/.test(password) &&
         /[a-z]/.test(password)
    );
  
    return isUsernameValid && isEmailValid && isPasswordValid;
}
  
module.exports = {
    validateLogin,
    validateRegistration,
};
