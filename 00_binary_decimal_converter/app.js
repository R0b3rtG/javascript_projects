const input1 = document.querySelector('.input1');
const input2 = document.querySelector('.input2');
const btn = document.querySelector('.convert');
const d2b = document.querySelector('.decimal_to_binary');
const b2d = document.querySelector('.binary_to_decimal');
const error = document.querySelector('.error');
const heading = document.querySelector('h1');
let currentOperation = 'bin2dec';

btn.addEventListener('click', convert);
function convert() {
	if (currentOperation === 'bin2dec') {
		convertToDecimal();
	}

	if (currentOperation === 'dec2bin') {
		convertToBinary();
	}

	btn.style.transform = 'scale(.95)';
	setTimeout(function () {
		btn.style.transform = 'scale(1)';
	}, 200);
}

function convertToDecimal() {
	if (input1.value !== '') {
		input2.value = parseInt(input1.value, 2);
	} else {
		input2.value = '';
	}
}

function convertToBinary() {
	if (input1.value !== '') {
		input2.value = parseInt(input1.value).toString(2);
	} else {
		input2.value = '';
	}
}

input1.onkeypress = (e) => {
	if (currentOperation === 'bin2dec') {
		return restrictBinary(e);
	}
	if (currentOperation === 'dec2bin') {
		return restrictDecimal(e);
	}
};

function restrictBinary(e) {
	const keycode = e.which || e.keycode;
	if (keycode == 32 || keycode == 13) {
		btn.click();
		return false;
	}
	if (keycode == 48 || keycode == 49) {
		error.innerHTML = '';
		return true;
	} else {
		showText(
			`<span class="character">${String.fromCharCode(
				keycode
			)}</span> is not a valid character`,
			'red'
		);
		return false;
	}
}

function restrictDecimal(e) {
	const keycode = e.which || e.keycode;
	if (keycode == 32 || keycode == 13) {
		btn.click();
		return false;
	}
	if (keycode >= 48 && keycode <= 57) {
		error.innerHTML = '';
		return true;
	} else {
		showText(
			`<span class="character">${String.fromCharCode(
				keycode
			)}</span> is not a valid character`,
			'red'
		);
		return false;
	}
}

d2b.addEventListener('click', changeToD2B);
function changeToD2B() {
	currentOperation = 'dec2bin';
	input1.setAttribute('placeholder', 'decimal');
	input2.setAttribute('placeholder', 'binary');
	input1.value = '';
	input2.value = '';
	showText('Changed to Decimal To Binary Converter', 'green');
	setTimeout(function () {
		error.innerHTML = '';
	}, 3000);
	heading.innerHTML = 'Decimal To Binary Converter';
	btn.innerHTML = 'Convert to Binary';
	d2b.style.transform = 'scale(.95)';
	setTimeout(function () {
		d2b.style.transform = 'scale(1)';
	}, 200);
}

b2d.addEventListener('click', changeToB2D);
function changeToB2D() {
	currentOperation = 'bin2dec';
	input1.setAttribute('placeholder', 'binary');
	input2.setAttribute('placeholder', 'decimal');
	input1.value = '';
	input2.value = '';
	showText('Changed to Binary to Decimal Converter', 'green');
	setTimeout(function () {
		error.innerHTML = '';
	}, 3000);
	heading.innerHTML = 'Binary To Decimal Converter';
	btn.innerHTML = 'Convert to Decimal';
	b2d.style.transform = 'scale(.95)';
	setTimeout(function () {
		b2d.style.transform = 'scale(1)';
	}, 200);
}

function showText(message, color) {
	error.innerHTML = message;
	error.style.color = color;
}
