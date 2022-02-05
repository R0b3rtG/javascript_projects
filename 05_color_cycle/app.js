const playStopBtn = document.querySelector('.play-stop-btn');
const inputRed = document.querySelector('.red');
const inputGreen = document.querySelector('.green');
const inputBlue = document.querySelector('.blue');
const root = document.querySelector(':root');
const enterBtn = document.querySelector('.enter');
const colors = [
	'#ff0000',
	'#ffff00',
	'#00ff00',
	'#0000ff',
	'#ff00ff',
	'#ff0000',
];
const info = document.querySelector('.info');
let index = 0;
let re = /^([a-f0-9]{2})$/i;

playStopBtn.addEventListener('click', function () {
	if (playStopBtn.innerHTML == '<i class="fas fa-pause"></i>') {
		root.style.setProperty('--playState', 'paused');
		playStopBtn.innerHTML = '<i class="fas fa-play"></i>';
		inputRed.removeAttribute('readonly');
		inputGreen.removeAttribute('readonly');
		inputBlue.removeAttribute('readonly');
	} else if (playStopBtn.innerHTML == '<i class="fas fa-play"></i>') {
		root.style.setProperty('--playState', 'running');
		playStopBtn.innerHTML = '<i class="fas fa-pause"></i>';
		inputRed.setAttribute('readonly', 'true');
		inputGreen.setAttribute('readonly', 'true');
		inputBlue.setAttribute('readonly', 'true');
	}
});

enterBtn.addEventListener('click', function () {
	if (
		inputRed.value !== '' ||
		inputGreen.value !== '' ||
		inputBlue.value !== ''
	) {
		if (checkInput() === true) {
			colors[index] = `#${inputRed.value}${inputGreen.value}${inputBlue.value}`;
			if (index < 4) {
				index++;
			} else {
				index = 0;
			}
			inputRed.value = '';
			inputGreen.value = '';
			inputBlue.value = '';
		} else {
			info.textContent = 'Enter a valid hex value';
			info.style.color = '#f00';
			setTimeout(() => {
				info.textContent = 'Stop the animation and enter a color code';
				info.style.color = '#fff';
			}, 3000);
		}
		updateColors();
	}
});

function updateColors() {
	root.style.setProperty('--color1', colors[0]);
	root.style.setProperty('--color2', colors[1]);
	root.style.setProperty('--color3', colors[2]);
	root.style.setProperty('--color4', colors[3]);
	root.style.setProperty('--color5', colors[4]);
}

inputRed.addEventListener('click', function () {
	inputRed.select();
});

inputGreen.addEventListener('click', function () {
	inputGreen.select();
});

inputBlue.addEventListener('click', function () {
	inputBlue.select();
});

function checkInput() {
	if (
		re.test(inputRed.value) &&
		re.test(inputGreen.value) &&
		re.test(inputBlue.value)
	) {
		return true;
	} else {
		return false;
	}
}

let resize = new ResizeObserver((enteries) => {
	console.log(enteries);
});

resize.observe(document.body);
