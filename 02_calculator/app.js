const input = document.querySelector('.input');
const output = document.querySelector('.output');
const bAC = document.querySelector('.b-ac');
const bNegative = document.querySelector('.b-negative');
const bPercent = document.querySelector('.b-percent');
const bDivide = document.querySelector('.b-divide');
const b7 = document.querySelector('.b-7');
const b8 = document.querySelector('.b-8');
const b9 = document.querySelector('.b-9');
const bTimes = document.querySelector('.b-times');
const b4 = document.querySelector('.b-4');
const b5 = document.querySelector('.b-5');
const b6 = document.querySelector('.b-6');
const bMinus = document.querySelector('.b-minus');
const b1 = document.querySelector('.b-1');
const b2 = document.querySelector('.b-2');
const b3 = document.querySelector('.b-3');
const bPlus = document.querySelector('.b-plus');
const b0 = document.querySelector('.b-0');
const bDot = document.querySelector('.b-dot');
const bEquals = document.querySelector('.b-equals');
let val1 = 0;
let val2 = 0;
let sign;
let lastOp = '';

b0.addEventListener('click', function () {
	if (input.value.length !== 8) {
		input.value += 0;
	}
});

b1.addEventListener('click', function () {
	if (input.value.length !== 8) {
		input.value += 1;
	}
});

b2.addEventListener('click', function () {
	if (input.value.length !== 8) {
		input.value += 2;
	}
});

b3.addEventListener('click', function () {
	if (input.value.length !== 8) {
		input.value += 3;
	}
});

b4.addEventListener('click', function () {
	if (input.value.length !== 8) {
		input.value += 4;
	}
});

b5.addEventListener('click', function () {
	if (input.value.length !== 8) {
		input.value += 5;
	}
});

b6.addEventListener('click', function () {
	if (input.value.length !== 8) {
		input.value += 6;
	}
});

b7.addEventListener('click', function () {
	if (input.value.length !== 8) {
		input.value += 7;
	}
});

b8.addEventListener('click', function () {
	if (input.value.length !== 8) {
		input.value += 8;
	}
});

b9.addEventListener('click', function () {
	if (input.value.length !== 8) {
		input.value += 9;
	}
});

bDot.addEventListener('click', function () {
	if (input.value.length !== 8) {
		input.value += '.';
	}
});

bNegative.addEventListener('click', function () {
	if (parseFloat(input.value) > 0) {
		input.value = '-' + input.value;
	} else if (parseFloat(input.value) < 0) {
		input.value = input.value.substr(1, input.value.length);
	}
});

bPercent.addEventListener('click', function () {
	input.value = parseFloat(input.value) / 100;
});

bAC.addEventListener('click', function () {
	val1 = 0;
	val2 = 0;
	input.value = '';
	output.value = '';
	lastOp = '';
	sign = '';
});

bPlus.addEventListener('click', function () {
	if (lastOp === 'plus' || lastOp === '') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 + val2;
		} else {
			val1 = val2;
		}
		input.value = '';
	}
	if (lastOp === 'minus') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 - val2;
		} else {
			val1 = val2;
		}
		input.value = '';
	}
	if (lastOp === 'times') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 * val2;
		} else {
			val1 = val2;
		}
		input.value = '';
	}
	if (lastOp === 'divide') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 / val2;
		} else {
			val1 = val2;
		}
		input.value = '';
	}
	if (val1 != 'Nan' || val1 != 0) {
		if (parseInt(val1).toString().substr(1, input.value.length).length <= 8) {
			if (val1 != parseInt(val1)) {
				output.value = val1.toFixed(2);
			} else {
				output.value = val1;
			}
		} else {
			output.value = 'ERROR!';
		}
	}
	if (output.value == 'NaN') {
		output.value = 0;
	}
	lastOp = 'plus';
});

