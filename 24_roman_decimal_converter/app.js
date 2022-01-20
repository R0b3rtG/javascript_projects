let romanIn = '';
let decimalOut;
let decimalIn;
let romanOut = '';

let resultInDec = [];
let result = [];

let romanInvalid;

let strArr2 = [];

function convertToDec(romanIn) {
	decimalOut = 0;
	romanInvalid = false;
	// PUT LETTERS FROM ROMAN NUMBER INTO AN ARRAY
	let strArr = [];
	let t = 1;
	for (let i = 0; i < romanIn.length; i = i + t) {
		if (romanIn[i] == '(') {
			strArr.push(`(${romanIn[i + 1]})`);
			t = 3;
		} else {
			strArr.push(romanIn[i]);
			t = 1;
		}
	}

	// CHANGE THE LETTERS TO CORRESPONDING NUMBERS
	changeLettersToNumbers(strArr);

	// FREQUENCY ARRAY FOR CHECK
	let frq = [
		{ value: 1, count: 1 },
		{ value: 5, count: 1 },
		{ value: 10, count: 1 },
		{ value: 50, count: 1 },
		{ value: 100, count: 1 },
		{ value: 500, count: 1 },
		{ value: 1000, count: 1 },
		{ value: 5000, count: 1 },
		{ value: 10000, count: 1 },
		{ value: 50000, count: 1 },
		{ value: 100000, count: 1 },
		{ value: 500000, count: 1 },
		{ value: 1000000, count: 1 },
	];

	// UPDATE FREQUENCY OF NUMBERS
	for (let i = 0; i < strArr2.length; i++) {
		if (strArr2[i - 1] == strArr2[i]) {
			frq.forEach((element) => {
				if (strArr2[i] == element.value) element.count++;
			});
		} else {
			frq.forEach((element) => {
				if (strArr2[i] == element.value) element.count = 1;
			});
		}
	}

	// FEQUENCY CHECK
	let arrSub = [];
	if (checkFrq(frq)) {
		// FORM ARRAY AFTER SUBSTRACTION
		let k = 1;
		for (let i = 0; i < strArr2.length; i = i + k) {
			if (strArr2[i] < strArr2[i + 1]) {
				if (
					strArr2[i + 1] == strArr2[i] * 10 ||
					strArr2[i + 1] == strArr2[i] * 5
				) {
					arrSub.push(strArr2[i + 1] - strArr2[i]);
					k = 2;
				} else {
					romanInvalid = true;
					break;
				}
			} else {
				arrSub.push(strArr2[i]);
				k = 1;
			}
		}
	} else {
		romanInvalid = true;
	}

	// CHECK ORDER
	if (!romanInvalid) {
		if (checkOrder(arrSub)) {
			for (let i = 0; i < arrSub.length; i++) {
				decimalOut = decimalOut + arrSub[i];
			}
			return decimalOut;
		} else {
			return 'invalid';
		}
	} else {
		return 'invalid';
	}
}

function changeLettersToNumbers(strArr) {
	strArr2 = [];
	for (let i = 0; i < strArr.length; i++) {
		if (strArr[i] == 'I' || strArr[i] == 'i') strArr2.push(1);
		if (strArr[i] == 'V' || strArr[i] == 'v') strArr2.push(5);
		if (strArr[i] == 'X' || strArr[i] == 'x') strArr2.push(10);
		if (strArr[i] == 'L' || strArr[i] == 'l') strArr2.push(50);
		if (strArr[i] == 'C' || strArr[i] == 'c') strArr2.push(100);
		if (strArr[i] == 'D' || strArr[i] == 'd') strArr2.push(500);
		if (strArr[i] == 'M' || strArr[i] == 'm') strArr2.push(1000);
		if (strArr[i] == '(V)' || strArr[i] == '(v)') strArr2.push(5000);
		if (strArr[i] == '(X)' || strArr[i] == '(x)') strArr2.push(10000);
		if (strArr[i] == '(L)' || strArr[i] == '(l)') strArr2.push(50000);
		if (strArr[i] == '(C)' || strArr[i] == '(c)') strArr2.push(100000);
		if (strArr[i] == '(D)' || strArr[i] == '(d)') strArr2.push(500000);
		if (strArr[i] == '(M)' || strArr[i] == '(m)') strArr2.push(1000000);
	}
}

