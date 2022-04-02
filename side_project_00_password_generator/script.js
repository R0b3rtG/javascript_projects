const getPasswordBtn = document.querySelector('.get-password-btn');
const savePasswordBtn = document.querySelector('.save-password-btn');
const passwordField = document.querySelector('.password');
const passwordList = document.querySelector('.password-list');
const lowerDiv = document.querySelector('.lower-div');
const alertBoxRed = document.querySelector('.alert-red');
const alertBoxGreen = document.querySelector('.alert-green');

let passwords = [];

getPasswordBtn.onclick = generatePassword;

(() => {
	if (localStorage.getItem('passwords') != null) {
		passwords = JSON.parse(localStorage.getItem('passwords'));
	} else {
		passwords = [];
	}

	passwords.forEach((password) => {
		createPasswordLi(password);
	});

	if (passwordList.childElementCount != 0) {
		lowerDiv.classList.remove('hidden');
	}
})();

passwordList.onclick = (e) => {
	if (e.target.classList.contains('del')) {
		let text = e.target.parentNode.previousSibling.value;
		passwords.forEach((password, index) => {
			if (password == text) {
				passwords.splice(index, 1);
			}
		});
		e.target.parentNode.parentNode.remove();
		localStorage.setItem('passwords', JSON.stringify(passwords));
		if (passwordList.childElementCount != 0) {
			lowerDiv.classList.remove('hidden');
		} else {
			lowerDiv.classList.add('hidden');
		}
	}

	if (e.target.classList.contains('copy')) {
		let input = e.target.parentNode.previousSibling;
		input.select();
		document.execCommand('copy');
		alertBoxGreen.classList.add('show');
		setTimeout(() => {
			alertBoxGreen.classList.remove('show');
		}, 2000);
	}
};

function generatePassword() {
	let password = '';
	for (let i = 1; i <= 15; i++) {
		const rand = parseInt(Math.random() * 122 + 48);
		if (
			(rand > 47 && rand < 58) ||
			(rand > 64 && rand < 91) ||
			(rand > 96 && rand < 123)
		) {
			const char = String.fromCharCode(rand);
			password += char;
		} else {
			i--;
		}
	}
	passwordField.value = password;
	passwordField.classList.remove('hidden');
	savePasswordBtn.classList.remove('hidden');
}

savePasswordBtn.addEventListener('click', () => {
	savePassword(passwordField.value);
});

function savePassword(password) {
	let met = false;
	passwords.forEach((pass) => {
		if (pass == password) {
			met = true;
		}
	});
	if (!met) {
		createPasswordLi(password);

		addPasswordToLocalStorage(password);
		lowerDiv.classList.remove('hidden');
	} else {
		alertBoxRed.classList.add('show');
		setTimeout(() => {
			alertBoxRed.classList.remove('show');
		}, 2000);
	}
}

function createPasswordLi(password) {
	const li = document.createElement('li');
	li.classList.add('password-li');

	const text = document.createElement('input');
	text.classList.add('password-text');
	text.type = 'text';
	text.value = password;
	text.setAttribute('readonly', 'true');

	const span = document.createElement('span');
	span.classList.add('options');

	const copyBtn = document.createElement('button');
	copyBtn.classList.add('secondary-btn');
	copyBtn.classList.add('copy');
	copyBtn.textContent = 'Copy';

	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('secondary-btn');
	deleteBtn.classList.add('del');
	deleteBtn.textContent = 'x';

	span.append(copyBtn);
	span.append(deleteBtn);

	li.append(text);
	li.append(span);

	passwordList.append(li);
}

function addPasswordToLocalStorage(password) {
	if (localStorage.getItem('passwords') != null) {
		passwords = JSON.parse(localStorage.getItem('passwords'));
	} else {
		passwords = [];
	}
	passwords.push(password);
	localStorage.setItem('passwords', JSON.stringify(passwords));
}