bMinus.addEventListener('click', function () {
	if (lastOp === 'plus') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 + val2;
		} else {
			val1 = val2;
		}
		input.value = '';
	}
	if (lastOp === 'minus' || lastOp === '') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 - val2;
		} else {
			val1 = val2;
		}
		input.value = '';
	}
	if (lastOp === 'times') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 * val2;
		} else {
			val1 = val2;
		}
		input.value = '';
	}
	if (lastOp === 'divide') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 / val2;
		} else {
			val1 = val2;
		}
		input.value = '';
	}
	if (val1 != 'Nan' || val1 != 0) {
		if (parseInt(val1).toString().substr(1, input.value.length).length <= 8) {
			if (val1 != parseInt(val1)) {
				output.value = val1.toFixed(2);
			} else {
				output.value = val1;
			}
		} else {
			output.value = 'ERROR!';
		}
	}
	if (output.value == 'NaN') {
		output.value = 0;
	}
	lastOp = 'minus';
});

bTimes.addEventListener('click', function () {
	if (lastOp === 'plus') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 + val2;
		} else {
			val1 = val2;
		}
		input.value = '';
	}
	if (lastOp === 'minus') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 - val2;
		} else {
			val1 = val2;
		}
		input.value = '';
	}
	if (lastOp === 'times' || lastOp === '') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 * val2;
		} else {
			val1 = val2;
		}
		input.value = '';
	}
	if (lastOp === 'divide') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 / val2;
		} else {
			val1 = val2;
		}
		input.value = '';
	}
	if (val1 != 'Nan' || val1 != 0) {
		if (parseInt(val1).toString().substr(1, input.value.length).length <= 8) {
			if (val1 != parseInt(val1)) {
				output.value = val1.toFixed(2);
			} else {
				output.value = val1;
			}
		} else {
			output.value = 'ERROR!';
		}
	}
	if (output.value == 'NaN') {
		output.value = 0;
	}
	lastOp = 'times';
});

bDivide.addEventListener('click', function () {
	if (lastOp === 'plus') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 + val2;
		} else {
			val1 = val2;
		}
		input.value = '';
	}
	if (lastOp === 'minus') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 - val2;
		} else {
			val1 = val2;
		}
		input.value = '';
	}
	if (lastOp === 'times') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 * val2;
		} else {
			val1 = val2;
		}
		input.value = '';
	}
	if (lastOp === 'divide' || lastOp === '') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 / val2;
		} else {
			val1 = val2;
		}
		input.value = '';
	}
	if (val1 != 'Nan' || val1 != 0) {
		if (parseInt(val1).toString().substr(1, input.value.length).length <= 8) {
			if (val1 != parseInt(val1)) {
				output.value = val1.toFixed(2);
			} else {
				output.value = val1;
			}
		} else {
			output.value = 'ERROR!';
		}
	}
	if (output.value == 'NaN') {
		output.value = 0;
	}
	lastOp = 'divide';
});

bEquals.addEventListener('click', function () {
	if (lastOp === 'plus') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 + val2;
		} else {
			val1 = val2;
		}
		input.value = '';
	}
	if (lastOp === 'minus') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 - val2;
		} else {
			val1 = val2;
		}
		input.value = '';
	}
	if (lastOp === 'times') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 * val2;
		} else {
			val1 = val2;
		}
		input.value = '';
	}
	if (lastOp === 'divide') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 / val2;
		} else {
			val1 = val2;
		}
		input.value = '';
	}
	if (val1 != 'Nan' || val1 != 0) {
		if (val1.toString().substr(1, input.value.length).length <= 8) {
			if (val1 != parseInt(val1)) {
				output.value = val1.toFixed(2);
			} else {
				output.value = parseInt(val1);
			}
		} else {
			output.value = 'ERROR!';
		}
	}
	if (output.value == 'NaN') {
		output.value = 0;
	}
	lastOp = '';
	input.value = '';
	val1 = 0;
	val2 = 0;
	sign = '';
});
