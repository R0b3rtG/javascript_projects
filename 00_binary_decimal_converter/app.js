const input1 = document.querySelector('.input1');
const input2 = document.querySelector('.input2');
const btn = document.querySelector('.convert');
const d2b = document.querySelector('.decimal_to_binary');
const b2d = document.querySelector('.binary_to_decimal');
const error = document.querySelector('.error');
const heading = document.querySelector('h1');

btn.addEventListener('click', convert);
d2b.addEventListener('click', changeToD2B);
b2d.addEventListener('click', changeToB2D);

function convert() {
	if (input1.getAttribute('placeholder') == 'binary') {
		convertToDecimal();
	}

	if (input1.getAttribute('placeholder') == 'decimal') {
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

function restrictBinary(e) {
	const x = e.which || e.keycode;
	if (x == 32 || x == 13) {
		return false;
	}
	if (x >= 48 && x <= 49) {
		error.innerHTML = '';
		return true;
	} else {
		showText(
			`<span class="character">${String.fromCharCode(
				e.which
			)}</span> is not a valid character`,
			'red'
		);
		return false;
	}
}

function restrictDecimal(e) {
	const x = e.which || e.keycode;
	if (x == 32 || x == 13) {
		return false;
	}
	if (x >= 48 && x <= 57) {
		error.innerHTML = '';
		return true;
	} else {
		showText(
			`<span class="character">${String.fromCharCode(
				e.which
			)}</span> is not a valid character`,
			'red'
		);
		return false;
	}
}

function changeToD2B() {
	input1.setAttribute('onkeypress', 'return restrictDecimal(event)');
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

function changeToB2D() {
	input1.setAttribute('onkeypress', 'return restrictBinary(event)');
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
