const form = document.querySelector('.form');

const reUsername = /[^0-9a-zA-z\-_]/;
const reEmail = /^[a-zA-Z0-9\.\-_]{2,15}@gmail\.com$/;
const rePassword = /[^0-9a-zA-z@\-_]/;

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

const usernameAlert = document.querySelector('.username-alert');
const passwordAlert = document.querySelector('.password-alert');
const emailAlert = document.querySelector('.email-alert');

username.value = '';
email.value = '';
password.value = '';

form.addEventListener('submit', (e) => {
	e.preventDefault();

	usernameAlert.textContent = '';
	emailAlert.textContent = '';
	passwordAlert.textContent = '';
	username.style.boxShadow = '0 0 0 1px #888';
	email.style.boxShadow = '0 0 0 1px #888';
	password.style.boxShadow = '0 0 0 1px #888';

	if (username.value != '' && email.value != '' && password.value != '') {
		if (username.value.length > 1 && password.value.length > 7) {
			if (
				reUsername.exec(username.value) === null &&
				reEmail.test(email.value) === true &&
				rePassword.exec(password.value) === null
			) {
				username.style.boxShadow = '0 0 0 2px #0f0';
				email.style.boxShadow = '0 0 0 2px #0f0';
				password.style.boxShadow = '0 0 0 2px #0f0';

				console.log(
					reUsername.exec(username.value),
					reEmail.test(email.value),
					rePassword.exec(password.value)
				);
			} else {
				console.log(
					reUsername.exec(username.value),
					reEmail.test(email.value),
					rePassword.exec(password.value)
				);
				if (reUsername.exec(username.value) !== null) {
					usernameAlert.textContent = 'Only digits, letters, - and _';
					username.style.boxShadow = '0 0 0 2px #f00';
				}
				if (reEmail.test(email.value) === false) {
					emailAlert.textContent = 'Please enter a valid email adress';
					email.style.boxShadow = '0 0 0 2px #f00';
				}
				if (rePassword.exec(password.value) !== null) {
					passwordAlert.textContent = 'Only digits, letters, -, _ and @';
					password.style.boxShadow = '0 0 0 2px #f00';
				}
			}
		} else {
			if (username.value.length < 2) {
				username.style.boxShadow = '0 0 0 2px #f00';
				usernameAlert.textContent = 'Username must be longer';
			}
			if (password.value.length < 8) {
				password.style.boxShadow = '0 0 0 2px #f00';
				passwordAlert.textContent = 'Password must be longer';
			}
		}
	} else {
		if (username.value === '') {
			username.style.boxShadow = '0 0 0 2px #f00';
			usernameAlert.textContent = 'Please fill in the field';
		}
		if (email.value === '') {
			email.style.boxShadow = '0 0 0 2px #f00';
			emailAlert.textContent = 'Please fill in the field';
		}
		if (password.value === '') {
			password.style.boxShadow = '0 0 0 2px #f00';
			passwordAlert.textContent = 'Please fill in the field';
		}
	}
});
