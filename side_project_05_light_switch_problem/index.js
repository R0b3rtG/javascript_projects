const lights = document.querySelectorAll('.light');
const minus = document.querySelector('.minus');
const plus = document.querySelector('.plus');
const span = document.querySelector('span');
const toggle = document.querySelector('.toggle');

let number = 0;

minus.addEventListener('click', () => {
	if (number > 0) number--;
	span.innerHTML = number;
	reset();
	show();
});

plus.addEventListener('click', () => {
	if (number < 100) number++;
	span.innerHTML = number;
	reset();
	show();
});

toggle.addEventListener('click', () => {
	lights.forEach((light) => {
		light.classList.toggle('numbered');
	});
});

function show() {
	for (let i = 0; i < number; i++) {
		for (let j = 0; j < 100; j++)
			if ((j + 1) % (i + 1) == 0) lights[j].classList.toggle('off');
	}
}

function reset() {
	lights.forEach((light) => {
		light.classList.add('off');
	});
}
