const time = document.querySelector(':root');
const playState = document.querySelector(':root');

const setTime1 = document.querySelector('.time1');
const setTime2 = document.querySelector('.time2');
const setTime3 = document.querySelector('.time3');
const setTime4 = document.querySelector('.time4');
const setTime5 = document.querySelector('.time5');

const playBtn = document.querySelector('.play-button');
const stopBtn = document.querySelector('.stop-button');

setTime1.addEventListener('click', function () {
	time.style.setProperty('--duration', '1s');
});

setTime2.addEventListener('click', function () {
	time.style.setProperty('--duration', '2s');
});

setTime3.addEventListener('click', function () {
	time.style.setProperty('--duration', '3s');
});

setTime4.addEventListener('click', function () {
	time.style.setProperty('--duration', '4s');
});

setTime5.addEventListener('click', function () {
	time.style.setProperty('--duration', '5s');
});

playBtn.addEventListener('click', function () {
	playState.style.setProperty('--play-state', 'running');
});

stopBtn.addEventListener('click', function () {
	playState.style.setProperty('--play-state', 'paused');
});