function checkFrq(frq) {
	let ok = true;
	if (frq[0].count > 3) ok = false;
	if (frq[1].count > 1) ok = false;
	if (frq[2].count > 3) ok = false;
	if (frq[3].count > 1) ok = false;
	if (frq[4].count > 3) ok = false;
	if (frq[5].count > 1) ok = false;
	if (frq[6].count > 3) ok = false;
	if (frq[7].count > 1) ok = false;
	if (frq[8].count > 3) ok = false;
	if (frq[9].count > 1) ok = false;
	if (frq[10].count > 3) ok = false;
	if (frq[11].count > 1) ok = false;
	if (frq[12].count > 3) ok = false;

	return ok;
}

function checkOrder(arrSub) {
	let ok = true;
	for (let i = 0; i < arrSub.length; i++) {
		if (
			arrSub[i] == 900 ||
			arrSub[i] == 400 ||
			arrSub[i] == 90 ||
			arrSub[i] == 40 ||
			arrSub[i] == 9 ||
			arrSub[i] == 4
		) {
			if (arrSub[i] == 900000 && arrSub[i + 1] > 99999) ok = false;
			if (arrSub[i] == 400000 && arrSub[i + 1] > 99999) ok = false;
			if (arrSub[i] == 90000 && arrSub[i + 1] > 9999) ok = false;
			if (arrSub[i] == 40000 && arrSub[i + 1] > 9999) ok = false;
			if (arrSub[i] == 9000 && arrSub[i + 1] > 999) ok = false;
			if (arrSub[i] == 4000 && arrSub[i + 1] > 999) ok = false;
			if (arrSub[i] == 900 && arrSub[i + 1] > 99) ok = false;
			if (arrSub[i] == 400 && arrSub[i + 1] > 99) ok = false;
			if (arrSub[i] == 90 && arrSub[i + 1] > 9) ok = false;
			if (arrSub[i] == 40 && arrSub[i + 1] > 9) ok = false;
			if (arrSub[i] == 9 && arrSub[i + 1] != undefined) ok = false;
			if (arrSub[i] == 4 && arrSub[i + 1] != undefined) ok = false;
		} else {
			if (arrSub[i] == 1000000) if (arrSub[i + 1] > 1000000) ok = false;
			if (arrSub[i] == 500000) if (arrSub[i + 1] > 100000) ok = false;
			if (arrSub[i] == 100000) if (arrSub[i + 1] > 100000) ok = false;
			if (arrSub[i] == 50000) if (arrSub[i + 1] > 10000) ok = false;
			if (arrSub[i] == 10000) if (arrSub[i + 1] > 10000) ok = false;
			if (arrSub[i] == 5000) if (arrSub[i + 1] > 1000) ok = false;
			if (arrSub[i] == 1000) if (arrSub[i + 1] > 1000) ok = false;
			if (arrSub[i] == 500) if (arrSub[i + 1] > 100) ok = false;
			if (arrSub[i] == 100) if (arrSub[i + 1] > 100) ok = false;
			if (arrSub[i] == 50) if (arrSub[i + 1] > 10) ok = false;
			if (arrSub[i] == 10) if (arrSub[i + 1] > 10) ok = false;
			if (arrSub[i] == 5) if (arrSub[i + 1] > 1) ok = false;
			if (arrSub[i] == 1) if (arrSub[i + 1] > 1) ok = false;
		}
	}

	return ok;
}

