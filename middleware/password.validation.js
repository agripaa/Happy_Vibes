module.exports = function validatePassword(pass) {
  let response, result;

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const resRegex = regex.test(pass);
  const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const hasSymbol = !symbolRegex.test(pass);

  if (!resRegex || hasSymbol) {
    response = `{"status": "402", "msg": "Password at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 digit, and no symbols.", "regex": "${resRegex}", "regex_symbol": "${hasSymbol}"}`;
    result = JSON.parse(response);
    return result;
  }else{   
    response = `{"status": "200", "msg": "password and confirm password clean!", "regex": "${resRegex}", "regex_symbol": "${hasSymbol}"}`;
    result = JSON.parse(response);
    return result;
  }
} 
