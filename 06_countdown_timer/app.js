const dots = document.querySelector('.dots');
const minute = document.querySelector('.minute');
const hour = document.querySelector('.hour');
const eventName = document.querySelector('.event-name-in');
const dayInput = document.querySelector('.day');
const monthInput = document.querySelector('.months');
const yearInput = document.querySelector('.year');
const hourInput = document.querySelector('.hour-input');
const minuteInput = document.querySelector('.minute-input');
const btnInput = document.querySelector('.start-timer');
const alertBox = document.querySelector('.alert');
const form = document.querySelector('.form');
const eventNameVisual = document.querySelector('.event-name');
const d1 = document.querySelector('.d1');
const d2 = document.querySelector('.d2');
const d3 = document.querySelector('.d3');
const btnChange = document.querySelector('.change-event');
const lampLight = document.querySelector('.light-cast');

let eventNameText;
let date = new Date();
let targetDate;
let timeUpdate;
let lampLightUpdate;

function displayForm() {
	form.style.display = 'flex';
}

(function () {
	if (
		localStorage.getItem('targetDate') != null &&
		localStorage.getItem('eventNameText') != null
	) {
		targetDate = new Date(JSON.parse(localStorage.getItem('targetDate')));
		startEventCountDown();
	} else {
		displayForm();
	}
})();

function dotsAnim() {
	if (dots.textContent === '') {
		dots.textContent = ':';
	} else if (dots.textContent === ':') {
		dots.textContent = '';
	}
}

function checkForNumber(event) {
	const code = event.keyCode || event.which;
	if (code >= 48 && code <= 59) {
		return true;
	} else {
		return false;
	}
}

btnInput.addEventListener('click', btnEvent);

function btnEvent() {
	if (
		eventName.value != '' &&
		dayInput.value != '' &&
		yearInput.value.length === 4
	) {
		if (
			parseInt(minuteInput.value) >= 0 &&
			parseInt(minuteInput.value) <= 59 &&
			parseInt(hourInput.value) >= 0 &&
			parseInt(hourInput.value) <= 23 &&
			parseInt(dayInput.value) >= 1 &&
			parseInt(dayInput.value) <= 31 &&
			yearInput.value <= date.getFullYear() + 2
		) {
			targetDate = new Date(
				`${monthInput.options[monthInput.selectedIndex].text} ${
					dayInput.value
				}, ${yearInput.value} ${hourInput.value !== '' ? hourInput.value : 0}:${
					minuteInput.value !== '' ? minuteInput.value : 0
				}:00`
			);
			localStorage.setItem('targetDate', JSON.stringify(targetDate));
			if (targetDate.getTime() <= date.getTime()) {
				alertBox.textContent = 'Your event is in the past';
				alertBox.style.display = 'block';
				setTimeout(function () {
					alertBox.style.display = 'none';
				}, 3000);
			} else {
				startEventCountDown();
			}
		} else {
			alertBox.textContent = 'Invalid Input';
			alertBox.style.display = 'block';
			setTimeout(function () {
				alertBox.style.display = 'none';
			}, 3000);
		}
	} else {
		alertBox.textContent = 'Fill The Fields';
		alertBox.style.display = 'block';
		setTimeout(function () {
			alertBox.style.display = 'none';
		}, 3000);
	}
}

function startEventCountDown() {
	date = new Date();
	let diff = targetDate.getTime() - date.getTime();
	updateTime();
	if (localStorage.getItem('eventNameText') == null) {
		eventNameText = eventName.value;
	} else {
		eventNameText = localStorage.getItem('eventNameText');
	}
	eventNameVisual.textContent = eventNameText;
	btnChange.style.display = 'block';
	form.style.display = 'none';
	localStorage.setItem('eventNameText', eventNameText);
	timeUpdate = setInterval(function () {
		if (date.getTime() > targetDate.getTime()) {
			clearInterval(timeUpdate);
			lampLight.style.display = 'none';
			clearInterval(lampLightUpdate);
			changeEvent();
		}
		dotsAnim();
		updateTime(diff);
	}, 1000);
	lampLight.style.display = 'block';
	lampLightUpdate = setInterval(function () {
		lampLight.style.display = 'none';
		setTimeout(function () {
			lampLight.style.display = 'block';
		}, 500);
	}, 20000);
}

function updateTime() {
	date = new Date();
	diff = targetDate.getTime() - date.getTime();
	diff = parseInt(diff / 60000);
	minute.textContent =
		parseInt(diff % 60).toString().length == 1
			? `0${parseInt(diff % 60)}`
			: parseInt(diff % 60);
	diff = parseInt(diff / 60);
	hour.textContent =
		parseInt(diff % 24).toString().length == 1
			? `0${parseInt(diff % 24)}`
			: parseInt(diff % 24);
	diff = parseInt(diff / 24);
	d3.textContent = parseInt(diff % 10);
	d2.textContent = parseInt((diff / 10) % 10);
	d1.textContent = parseInt(diff / 100);
}

btnChange.addEventListener('click', changeEvent);
function changeEvent() {
	eventNameText = '';
	targetDate = '';
	d1.textContent = 0;
	d2.textContent = 0;
	d3.textContent = 0;
	hour.textContent = '00';
	minute.textContent = '00';
	eventNameVisual.textContent = 'Event Name Here';
	diff = 0;
	clearInterval(timeUpdate);
	form.style.display = 'flex';
	btnChange.style.display = 'none';
	localStorage.clear();
	eventName.value = '';
	dayInput.value = '';
	yearInput.value = '';
	hourInput.value = '';
	minuteInput.value = '';
	monthInput.selectedIndex = 0;
}
