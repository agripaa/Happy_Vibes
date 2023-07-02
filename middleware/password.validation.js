function validate(password) {
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/; // Simbol regex
    const uppercaseRegex = /[A-Z]/; // Upper case regex
    const lowercaseRegex = /[a-z]/; // Lower case regex
    const numberRegex = /[0-9]/; // Angka regex
    const spaceRegex = /\s/; // Spasi regex

  if (symbolRegex.test(password)) {
    return { isValid: false, error: "Password can't contain symbols" }
  }
  if (!uppercaseRegex.test(password)) {
    return { isValid: false, error: "Password must contain at least one capital letter." }
  }
  if (!lowercaseRegex.test(password)) {
    return { isValid: false, error: "Password must contain at least one lowercase letter." }
  }
  if (!numberRegex.test(password)) {
    return { isValid: false, error: "Password must contain at least one digit." }
  }
  if (spaceRegex.test(password)) {
    return { isValid: false, error: "Password can't contain spaces" }
  }
  if (password.length < 8) {
    return { isValid: false, error: "The password must consist of a minimum of 8 characters." }
  }
  return { isValid: true };
}

  
  module.exports = { validate }

  // function validate(password) {
  //   if (password.length < 8) {
  //     return { isValid: false, error: 'Password harus memiliki setidaknya 8 karakter' };
  //   }
  
  //   // Tambahkan validasi lainnya sesuai kebutuhan
  //   // ...
  
  //   return { isValid: true };
  // }
  
  // module.exports = { validate };