// Rotate Lines
const lines = document.querySelectorAll('.outside-line');

lines.forEach((line, index) => {
	line.style.transform = `rotate(${6 * index}deg)`;
});

// Lines Animation
let index = 0;
let interval;

const arrow = document.querySelector('.arrow-line');

function startInterval() {
	interval = setInterval(() => {
		lines[index].classList.toggle('opaque');
		index = index < 59 ? index + 1 : 0;
	}, 1000);
	setTimeout(() => (arrow.style.animationPlayState = 'running'), 600);
}

const startBtn = document.querySelector('.start-timer-btn');

startBtn.addEventListener('click', startInterval);
