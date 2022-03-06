// Rotate Lines
const lines = document.querySelectorAll('.outside-line');

lines.forEach((line, index) => {
	line.style.transform = `rotate(${6 * index}deg)`;
});

// Lines Animation
let interval;

const arrow = document.querySelector('.arrow-line');

const startBtn = document.querySelector('.start-timer-btn');
startBtn.onclick = startInterval;

const lapBtn = document.querySelector('.lap-btn');
const pauseBtn = document.querySelector('.pause-timer-btn');
const lapsDiv = document.querySelector('.laps-div');

let arr = [];
let timeSum;

let lapIndex = 1;
function startInterval() {
	arrow.style.setProperty('--arrow-rotation-duration', '500ms');
	const startDate = new Date();
	timeSum = 0;
	arr.forEach((el) => (timeSum += el));
	console.log(arr);
	interval = setInterval(() => {
		const currentDate = new Date();
		let time = calculateTime(startDate, currentDate, timeSum);
		time = formatTime(time);
		displayTime(time);
		let index = parseInt(time.seconds);
		// console.log(time.seconds);
		// console.log(time.seconds, time.minutes);
		if (time.minutes % 2 != 0) {
			lines[index].classList.remove('opaque');
		} else {
			lines[index].classList.add('opaque');
		}
		// console.log(time.totalSeconds);
		let arrowRotation = time.totalSeconds;
		arrow.style.transform = `rotate(${arrowRotation * 6}deg)`;
	}, 10);
	startBtn.setAttribute('disabled', 'true');
	pauseBtn.removeAttribute('disabled');
	lapBtn.removeAttribute('disabled');

	function makeLap() {
		const lapTime = new Date();
		let time = calculateTime(startDate, lapTime, timeSum);
		time = formatTime(time);
		let element = createLapElement(time, lapIndex);
		lapsDiv.insertBefore(element, lapsDiv.firstChild);
	}
	lapBtn.onclick = makeLap;

	function createLapElement(time, number) {
		const lap = document.createElement('div');
		lap.classList.add('lap');

		const lapNumber = document.createElement('span');
		lapNumber.classList.add('lap-number');
		lapNumber.textContent = `Lap #${number}`;

		const lapTime = document.createElement('div');
		lapTime.classList.add('lap-time');

		const lapMinutes = document.createElement('span');
		lapMinutes.classList.add('lap-minutes');
		lapMinutes.textContent = time.minutes;

		const lapSeconds = document.createElement('span');
		lapSeconds.classList.add('lap-seconds');
		lapSeconds.textContent = time.seconds;

		const lapMilliseconds = document.createElement('span');
		lapMilliseconds.classList.add('lap-milliseconds');
		lapMilliseconds.innerText = time.milliseconds;

		lapTime.append(lapMinutes);
		lapTime.append(':');
		lapTime.append(lapSeconds);
		lapTime.append('.');
		lapTime.append(lapMilliseconds);

		lap.append(lapNumber);
		lap.append(lapTime);
		lapIndex++;
		return lap;
	}

	function pauseTimer() {
		const nowDate = new Date();
		arr.push(nowDate.getTime() - startDate.getTime());
		clearInterval(interval);
		pauseBtn.setAttribute('disabled', 'true');
		lapBtn.setAttribute('disabled', 'true');
		resetBtn.removeAttribute('disabled');
		resumeBtn.removeAttribute('disabled');
	}
	pauseBtn.onclick = pauseTimer;
}

function calculateTime(startDate, currentDate, timeSum) {
	let startMiniseconds = startDate.getTime();
	let currentMiniseconds = currentDate.getTime();
	let diff = timeSum + currentMiniseconds - startMiniseconds + 50;
	// console.log(diff);
	let milliseconds = parseInt((diff / 10) % 100);
	let seconds = parseInt((diff / 1000) % 60);
	let minutes = parseInt((diff / 1000 / 60) % 60);
	let totalSeconds = parseInt(diff / 1000);
	// console.log(totalSeconds);
	return { minutes, seconds, milliseconds, totalSeconds };
}

function formatTime(time) {
	let minutes = time.minutes > 9 ? time.minutes.toString() : `0${time.minutes}`;
	let seconds = time.seconds > 9 ? time.seconds.toString() : `0${time.seconds}`;
	let milliseconds =
		time.milliseconds > 9
			? time.milliseconds.toString()
			: `0${time.milliseconds}`;
	let totalSeconds = time.totalSeconds;
	return { minutes, seconds, milliseconds, totalSeconds };
}

const minutesSpan = document.querySelector('.minutes');
const secondsSpan = document.querySelector('.seconds');
const millisecondsSpan = document.querySelector('.milliseconds');

function displayTime(time) {
	minutesSpan.textContent = time.minutes;
	secondsSpan.textContent = time.seconds;
	millisecondsSpan.textContent = time.milliseconds;
}

const resetBtn = document.querySelector('.reset-timer-btn');
resetBtn.onclick = resetTimer;

function resetTimer() {
	minutesSpan.textContent = '00';
	secondsSpan.textContent = '00';
	millisecondsSpan.textContent = '00';
	arrow.style.setProperty('--arrow-rotation-duration', '0');
	arrow.style.transform = 'rotate(0)';
	const opaqueLines = document.querySelectorAll('.outside-line.opaque');
	// console.log(opaqueLines);
	lapIndex = 1;

	arr = [];

	const bottomLapsDiv = document.createElement('div');
	bottomLapsDiv.classList.add('bottom');
	lapsDiv.textContent = '';
	lapsDiv.append(bottomLapsDiv);

	let i = opaqueLines.length - 1;
	let resetLinesInterval = setInterval(() => {
		if (i >= 0) {
			opaqueLines[i].classList.remove('opaque');
			i--;
		} else {
			clearInterval(resetLinesInterval);
		}
	}, 20);

	resetBtn.setAttribute('disabled', 'true');
	resumeBtn.setAttribute('disabled', 'true');
	startBtn.removeAttribute('disabled');
}

const resumeBtn = document.querySelector('.resume-timer-btn');
resumeBtn.onclick = resumeTimer;

function resumeTimer() {
	resetBtn.setAttribute('disabled', 'true');
	resumeBtn.setAttribute('disabled', 'true');
	pauseBtn.removeAttribute('disabled');
	lapBtn.removeAttribute('disabled');
	startInterval();
}
