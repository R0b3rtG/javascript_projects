(() => {
	let canvas, ctx;

	function init() {
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');

		let speedX = 6;
		let speedY = 5;
		let x = 0;
		let y = 4.7 * 16;

		function draw() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.strokeStyle = 'black';
			ctx.fillStyle = 'black';

			ctx.font = 'bold 7rem Monospace';
			ctx.textAlign = 'left';
			ctx.textBaseline = 'alphabetic';

			ctx.fillText('DVD', x, y);
			let w = ctx.measureText('DVD').width;
			let h = 4.7 * 16;

			if (x > canvas.width - w) speedX = -6;
			if (x < 0) speedX = 6;

			if (y > canvas.height) speedY = -5;
			if (y < 0 + h) speedY = 5;

			x += speedX;
			y += speedY;

			setTimeout(draw, 16);
		}

		draw();

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
				speedX = 0;
				speedY = 0;
				playStopBtn.innerHTML = '<i class="fas fa-play"></i>';
				inputRed.removeAttribute('readonly');
				inputGreen.removeAttribute('readonly');
				inputBlue.removeAttribute('readonly');
			} else if (playStopBtn.innerHTML == '<i class="fas fa-play"></i>') {
				root.style.setProperty('--playState', 'running');
				speedX = 6;
				speedY = 5;
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
					colors[
						index
					] = `#${inputRed.value}${inputGreen.value}${inputBlue.value}`;
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
	}

	document.addEventListener('DOMContentLoaded', init);
})();
