const input = document.querySelector('.input');
const totalCents = document.querySelector('.cents');
const outputQuarters = document.querySelector('.output-quarters');
const outputDimes = document.querySelector('.output-dimes');
const outputNickels = document.querySelector('.output-nickels');
const outputPennies = document.querySelector('.output-pennies');
const convertBtn = document.querySelector('.convert-btn');

let transformedCents;

convertBtn.addEventListener('click', transformMoney);

function checkInput(event) {
	let pressedKey;
	pressedKey = event.keycode || event.which;
	if ((pressedKey > 47 && pressedKey < 58) || pressedKey === 46) {
		if (pressedKey === 46) {
			if (re.exec(input.value) != null) {
				return false;
			}
		} else return true;
	} else return false;
}

function transformMoney() {
	if (input.value != '') {
		transformedCents = input.value;
		transformedCents = parseInt(parseFloat(transformedCents).toFixed(2) * 100);
		totalCents.value = transformedCents;
		outputQuarters.value = parseInt(transformedCents / 25);
		outputDimes.value = parseInt((transformedCents % 25) / 10);
		outputNickels.value = parseInt(((transformedCents % 25) % 10) / 5);
		outputPennies.value = parseInt(((transformedCents % 25) % 10) % 5);
	} else {
		let alertBox = document.createElement('p');
		alertBox.classList.add('alert-box');
		alertBox.textContent = 'Enter a value!';
		document.querySelector('.input-div').appendChild(alertBox);
		setTimeout(() => {
			document.querySelector('.alert-box').remove();
		}, 3000);
		input.value = '';
		outputQuarters.value = '';
		outputDimes.value = '';
		outputNickels.value = '';
		outputPennies.value = '';
		totalCents.value = '';
	}
}
