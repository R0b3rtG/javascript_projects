const message = document.querySelector('.message');

async function sayHello(userName){
  let json = await getIp();
  let ip = json.query;
  let response = await fetch(`https://fourtonfish.com/hellosalut/?ip=${ip}`);
  let data = await response.json();
  console.log(data);
  message.textContent = `${data.hello}, ${userName}, you have successfully logged in!`;
  message.style.display = 'block';
}

async function getIp(){
  let response = await fetch('http://ip-api.com/json/');
  let json = await response.json();
  console.log(json);
  return json;
}

const form = document.querySelector('.form');
const userNameInput = document.querySelector('.user-name-input');
const passwordInput = document.querySelector('.password-input');
const btn = document.querySelector('.log-btn');

form.addEventListener('submit', function(event){
  event.preventDefault();

  if(btn.classList.contains('login-btn')){
    if(userNameInput.value === '' || passwordInput.value === ''){
      if(userNameInput.value === ''){
        userNameInput.style.boxShadow = '0 0 0 2px #f00';
      }
      if(passwordInput.value === ''){
        passwordInput.style.boxShadow = '0 0 0 2px #f00';
      }
    } else {
      let name = userNameInput.value;
      userNameInput.setAttribute('readonly', 'true');
      passwordInput.setAttribute('readonly', 'true');
      btn.classList.remove('login-btn');
      btn.classList.add('logout-btn');
      btn.textContent = 'Log Out';
      userNameInput.value = '';
      passwordInput.value = '';
      userNameInput.style.boxShadow = 'none';
      passwordInput.style.boxShadow = 'none';
      sayHello(name);
    }
  } else {
    message.style.display = 'none';
    userNameInput.removeAttribute('readonly');
    passwordInput.removeAttribute('readonly');
    btn.classList.remove('logout-btn');
    btn.classList.add('login-btn');
    btn.textContent = 'Log In';
  }
});