const mainNumbers = [
	{ romanValue: 'I', decimalValue: 1 },
	{ romanValue: 'II', decimalValue: 2 },
	{ romanValue: 'III', decimalValue: 3 },
	{ romanValue: 'IV', decimalValue: 4 },
	{ romanValue: 'V', decimalValue: 5 },
	{ romanValue: 'VI', decimalValue: 6 },
	{ romanValue: 'VII', decimalValue: 7 },
	{ romanValue: 'VIII', decimalValue: 8 },
	{ romanValue: 'IX', decimalValue: 9 },
	{ romanValue: 'X', decimalValue: 10 },
	{ romanValue: 'XX', decimalValue: 20 },
	{ romanValue: 'XXX', decimalValue: 30 },
	{ romanValue: 'XL', decimalValue: 40 },
	{ romanValue: 'L', decimalValue: 50 },
	{ romanValue: 'LX', decimalValue: 60 },
	{ romanValue: 'LXX', decimalValue: 70 },
	{ romanValue: 'LXXX', decimalValue: 80 },
	{ romanValue: 'XC', decimalValue: 90 },
	{ romanValue: 'C', decimalValue: 100 },
	{ romanValue: 'CC', decimalValue: 200 },
	{ romanValue: 'CCC', decimalValue: 300 },
	{ romanValue: 'CD', decimalValue: 400 },
	{ romanValue: 'D', decimalValue: 500 },
	{ romanValue: 'DC', decimalValue: 600 },
	{ romanValue: 'DCC', decimalValue: 700 },
	{ romanValue: 'DCCC', decimalValue: 800 },
	{ romanValue: 'CM', decimalValue: 900 },
	{ romanValue: 'M', decimalValue: 1000 },
	{ romanValue: 'MM', decimalValue: 2000 },
	{ romanValue: 'MMM', decimalValue: 3000 },
	{ romanValue: 'M(V)', decimalValue: 4000 },
	{ romanValue: '(V)', decimalValue: 5000 },
	{ romanValue: '(V)M', decimalValue: 6000 },
	{ romanValue: '(V)MM', decimalValue: 7000 },
	{ romanValue: '(V)MMM', decimalValue: 8000 },
	{ romanValue: 'M(X)', decimalValue: 9000 },
	{ romanValue: '(X)', decimalValue: 10000 },
	{ romanValue: '(X)(X)', decimalValue: 20000 },
	{ romanValue: '(X)(X)(X)', decimalValue: 30000 },
	{ romanValue: '(X)(L)', decimalValue: 40000 },
	{ romanValue: '(L)', decimalValue: 50000 },
	{ romanValue: '(L)(X)', decimalValue: 60000 },
	{ romanValue: '(L)(X)(X)', decimalValue: 70000 },
	{ romanValue: '(L)(X)(X)(X)', decimalValue: 80000 },
	{ romanValue: '(X)(C)', decimalValue: 90000 },
	{ romanValue: '(C)', decimalValue: 100000 },
	{ romanValue: '(C)(C)', decimalValue: 200000 },
	{ romanValue: '(C)(C)(C)', decimalValue: 300000 },
	{ romanValue: '(C)(D)', decimalValue: 400000 },
	{ romanValue: '(D)', decimalValue: 500000 },
	{ romanValue: '(D)(C)', decimalValue: 600000 },
	{ romanValue: '(D)(C)(C)', decimalValue: 700000 },
	{ romanValue: '(D)(C)(C)(C)', decimalValue: 800000 },
	{ romanValue: '(C)(M)', decimalValue: 900000 },
	{ romanValue: '(M)', decimalValue: 1000000 },
	{ romanValue: '(M)(M)', decimalValue: 2000000 },
	{ romanValue: '(M)(M)(M)', decimalValue: 3000000 },
];

function convertToRoman(decimalIn) {
	romanOut = '';
	decimalIn = parseInt(decimalIn);
	if (decimalIn > 0 && decimalIn < 4000000) {
		// Split Digits
		let digits = [];
		for (let i = 0; i < decimalIn.toString().length; i++) {
			digits[i] = decimalIn.toString()[i];
		}
		// Transform Digits into numbers
		for (let i = 0; i < digits.length; i++) {
			if (!(digits[i] == 0)) {
				digits[i] = Math.pow(10, digits.length - i - 1) * digits[i];
				mainNumbers.forEach((index) => {
					if (index.decimalValue == digits[i]) digits[i] = index.romanValue;
				});
				romanOut += digits[i].toString();
			}
		}
		return romanOut;
	} else {
		return 'only numbers from [1,3999999]';
	}
}

const romanInputField = document.querySelector('.roman-input');
const decimalOutputField = document.querySelector('.decimal-output');
const decimalInputField = document.querySelector('.decimal-input');
const romanOutputField = document.querySelector('.roman-output');
const convertToDecBtn = document.querySelector('.convert-to-dec');
const convertToRomanBtn = document.querySelector('.convert-to-roman');

