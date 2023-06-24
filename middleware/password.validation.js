function validatePassword(password) {
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/; // Simbol regex
    const uppercaseRegex = /[A-Z]/; // Upper case regex
    const lowercaseRegex = /[a-z]/; // Lower case regex
    const numberRegex = /[0-9]/; // Angka regex
    const spaceRegex = /\s/; // Spasi regex

  if (symbolRegex.test(password)) {
    throw new Error("Password can't contain symbols ");
  }
  if (!uppercaseRegex.test(password)) {
    throw new Error('Password must contain at least one capital letter.');
  }
  if (!lowercaseRegex.test(password)) {
    throw new Error('Password must contain at least one lowercase letter.');
  }
  if (!numberRegex.test(password)) {
    throw new Error('Password must contain at least one digit.');
  }
  if (spaceRegex.test(password)) {
    throw new Error('Password cannot contain spaces.');
  }
  if (password.length < 8) {
    throw new Error('The password must consist of a minimum of 8 characters.');
  }

  return true;
}
  
  module.exports = validatePassword;