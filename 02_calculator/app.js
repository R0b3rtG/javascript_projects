const input = document.querySelector('.input');
const output = document.querySelector('.output');
const bAC = document.querySelector('.b-ac');
const bNegative = document.querySelector('.b-negative');
const bPercent = document.querySelector('.b-percent');
const bDivide = document.querySelector('.b-divide');
const bTimes = document.querySelector('.b-times');
const bMinus = document.querySelector('.b-minus');
const bPlus = document.querySelector('.b-plus');
const bDot = document.querySelector('.b-dot');
const bEquals = document.querySelector('.b-equals');
const numButtons = document.querySelectorAll('.num-btn');
const opButtons = document.querySelectorAll('.op-btn');

let val1 = 0;
let val2 = 0;
let lastOp = '';
let beforeLastOp = '';

numButtons.forEach((btn) => {
	btn.addEventListener('click', () => {
		if (input.value.length !== 8) {
			input.value += btn.textContent;
		}
		if (lastOp == 'equals') {
			lastOp = '';
		}
	});
});

bDot.addEventListener('click', () => {
	if (input.value == '') {
		if (val1 == '') {
			input.value = 0;
		} else {
			input.value = val1;
		}
		output.value = '';
	}
	let isNegative = val1 < 0 ? 1 : 0;
	if (parseInt(input.value).toString().length <= 8 + isNegative) {
		if (input.value.indexOf('.') == -1) {
			input.value += '.';
		}
	}
});

bNegative.addEventListener('click', () => {
	if (input.value == '') {
		if (val1 != 0 && val1 != '') {
			input.value = parseFloat(val1) * -1;
			output.value = '';
		}
	} else {
		if (input.value != 0 && input.value != '') {
			input.value = parseFloat(input.value) * -1;
		}
	}
});

bPercent.addEventListener('click', () => {
	if (input.value == '') {
		if (val1 != 0 && val1 != '') {
			input.value = parseFloat(val1) / 100;
			output.value = '';
		}
	} else {
		if (input.value != 0 && input.value != '') {
			input.value = parseFloat(input.value) / 100;
		}
	}
});

bAC.addEventListener('click', () => {
	val1 = 0;
	val2 = 0;
	input.value = '';
	output.value = '';
	beforeLastOp = '';
	lastOp = '';
	opButtons.forEach((btn) => {
		btn.classList.remove('selected');
	});
});

