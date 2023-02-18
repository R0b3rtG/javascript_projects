const lights = document.querySelectorAll('.light');

for (let i = 0; i < 100; i++) {
	for (let j = 0; j < 100; j++)
		if ((j + 1) % (i + 1) == 0) lights[j].classList.toggle('off');
}