const back1 = document.querySelector('.back-btn-1');
const clear1 = document.querySelector('.clear-btn-1');
const btnI = document.querySelector('.I');
const btnV = document.querySelector('.V');
const btnX = document.querySelector('.X');
const btnL = document.querySelector('.L');
const btnC = document.querySelector('.C');
const btnD = document.querySelector('.D');
const btnM = document.querySelector('.M');
const btnV2 = document.querySelector('.V2');
const btnX2 = document.querySelector('.X2');
const btnL2 = document.querySelector('.L2');
const btnC2 = document.querySelector('.C2');
const btnD2 = document.querySelector('.D2');
const btnM2 = document.querySelector('.M2');
const convert1 = document.querySelector('.convert-to-dec');

back1.addEventListener('click', () => {
	let str = romanInputField.value;
	let k;
	if (str[str.length - 1] == ')') k = 3;
	else k = 1;
	str = str.slice(0, 0 - k);
	romanInputField.value = str;
});
clear1.addEventListener('click', () => {
	romanInputField.value = '';
	decimalOutputField.value = '';
});
btnI.addEventListener('click', () => (romanInputField.value += 'I'));
btnV.addEventListener('click', () => (romanInputField.value += 'V'));
btnX.addEventListener('click', () => (romanInputField.value += 'X'));
btnL.addEventListener('click', () => (romanInputField.value += 'L'));
btnC.addEventListener('click', () => (romanInputField.value += 'C'));
btnD.addEventListener('click', () => (romanInputField.value += 'D'));
btnM.addEventListener('click', () => (romanInputField.value += 'M'));
btnV2.addEventListener('click', () => (romanInputField.value += '(V)'));
btnX2.addEventListener('click', () => (romanInputField.value += '(X)'));
btnL2.addEventListener('click', () => (romanInputField.value += '(L)'));
btnC2.addEventListener('click', () => (romanInputField.value += '(C)'));
btnD2.addEventListener('click', () => (romanInputField.value += '(D)'));
btnM2.addEventListener('click', () => (romanInputField.value += '(M)'));
convert1.addEventListener('click', () => {
	let str = romanInputField.value;
	str = convertToDec(str);
	decimalOutputField.value = str;
	decimalOutputField.style.color = '#000';
	if (str == 'invalid') decimalOutputField.style.color = '#f00';
});

const back2 = document.querySelector('.back-btn-2');
const clear2 = document.querySelector('.clear-btn-2');
const b1 = document.querySelector('.b1');
const b2 = document.querySelector('.b2');
const b3 = document.querySelector('.b3');
const b4 = document.querySelector('.b4');
const b5 = document.querySelector('.b5');
const b6 = document.querySelector('.b6');
const b7 = document.querySelector('.b7');
const b8 = document.querySelector('.b8');
const b9 = document.querySelector('.b9');
const b0 = document.querySelector('.b0');
const convert2 = document.querySelector('.convert-to-roman');

back2.addEventListener(
	'click',
	() => (decimalInputField.value = decimalInputField.value.slice(0, -1))
);
clear2.addEventListener('click', () => {
	decimalInputField.value = '';
	romanOutputField.value = '';
});
b1.addEventListener('click', () => (decimalInputField.value += '1'));
b2.addEventListener('click', () => (decimalInputField.value += '2'));
b3.addEventListener('click', () => (decimalInputField.value += '3'));
b4.addEventListener('click', () => (decimalInputField.value += '4'));
b5.addEventListener('click', () => (decimalInputField.value += '5'));
b6.addEventListener('click', () => (decimalInputField.value += '6'));
b7.addEventListener('click', () => (decimalInputField.value += '7'));
b8.addEventListener('click', () => (decimalInputField.value += '8'));
b9.addEventListener('click', () => (decimalInputField.value += '9'));
b0.addEventListener('click', () => (decimalInputField.value += '0'));
convert2.addEventListener('click', () => {
	let num = decimalInputField.value;
	num = convertToRoman(num);
	romanOutputField.value = num;
	romanOutputField.style.color = '#000';
	if (num == 'only numbers from [1,3999999]')
		romanOutputField.style.color = '#f00';
});
