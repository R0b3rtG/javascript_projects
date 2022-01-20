const container = document.querySelector('.container');
const btn = document.querySelector('.btn');
const emailInput = document.querySelector('.email-input');
const logInDiv = document.querySelector('.log-in');
const passwordInput = document.querySelector('.password-input');
const title = document.querySelector('.title');
const eye = document.querySelector('.far');

let re = /\s+/g;
let root = document.querySelector(':root');
let testEmail;
let testPassword;

function signUp() {
	testEmail = emailInput.value;
	testPassword = passwordInput.value;
	emailInput.value = '';
	passwordInput.value = '';
	title.textContent = 'LOG IN';

	createAlertBox('green', 'ACCOUNT CREATED SUCCESSFULLY.\nPLEASE LOG IN.');

	let cancelBtn = document.createElement('button');
	cancelBtn.classList.add('cancel-btn');
	cancelBtn.textContent = 'Cancel';
	logInDiv.appendChild(cancelBtn);

	btn.setAttribute('onclick', 'logIn()');
	btn.textContent = 'LOG IN';
}

function logIn() {
	if (
		re.test(emailInput.value) == true ||
		re.test(passwordInput.value) == true
	) {
		if (re.test(emailInput.value) == true) {
			root.style.setProperty('--emailBorder', '#ff0');
			root.style.setProperty('--emailBackground', '#e5e788');
			root.style.setProperty('--emailFontSize', '1.1rem');
		}
		if (re.test(passwordInput.value) == true) {
			root.style.setProperty('--passwordBorder', '#ff0');
			root.style.setProperty('--passwordBackground', '#e5e788');
			root.style.setProperty('--passwordFontSize', '1.1rem');
		}
		createAlertBox('red', 'Check your inputs for whitespaces');
	} else if (
		emailInput.value != testEmail ||
		passwordInput.value != testPassword
	) {
		if (emailInput.value != testEmail) {
			root.style.setProperty('--emailBorder', '#f00');
			root.style.setProperty('--emailBackground', '#e78888');
			root.style.setProperty('--emailFontSize', '1.1rem');
		}
		if (passwordInput.value != testPassword) {
			root.style.setProperty('--passwordBorder', '#f00');
			root.style.setProperty('--passwordBackground', '#e78888');
			root.style.setProperty('--passwordFontSize', '1.1rem');
		}
		createAlertBox('red', 'Email or password incorrect');
	} else if (
		emailInput.value == testEmail &&
		passwordInput.value == testPassword
	) {
		createAlertBox('green', 'Log in successful!');
		root.style.setProperty('--emailBorder', '#0f0');
		root.style.setProperty('--emailBackground', '#88e788');
		root.style.setProperty('--passwordBorder', '#0f0');
		root.style.setProperty('--passwordBackground', '#88e788');
	}
}

eye.addEventListener('click', function () {
	if (eye.classList.contains('fa-eye-slash')) {
		eye.classList.remove('fa-eye-slash');
		eye.classList.add('fa-eye');
		passwordInput.setAttribute('type', 'text');
	} else {
		eye.classList.remove('fa-eye');
		passwordInput.setAttribute('type', 'password');
		eye.classList.add('fa-eye-slash');
	}
});

logInDiv.addEventListener('click', function (e) {
	if (e.target.classList.contains('cancel-btn')) {
		root.style.setProperty('--emailBorder', '#000');
		root.style.setProperty('--emailBackground', '#fff');
		root.style.setProperty('--emailFontSize', '1rem');
		root.style.setProperty('--passwordBorder', '#000');
		root.style.setProperty('--passwordBackground', '#fff');
		root.style.setProperty('--passwordFontSize', '1rem');
		emailInput.value = '';
		passwordInput.value = '';
	}
});

function createAlertBox(color, text) {
	if (color === 'green') {
		root.style.setProperty('--alertBoxBackground', '#88e788');
		root.style.setProperty('--alertBoxBorder', '#0f0');
	} else if (color === 'red') {
		root.style.setProperty('--alertBoxBackground', '#e78888');
		root.style.setProperty('--alertBoxBorder', '#f00');
	}
	let alertBox = document.createElement('p');
	alertBox.classList.add('alertBox');
	alertBox.textContent = text;
	logInDiv.appendChild(alertBox);
	setTimeout(() => {
		alertBox.remove();
	}, 3000);
}