bPlus.addEventListener('click', () => {
	beforeLastOp = '';
	opButtons.forEach((btn) => {
		btn.classList.remove('selected');
	});
	bPlus.classList.add('selected');
	if (input.value != '') {
		val2 = parseFloat(input.value);
		if (lastOp === 'plus' || lastOp == '') {
			if (lastOp != '') {
				val1 = val1 + val2;
			} else {
				val1 = val2;
			}
		}
		if (lastOp === 'minus') {
			if (lastOp != '') {
				val1 = val1 - val2;
			} else {
				val1 = val2;
			}
		}
		if (lastOp === 'times') {
			if (lastOp != '') {
				val1 = val1 * val2;
			} else {
				val1 = val2;
			}
		}
		if (lastOp === 'divide') {
			if (lastOp != '') {
				val1 = val1 / val2;
			} else {
				val1 = val2;
			}
		}
	} else {
		lastOp = 'plus';
	}

	input.value = '';
	if (val1 != 'Nan' || val1 != 0) {
		let hasDot = val1.toString().indexOf('.') != -1 ? 1 : 0;
		let isNegative = val1 < 0 ? 1 : 0;
		if (parseInt(val1).toString().length <= 8 + hasDot + isNegative) {
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

bMinus.addEventListener('click', () => {
	beforeLastOp = '';
	opButtons.forEach((btn) => {
		btn.classList.remove('selected');
	});
	bMinus.classList.add('selected');
	if (input.value != '') {
		val2 = parseFloat(input.value);
		if (lastOp === 'plus') {
			if (lastOp != '') {
				val1 = val1 + val2;
			} else {
				val1 = val2;
			}
		}
		if (lastOp === 'minus' || lastOp == '') {
			if (lastOp != '') {
				val1 = val1 - val2;
			} else {
				val1 = val2;
			}
		}
		if (lastOp === 'times') {
			if (lastOp != '') {
				val1 = val1 * val2;
			} else {
				val1 = val2;
			}
		}
		if (lastOp === 'divide') {
			if (lastOp != '') {
				val1 = val1 / val2;
			} else {
				val1 = val2;
			}
		}
	} else {
		lastOp = 'minus';
	}

	input.value = '';
	if (val1 != 'Nan' || val1 != 0) {
		let hasDot = val1.toString().indexOf('.') != -1 ? 1 : 0;
		let isNegative = val1 < 0 ? 1 : 0;
		if (parseInt(val1).toString().length <= 8 + hasDot + isNegative) {
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

bTimes.addEventListener('click', () => {
	opButtons.forEach((btn) => {
		btn.classList.remove('selected');
	});
	bTimes.classList.add('selected');
	beforeLastOp = '';
	if (input.value != '') {
		val2 = parseFloat(input.value);
		if (lastOp === 'plus') {
			if (lastOp != '') {
				val1 = val1 + val2;
			} else {
				val1 = val2;
			}
		}
		if (lastOp === 'minus') {
			if (lastOp != '') {
				val1 = val1 - val2;
			} else {
				val1 = val2;
			}
		}
		if (lastOp === 'times' || lastOp == '') {
			if (lastOp != '') {
				val1 = val1 * val2;
			} else {
				val1 = val2;
			}
		}
		if (lastOp === 'divide') {
			if (lastOp != '') {
				val1 = val1 / val2;
			} else {
				val1 = val2;
			}
		}
	} else {
		lastOp = 'times';
	}

	input.value = '';
	if (val1 != 'Nan' || val1 != 0) {
		let hasDot = val1.toString().indexOf('.') != -1 ? 1 : 0;
		let isNegative = val1 < 0 ? 1 : 0;
		if (parseInt(val1).toString().length <= 8 + hasDot + isNegative) {
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

bDivide.addEventListener('click', () => {
	beforeLastOp = '';
	opButtons.forEach((btn) => {
		btn.classList.remove('selected');
	});
	bDivide.classList.add('selected');
	if (input.value != '') {
		val2 = parseFloat(input.value);
		if (lastOp === 'plus') {
			if (lastOp != '') {
				val1 = val1 + val2;
			} else {
				val1 = val2;
			}
		}
		if (lastOp === 'minus') {
			if (lastOp != '') {
				val1 = val1 - val2;
			} else {
				val1 = val2;
			}
		}
		if (lastOp === 'times') {
			if (lastOp != '') {
				val1 = val1 * val2;
			} else {
				val1 = val2;
			}
		}
		if (lastOp === 'divide' || lastOp == '') {
			if (lastOp != '') {
				val1 = val1 / val2;
			} else {
				val1 = val2;
			}
		}
	} else {
		lastOp = 'divide';
	}

	input.value = '';
	if (val1 != 'Nan' || val1 != 0) {
		let hasDot = val1.toString().indexOf('.') != -1 ? 1 : 0;
		let isNegative = val1 < 0 ? 1 : 0;
		if (parseInt(val1).toString().length <= 8 + hasDot + isNegative) {
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

bEquals.addEventListener('click', () => {
	opButtons.forEach((btn) => {
		btn.classList.remove('selected');
	});
	if (lastOp === 'plus') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 + val2;
		} else {
			val1 = val2;
		}
	}
	if (lastOp === 'minus') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 - val2;
		} else {
			val1 = val2;
		}
	}
	if (lastOp === 'times') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 * val2;
		} else {
			val1 = val2;
		}
	}
	if (lastOp === 'divide') {
		val2 = parseFloat(input.value);
		if (lastOp != '') {
			val1 = val1 / val2;
		} else {
			val1 = val2;
		}
	}
	input.value = '';

	if (lastOp == 'equals') {
		if (beforeLastOp == 'plus') {
			val1 = val1 + val2;
		}
		if (beforeLastOp == 'minus') {
			val1 = val1 - val2;
		}
		if (beforeLastOp == 'times') {
			val1 = val1 * val2;
		}
		if (beforeLastOp == 'divide') {
			val1 = val1 / val2;
		}
		input.value = '';
	}

	if (val1 != 'Nan' || val1 != 0) {
		let hasDot = val1.toString().indexOf('.') != -1 ? 1 : 0;
		let isNegative = val1 < 0 ? 1 : 0;
		if (parseInt(val1).toString().length <= 8 + hasDot + isNegative) {
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
	if (lastOp == '') {
		output.value = '';
	}

	if (beforeLastOp == '') {
		beforeLastOp = lastOp;
	}
	lastOp = 'equals';
	input.value = '';
});

const inputAndOutputSection = document.querySelector('.input-and-output');
inputAndOutputSection.addEventListener('touchstart', handleTouchStart, false);
inputAndOutputSection.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;

function getTouches(e) {
	return e.touches;
}

function handleTouchStart(e) {
	const firstTouch = getTouches(e)[0];
	xDown = firstTouch.clientX;
}

function handleTouchMove(e) {
	if (!xDown) {
		return;
	}

	let xUp = e.touches[0].clientX;
	let xDiff = xDown - xUp;

	if (xDiff > 0 || xDiff < 0) {
		console.log('swipe');
		input.value = input.value.slice(0, -1);
	}
	xDown = null;
}
