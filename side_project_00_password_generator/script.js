const btn = document.querySelector('.btn');
const passwordField = document.querySelector('.password');

btn.onclick = generatePassword;

function generatePassword(){
  let password = '';
  for(let i = 1; i <= 15; i++){
    const rand = parseInt(Math.random()*122+48);
    if((rand > 47 && rand < 58) || (rand > 64 && rand < 91) || (rand > 96 && rand < 123)){
      const char = String.fromCharCode(rand);
      password += char;
    } else {
      i--;
    }
  }
  passwordField.textContent = password;
}